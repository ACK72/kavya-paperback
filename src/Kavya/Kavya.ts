import {
	Chapter,
	ChapterDetails,
	ContentRating,
	HomeSection,
	Manga,
	MangaStatus,
	MangaTile,
	PagedResults,
	Request,
	RequestInterceptor,
	Response,
	SearchRequest,
	Section,
	Source,
	SourceInfo,
	SourceStateManager,
	TagType
} from 'paperback-extensions-common';
import {
	serverSettingsMenu
} from './Settings';
import {
	getAuthorizationString,
	getKavitaAPI,
	getOptions,
	getServerUnavailableMangaTiles,
	log
} from './Common';

export const KavyaInfo: SourceInfo = {
	version: '0.2.0',
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

export class KavitaRequestInterceptor implements RequestInterceptor {
	stateManager: SourceStateManager;
	authorization: string;

	constructor(stateManager: SourceStateManager) {
		this.stateManager = stateManager;
		this.authorization = '';
	}

	async isServerAvailable(): Promise<boolean> {
		if (this.authorization === '') {
			this.updateAuthorization();
		}

		return this.authorization.startsWith('Bearer ');
	}

	async updateAuthorization(): Promise<void> {
		this.authorization = await getAuthorizationString(this.stateManager);
	}

	async interceptResponse(response: Response): Promise<Response> {
		return response;
	}

	async interceptRequest(request: Request): Promise<Request> {		
		request.headers = {
			'Authorization': this.authorization,
			'Content-Type': typeof request.data === 'string' ? 'application/json' : 'text/html'
		}

		return request;
	}
}

export class Kavya extends Source {
	stateManager = createSourceStateManager({});
	interceptor = new KavitaRequestInterceptor(this.stateManager);
	
	requestManager = createRequestManager({
		requestsPerSecond: 4,
		requestTimeout: 20000,
		interceptor: this.interceptor,
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
		const kavitaAPI = await getKavitaAPI(this.stateManager);

		const request = createRequestObject({
			url: `${kavitaAPI}/Series/${mangaId}`,
			method: 'GET',
		});

		const response = await this.requestManager.schedule(request, 1);
		const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

		return createManga({
			id: mangaId,
			titles: [result.name],
			image: `${kavitaAPI}/image/series-cover?seriesId=${mangaId}`,
			desc: '',
			status: MangaStatus.UNKNOWN,
		});
	}

	async getChapters(mangaId: string): Promise<Chapter[]> {
		const kavitaAPI = await getKavitaAPI(this.stateManager);

		const request = createRequestObject({
			url: `${kavitaAPI}/Series/volumes`,
			param: `?seriesId=${mangaId}`,
			method: 'GET',
		});

		const response = await this.requestManager.schedule(request, 1);
		const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

		const chapters: Chapter[] = [];

		for (const volume of result) {
			for (const chapter of volume.chapters) {
				chapters.push(
					createChapter({
						id: `${chapter.id}`,
						mangaId: mangaId,
						chapNum: volume.number,
						//chapNum: chapter.id,
						name: volume.name,
						//volume: chapter.volumeId,
						// @ts-ignore
						sortingIndex: volume.number,
					})
				);
			}
		}

		return chapters;
	}

	async getChapterDetails(
		mangaId: string,
		chapterId: string
	): Promise<ChapterDetails> {
		const kavitaAPI = await getKavitaAPI(this.stateManager);

		const request = createRequestObject({
			url: `${kavitaAPI}/Series/chapter`,
			param: `?chapterId=${chapterId}`,
			method: 'GET',
		});

		const response = await this.requestManager.schedule(request, 1);
		const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

		const pages: string[] = [];
		for (let i = 0; i < result.pages; i++) {
			pages.push(`${kavitaAPI}/Reader/image?chapterId=${chapterId}&page=${i}&extractPdf=true`);
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
		// This function is also called when the user search in an other source. It should not throw if the server is unavailable.
		if (!(await this.interceptor.isServerAvailable())) {
			log('searchRequest failed because server settings are invalid');

			return createPagedResults({
				results: getServerUnavailableMangaTiles(),
			});
		}

		const kavitaAPI = await getKavitaAPI(this.stateManager);
		const request = createRequestObject({
			url: `${kavitaAPI}/Search/search`,
			param: `?queryString=${encodeURIComponent(searchQuery.title ?? '""')}`,
			method: 'GET'
		});

		// We don't want to throw if the server is unavailable
		let response: Response;
		let result;

		const tiles: MangaTile[] = [];

		try {
			response = await this.requestManager.schedule(request, 1);
			result = JSON.parse(response.data);

			for (const manga of result.series) {
				tiles.push(
					createMangaTile({
						id: `${manga.seriesId}`,
						title: createIconText({text: manga.name}),
						image: `${kavitaAPI}/image/series-cover?seriesId=${manga.seriesId}`,
					})
				);
			}
		} catch (error) {
			log(`searchRequest failed with error: ${error}`);
			return createPagedResults({
				results: getServerUnavailableMangaTiles(),
			});
		}
		
		return createPagedResults({
			results: tiles
		});
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
					view_more: false,
					items: getServerUnavailableMangaTiles()
				})
			);
			return;
		}

		// We won't use `await this.getKavitaAPI()` as we do not want to throw an error on
		// the homepage when server settings are not set
		const kavitaAPI = await getKavitaAPI(this.stateManager);
		const { showOnDeck, showRecentlyUpdated, showNewlyAdded } = await getOptions(this.stateManager);

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
			url: `${kavitaAPI}/Library`,
			method: 'GET',
		});

		const response = await this.requestManager.schedule(request, 1);
		const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
		
		for (const library of result) {
			sections.push(createHomeSection({
				id: `${library.id}`,
				title: library.name,
				view_more: true,
			}));
		}

		const promises: Promise<void>[] = [];

		for (const section of sections) {
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			// rome-ignore lint/style/useSingleVarDeclarator: <explanation>
			let apiPath: string, body: any = {}, id: string = 'id', title: string = 'name';
			switch (section.id) {
				case 'ondeck':
					apiPath = `${kavitaAPI}/Series/on-deck`;
					break;
				case 'recentlyupdated':
					apiPath = `${kavitaAPI}/Series/recently-updated-series`;
					id = 'seriesId', title = 'seriesName';
					break;
				case 'newlyadded':
					apiPath = `${kavitaAPI}/Series/recently-added`;
					break;
				default:
					apiPath = `${kavitaAPI}/Series/all`;
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
					let result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

					const tiles: MangaTile[] = [];
					
					for (const series of result) {
						tiles.push(
							createMangaTile({
								id: `${series[id]}`,
								title: createIconText({text: series[title]}),
								image: `${kavitaAPI}/image/series-cover?seriesId=${series[id]}`
							})
						);
					}
					
					if (tiles.length > 0) {
						section.items = tiles;
					}
				})
			);
		}

		// Make sure the function completes
		await Promise.all(promises);
		for (const section of sections) {
			if (typeof section.items !== 'undefined' && section.items.length > 0) {
				sectionCallback(section);
			}
		}
	}

	override async getViewMoreItems(
		homepageSectionId: string,
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		metadata: any
	): Promise<PagedResults> {
		const kavitaAPI = await getKavitaAPI(this.stateManager);

		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		// rome-ignore lint/style/useSingleVarDeclarator: <explanation>
		let apiPath: string, body: any = {}, id: string = 'id', title: string = 'name';
		switch (homepageSectionId) {
			case 'ondeck':
				apiPath = `${kavitaAPI}/Series/on-deck`;
				break;
			case 'recentlyupdated':
				apiPath = `${kavitaAPI}/Series/recently-updated-series`;
				id = 'seriesId', title = 'seriesName';
				break;
			case 'newlyadded':
				apiPath = `${kavitaAPI}/Series/recently-added`;
				break;
			default:
				apiPath = `${kavitaAPI}/Series/all`;
				body = {'libraries': [parseInt(homepageSectionId)]};
				break;
		}

		const request = createRequestObject({
			url: apiPath,
			data: JSON.stringify(body),
			method: 'POST',
		});

		const response = await this.requestManager.schedule(request, 1);
		const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

		const tiles: MangaTile[] = [];
		
		for (const series of result) {
			tiles.push(
				createMangaTile({
					id: `${series[id]}`,
					title: createIconText({text: series[title]}),
					image: `${kavitaAPI}/image/series-cover?seriesId=${series[id]}`
				})
			);
		}

		return createPagedResults({
			results: tiles
		});
	}
}