import {
	Chapter,
	ChapterDetails,
	ContentRating,
	HomeSection,
	Manga,
	MangaTile,
	PagedResults,
	SearchRequest,
	Section,
	Source,
	SourceInfo,
	Tag,
	TagSection,
	TagType
} from 'paperback-extensions-common';
import {
	serverSettingsMenu
} from './Settings';
import {
	KavitaRequestInterceptor,
	getKavitaAPIUrl,
	getOptions,
	getServerUnavailableMangaTiles,
	log,
	getSeriesDetails
} from './Common';
import { searchRequest } from './Search';

export const KavyaInfo: SourceInfo = {
	version: '1.1.6',
	name: 'Kavya',
	icon: 'icon.png',
	author: 'ACK72',
	authorWebsite: 'https://github.com/ACK72',
	description: 'Kavita client extension for Paperback',
	contentRating: ContentRating.EVERYONE,
	websiteBaseURL: 'https://www.kavitareader.com/',
	sourceTags: [
		{
			text: 'Kavita',
			type: TagType.GREEN,
		},
	],
};

export class Kavya extends Source {
	stateManager = createSourceStateManager({});
	interceptor = new KavitaRequestInterceptor(this.stateManager);
	
	requestManager = createRequestManager({
		requestsPerSecond: 4,
		requestTimeout: 20000,
		interceptor: this.interceptor
	});

	override async getSourceMenu(): Promise<Section> {
		return createSection({
			id: 'main',
			header: 'Source Settings',
			rows: async () => [
				serverSettingsMenu(this.stateManager, this.interceptor)
			],
		});
	}

	async getMangaDetails(mangaId: string): Promise<Manga> {
		return await getSeriesDetails(mangaId, this.requestManager, this.stateManager);
	}

	async getChapters(mangaId: string): Promise<Chapter[]> {
		const kavitaAPIUrl = await getKavitaAPIUrl(this.stateManager);
		const { displayReadInstedOfUnread } = await getOptions(this.stateManager);

		const request = createRequestObject({
			url: `${kavitaAPIUrl}/Series/volumes`,
			param: `?seriesId=${mangaId}`,
			method: 'GET',
		});

		const response = await this.requestManager.schedule(request, 1);
		const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		// rome-ignore lint/style/useSingleVarDeclarator: <explanation>
		const  chapters: any[] = [], specials: any[] = [];

		for (const volume of result) {
			for (const chapter of volume.chapters) {
				const name: string = (chapter.number === chapter.range ? '' : chapter.range.replace(`${chapter.number}-`, '')) + (chapter.titleName === '' ? '' : ` - ${chapter.titleName}`);
				const title: string = chapter.range.endsWith('.epub') ? chapter.range.slice(0, -5) : chapter.range.slice(0, -4);
				const progress: string = displayReadInstedOfUnread ? (chapter.pagesRead === 0 ? '' : chapter.pages === chapter.pagesRead ? 'Read' : `Reading ${chapter.pagesRead}/${chapter.pages}`)
					: (chapter.pagesRead === 0 ? 'Unread' : chapter.pages === chapter.pagesRead ? '' : `Reading ${chapter.pagesRead}/${chapter.pages}`);
				
				// rome-ignore lint/suspicious/noExplicitAny: <explanation>
				const item: any = {
					id: `${chapter.id}`,
					mangaId: mangaId,
					chapNum: parseInt(chapter.number),
					name: chapter.isSpecial ? title : name,
					time: new Date(chapter.releaseDate === '0001-01-01T00:00:00' ? chapter.lastModified : chapter.releaseDate),
					volume: volume.number,
				};
				
				if (chapter.isSpecial) {
					item.group = `Specials   ${progress}`;
					specials.push(item);
				} else {
					item.group = `${progress}`;
					chapters.push(item);
				}
			}
		}

		return chapters.concat(specials).map((item, index) => {
			const chapter = createChapter({
				...item,
				chapNum: index
			});

			chapter.chapNum = item.chapNum;
			return chapter;
		});
	}

	async getChapterDetails(
		mangaId: string,
		chapterId: string
	): Promise<ChapterDetails> {
		const kavitaAPIUrl = await getKavitaAPIUrl(this.stateManager);

		const request = createRequestObject({
			url: `${kavitaAPIUrl}/Series/chapter`,
			param: `?chapterId=${chapterId}`,
			method: 'GET',
		});

		const response = await this.requestManager.schedule(request, 1);
		const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

		const pages: string[] = [];
		for (let i = 0;i <= result.pages;i++) {
			pages.push(`${kavitaAPIUrl}/Reader/image?chapterId=${chapterId}&page=${i}&extractPdf=true`);
		}

		return createChapterDetails({
			id: chapterId,
			mangaId: mangaId,
			pages: pages,
			longStrip: false,
		});
	}

	override async getSearchResults(
		searchQuery: SearchRequest,
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		metadata: any
	): Promise<PagedResults> {
		return await searchRequest(searchQuery, metadata, this.requestManager, this.interceptor, this.stateManager);
	}

	override async getSearchTags(): Promise<TagSection[]> {
		// This function is also called when the user search in an other source. It should not throw if the server is unavailable.
		if (!(await this.interceptor.isServerAvailable())) {
			log('getSearchTags failed because server settings are invalid');
			return [];
		}

		const kavitaAPIUrl = await getKavitaAPIUrl(this.stateManager);
		const {excludeBookTypeLibrary} = await getOptions(this.stateManager);

		const includeLibraryIds: string[] = [];

		const libraryRequest = createRequestObject({
			url: `${kavitaAPIUrl}/Library`,
			method: 'GET',
		});

		const libraryResponse = await this.requestManager.schedule(libraryRequest, 1);
		const libraryResult = JSON.parse(libraryResponse.data);

		for (const library of libraryResult) {
			if (excludeBookTypeLibrary && library.type === 2) continue;
			includeLibraryIds.push(library.id);
		}
		
		const tagNames: string[] = ['genres', 'people', 'tags'];
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const tagSections: any = [];

		const promises: Promise<void>[] = [];

		for (const tagName of tagNames) {
			const request = createRequestObject({
				url: `${kavitaAPIUrl}/Metadata/${tagName}`,
				param: `?libraryIds=${includeLibraryIds.join(',')}`,
				method: 'GET',
			});

			promises.push(
				this.requestManager.schedule(request, 1).then((response) => {
					const result = JSON.parse(response.data);

					const names: string[] = [];
					const tags: Tag[] = [];

					// rome-ignore lint/suspicious/noExplicitAny: <explanation>
					result.forEach(async (item: any) => {
						switch (tagName) {
							case 'people':
								if (!names.includes(item.name)) {
									names.push(item.name);
									tags.push(createTag({id: `${tagName}-${item.role}.${item.id}`, label: item.name}))
								}
								break;
							default:
								tags.push(createTag({id: `${tagName}-${item.id}`, label: item.title}))
						}
					});

					tagSections[tagName] = createTagSection({
						id: tagName,
						label: tagName,
						tags: tags
					});
				})
			);
		}

		await Promise.all(promises);
		return tagNames.map((tag) => tagSections[tag]);
	}

	override async getHomePageSections(
		sectionCallback: (section: HomeSection) => void
	): Promise<void> {
		// This function is called on the homepage and should not throw if the server is unavailable
		if (!(await this.interceptor.isServerAvailable())) {
			log('getHomePageSections failed because server settings are invalid');
			sectionCallback(
				createHomeSection({ 
					id: 'placeholder-id',
					title: 'Library',
					items: getServerUnavailableMangaTiles(),
					view_more: false
				})
			);
			return;
		}

		// We won't use `await this.getKavitaAPIUrl()` as we do not want to throw an error on
		// the homepage when server settings are not set
		const kavitaAPIUrl = await getKavitaAPIUrl(this.stateManager);
		const {showOnDeck, showRecentlyUpdated, showNewlyAdded, excludeBookTypeLibrary} = await getOptions(this.stateManager);

		// The source define two homepage sections: new and latest
		const sections = [];

		if (showOnDeck) {
			sections.push(createHomeSection({
				id: 'ondeck',
				title: 'On Deck',
				view_more: false,
			}));
		}

		if (showRecentlyUpdated) {
			sections.push(createHomeSection({
				id: 'recentlyupdated',
				title: 'Recently Updated Series',
				view_more: true,
			}));
		}

		if (showNewlyAdded) {
			sections.push(createHomeSection({
				id: 'newlyadded',
				title: 'Newly Added Series',
				view_more: true,
			}));
		}

		const request = createRequestObject({
			url: `${kavitaAPIUrl}/Library`,
			method: 'GET',
		});

		const response = await this.requestManager.schedule(request, 1);
		const result = JSON.parse(response.data);

		const excludeLibraryIds: number[] = [];
		
		for (const library of result) {
			if (excludeBookTypeLibrary && library.type === 2) {
				excludeLibraryIds.push(library.id);
				continue;
			}

			sections.push(createHomeSection({
				id: `${library.id}`,
				title: library.name,
				view_more: true,
			}));
		}

		const promises: Promise<void>[] = [];

		for (const section of sections) {
			sectionCallback(section);

			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			// rome-ignore lint/style/useSingleVarDeclarator: <explanation>
			let apiPath: string, body: any = {}, id: string = 'id', title: string = 'name';
			switch (section.id) {
				case 'ondeck':
					apiPath = `${kavitaAPIUrl}/Series/on-deck`;
					break;
				case 'recentlyupdated':
					apiPath = `${kavitaAPIUrl}/Series/recently-updated-series`;
					id = 'seriesId', title = 'seriesName';
					break;
				case 'newlyadded':
					apiPath = `${kavitaAPIUrl}/Series/recently-added`;
					break;
				default:
					apiPath = `${kavitaAPIUrl}/Series/all`;
					body = {'libraries': [parseInt(section.id)]};
					break;
			}
			
			const request = createRequestObject({
				url: apiPath,
				data: JSON.stringify(body),
				method: 'POST',
			});

			// Get the section data
			promises.push(
				this.requestManager.schedule(request, 1).then((response) => {
					let result = JSON.parse(response.data);

					const tiles: MangaTile[] = [];
					
					for (const series of result) {
						if (excludeBookTypeLibrary && excludeLibraryIds.includes(series.libraryId)) {
							continue;
						}

						tiles.push(createMangaTile({
							id: `${series[id]}`,
							title: createIconText({text: series[title]}),
							image: `${kavitaAPIUrl}/image/series-cover?seriesId=${series[id]}`
						}));
					}
					
					section.items = tiles;
					sectionCallback(section);
				})
			);
		}

		// Make sure the function completes
		await Promise.all(promises);
	}

	override async getViewMoreItems(
		homepageSectionId: string,
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		metadata: any
	): Promise<PagedResults> {
		const kavitaAPIUrl = await getKavitaAPIUrl(this.stateManager);

		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		// rome-ignore lint/style/useSingleVarDeclarator: <explanation>
		let apiPath: string, body: any = {}, id: string = 'id', title: string = 'name';
		switch (homepageSectionId) {
			case 'ondeck':
				apiPath = `${kavitaAPIUrl}/Series/on-deck`;
				break;
			case 'recentlyupdated':
				apiPath = `${kavitaAPIUrl}/Series/recently-updated-series`;
				id = 'seriesId', title = 'seriesName';
				break;
			case 'newlyadded':
				apiPath = `${kavitaAPIUrl}/Series/recently-added`;
				break;
			default:
				apiPath = `${kavitaAPIUrl}/Series/all`;
				body = {'libraries': [parseInt(homepageSectionId)]};
				break;
		}

		const request = createRequestObject({
			url: apiPath,
			data: JSON.stringify(body),
			method: 'POST',
		});

		const response = await this.requestManager.schedule(request, 1);
		const result = JSON.parse(response.data);

		const tiles: MangaTile[] = [];
		
		for (const series of result) {
			tiles.push(createMangaTile({
				id: `${series[id]}`,
				title: createIconText({text: series[title]}),
				image: `${kavitaAPIUrl}/image/series-cover?seriesId=${series[id]}`
			}));
		}

		return createPagedResults({
			results: tiles
		});
	}
}