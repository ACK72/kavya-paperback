import {
	BadgeColor,
	Chapter,
	ChapterDetails,
	ChapterProviding,
	ContentRating,
	DUIForm,
	DUISection,
	HomePageSectionsProviding,
	HomeSection,
	MangaProgress,
	MangaProgressProviding,
	MangaProviding,
	PagedResults,
	PartialSourceManga,
	RequestManagerProviding,
	SearchRequest,
	SearchResultsProviding,
	SourceInfo,
	SourceIntents,
	SourceManga,
	Tag,
	TagSection,
	TrackerActionQueue
} from '@paperback/types';
import {
	serverSettingsMenu
} from './Settings';
import {
	KavitaRequestInterceptor,
	getKavitaAPI,
	getOptions,
	getSeriesDetails,
	getServerUnavailableMangaTiles,
	reqeustToString
} from './Common';
import { searchRequest } from './Search';
import { CacheManager } from './CacheManager';

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const sortHelper = (a: any, b: any) => {
	if (a.volume === b.volume) return a.chapNum === b.chapNum ? a._index - b._index : a.chapNum - b.chapNum;
	return a.volume === 0 || b.volume === 0 ? b.volume - a.volume : a.volume - b.volume;
}

export const KavyaInfo: SourceInfo = {
	version: '1.3.2',
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
			type: BadgeColor.GREEN,
		},
	],
	intents: SourceIntents.COLLECTION_MANAGEMENT | SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.MANGA_CHAPTERS | SourceIntents.MANGA_TRACKING | SourceIntents.SETTINGS_UI
};

export class Kavya implements ChapterProviding, HomePageSectionsProviding, MangaProgressProviding, MangaProviding, RequestManagerProviding, SearchResultsProviding {
	stateManager = App.createSourceStateManager();

	cacheManager = new CacheManager();
	interceptor = new KavitaRequestInterceptor(this.stateManager);
	
	requestManager = App.createRequestManager({
		requestsPerSecond: 8,
		requestTimeout: 20000,
		interceptor: this.interceptor
	});

	async getSourceMenu(): Promise<DUISection> {
		return App.createDUISection({
			id: 'main',
			header: 'Source Settings',
			isHidden: false,
			rows: async () => [
				serverSettingsMenu(this.stateManager, this.interceptor)
			],
		});
	}

	async getMangaDetails(mangaId: string): Promise<SourceManga> {
		return App.createSourceManga({
			id: mangaId,
			mangaInfo: App.createMangaInfo({
				...(await getSeriesDetails(mangaId, this.requestManager, this.stateManager))
			})
		});
	}

	async getChapters(mangaId: string): Promise<Chapter[]> {
		const kavitaAPI = await getKavitaAPI(this.stateManager);

		const request = App.createRequest({
			url: `${kavitaAPI.url}/Series/volumes`,
			param: `?seriesId=${mangaId}`,
			method: 'GET',
		});

		const response = await this.requestManager.schedule(request, 1);
		const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		// rome-ignore lint/style/useSingleVarDeclarator: <explanation>
		const chapters: any[] = [], specials: any[] = [];

		let i = 0;
		let j = 1;
		for (const volume of result) {
			for (const chapter of volume.chapters) {
				const name = chapter.number === chapter.range ? chapter.titleName ?? '' : `${chapter.range.replace(`${chapter.number}-`, '')}${chapter.titleName ? ` - ${chapter.titleName}` : ''}`;
				const title: string = chapter.range.endsWith('.epub') ? chapter.range.slice(0, -5) : chapter.range.slice(0, -4);
				const progress: string = chapter.pagesRead === 0 ? '' : chapter.pages === chapter.pagesRead ? '· Read' : `· Reading ${chapter.pagesRead} page`;
				
				// rome-ignore lint/suspicious/noExplicitAny: <explanation>
				const item: any = {
					id: `${chapter.id}`,
					mangaId: mangaId,
					chapNum: chapter.isSpecial ? j++ : parseFloat(chapter.number), // chapter.number is 0 when it's a special
					name: chapter.isSpecial ? title : name,
					time: new Date(chapter.releaseDate === '0001-01-01T00:00:00' ? chapter.lastModified : chapter.releaseDate),
					volume: parseFloat(volume.name),
					group: `${(chapter.isSpecial ? 'Specials · ' : '')}${chapter.pages} pages ${progress}`,
					_index: i++,
					// sortIndex is unused, as it seems to have an issue when changing the sort order
				};
				
				if (chapter.isSpecial) specials.push(item);
				else chapters.push(item);
			}
		}

		chapters.sort(sortHelper);
		return chapters.concat(specials).map((item, index) => {
			return App.createChapter({
				...item,
				sortingIndex: index
			});
		});
	}

	async getChapterDetails(
		mangaId: string,
		chapterId: string
	): Promise<ChapterDetails> {
		const kavitaAPI = await getKavitaAPI(this.stateManager);

		const request = App.createRequest({
			url: `${kavitaAPI.url}/Series/chapter`,
			param: `?chapterId=${chapterId}`,
			method: 'GET',
		});

		const response = await this.requestManager.schedule(request, 1);
		const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

		const pages: string[] = [];
		for (let i = 0;i < result.pages;i++) {
			pages.push(`FAKE*/${i}?*REAL*${kavitaAPI.url}/Reader/image?chapterId=${chapterId}&page=${i}&apiKey=${kavitaAPI.key}&extractPdf=true`);
		}

		return App.createChapterDetails({
			id: chapterId,
			mangaId: mangaId,
			pages: pages
		});
	}

	async getSearchResults(
		searchQuery: SearchRequest,
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		metadata: any
	): Promise<PagedResults> {
		return await searchRequest(searchQuery, metadata, this.requestManager, this.interceptor, this.stateManager, this.cacheManager);
	}

	async getSearchTags(): Promise<TagSection[]> {
		// This function is also called when the user search in an other source. It should not throw if the server is unavailable.
		if (!(await this.interceptor.isServerAvailable())) {
			return [];
		}

		const kavitaAPI = await getKavitaAPI(this.stateManager);
		const { excludeBookTypeLibrary } = await getOptions(this.stateManager);

		const includeLibraryIds: string[] = [];

		const libraryRequest = App.createRequest({
			url: `${kavitaAPI.url}/Library`,
			method: 'GET',
		});

		const libraryResponse = await this.requestManager.schedule(libraryRequest, 1);
		const libraryResult = JSON.parse(libraryResponse.data ?? '[]');

		for (const library of libraryResult) {
			if (excludeBookTypeLibrary && library.type === 2) continue;
			includeLibraryIds.push(library.id);
		}
		
		const tagNames: string[] = ['genres', 'people', 'tags'];
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const tagSections: any = [];

		const promises: Promise<void>[] = [];

		for (const tagName of tagNames) {
			const request = App.createRequest({
				url: `${kavitaAPI.url}/Metadata/${tagName}`,
				param: `?libraryIds=${includeLibraryIds.join(',')}`,
				method: 'GET',
			});

			promises.push(
				this.requestManager.schedule(request, 1).then((response) => {
					const result = JSON.parse(response.data ?? '[]');

					const names: string[] = [];
					const tags: Tag[] = [];

					// rome-ignore lint/suspicious/noExplicitAny: <explanation>
					result.forEach(async (item: any) => {
						switch (tagName) {
							case 'people':
								if (!names.includes(item.name)) {
									names.push(item.name);
									tags.push(App.createTag({id: `${tagName}-${item.role}.${item.id}`, label: item.name}))
								}
								break;
							default:
								tags.push(App.createTag({id: `${tagName}-${item.id}`, label: item.title}))
						}
					});

					tagSections[tagName] = App.createTagSection({
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

	async getHomePageSections(
		sectionCallback: (section: HomeSection) => void
	): Promise<void> {
		// This function is called on the homepage and should not throw if the server is unavailable
		if (!(await this.interceptor.isServerAvailable())) {
			sectionCallback(
				App.createHomeSection({ 
					id: 'placeholder-id',
					title: 'Library',
					items: getServerUnavailableMangaTiles(),
					containsMoreItems: false,
					type: 'singleRowNormal'
				})
			);
			return;
		}

		// We won't use `await this.getKavitaAPI()` as we do not want to throw an error on
		// the homepage when server settings are not set
		const kavitaAPI = await getKavitaAPI(this.stateManager);
		const { showOnDeck, showRecentlyUpdated, showNewlyAdded, excludeBookTypeLibrary, useAlternativeAPI } = await getOptions(this.stateManager);
		const pageSize = (await getOptions(this.stateManager)).pageSize / 2;

		// The source define two homepage sections: new and latest
		const sections = [];

		if (showOnDeck) {
			sections.push(App.createHomeSection({
				id: 'ondeck',
				title: 'On Deck',
				containsMoreItems: false,
				type: 'singleRowNormal'
			}));
		}

		if (showRecentlyUpdated) {
			sections.push(App.createHomeSection({
				id: 'recentlyupdated',
				title: 'Recently Updated Series',
				containsMoreItems: false,
				type: 'singleRowNormal'
			}));
		}

		if (showNewlyAdded) {
			sections.push(App.createHomeSection({
				id: 'newlyadded',
				title: 'Newly Added Series',
				containsMoreItems: false,
				type: 'singleRowNormal'
			}));
		}

		const request = App.createRequest({
			url: `${kavitaAPI.url}/Library`,
			method: 'GET',
		});

		const response = await this.requestManager.schedule(request, 1);
		const result = JSON.parse(response.data ?? '[]');

		const excludeLibraryIds: number[] = [];
		
		for (const library of result) {
			if (excludeBookTypeLibrary && library.type === 2) {
				excludeLibraryIds.push(library.id);
				continue;
			}

			sections.push(App.createHomeSection({
				id: `${library.id}`,
				title: library.name,
				containsMoreItems: false,
				type: 'singleRowNormal'
			}));
		}

		const promises: Promise<void>[] = [];

		for (const section of sections) {
			sectionCallback(section);
		}

		for (const section of sections) {
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			// rome-ignore lint/style/useSingleVarDeclarator: <explanation>
			let apiPath: string, body: any = {}, id: string = 'id', title: string = 'name';
			switch (section.id) {
				case 'ondeck':
					apiPath = `${kavitaAPI.url}/Series/on-deck?PageNumber=1&PageSize=${pageSize}`;
					break;
				case 'recentlyupdated':
					apiPath = `${kavitaAPI.url}/Series/recently-updated-series`;
					id = 'seriesId', title = 'seriesName';
					break;
				case 'newlyadded':
					if (useAlternativeAPI) apiPath = `${kavitaAPI.url}/Series/recently-added-v2?PageNumber=1&PageSize=${pageSize}`;
					else apiPath = `${kavitaAPI.url}/Series/recently-added?PageNumber=1&PageSize=${pageSize}`;
					break;
				default:
					if (useAlternativeAPI) {
						apiPath = `${kavitaAPI.url}/Series/v2?PageNumber=1&PageSize=${pageSize}`;
						body = {
							statements: [{ comparison: 0, field: 19, value: section.id }],
							combination: 1,
							sortOptions: { sortField: 1, isAscending: true },
							limitTo: 0
						};
					} else {
						apiPath = `${kavitaAPI.url}/Series/all?PageNumber=1&PageSize=${pageSize}&libraryId=${section.id}`;
					}
					break;
			}
			
			const request = App.createRequest({
				url: apiPath,
				data: JSON.stringify(body),
				method: 'POST',
			});

			// Get the section data
			promises.push(
				this.requestManager.schedule(request, 1).then((response) => {
					const result = JSON.parse(response.data ?? '[]');
					this.cacheManager.setCachedData(reqeustToString(request), result);

					const tiles: PartialSourceManga[] = [];
					
					for (const series of result) {
						if (excludeBookTypeLibrary && excludeLibraryIds.includes(series.libraryId)) continue;
						tiles.push(App.createPartialSourceManga({
							title: series[title],
							image: `${kavitaAPI.url}/image/series-cover?seriesId=${series[id]}&apiKey=${kavitaAPI.key}`,
							mangaId: `${series[id]}`,
							subtitle: undefined
						}));
					}
					
					section.items = tiles;
					if (tiles.length === pageSize) section.containsMoreItems = true;
					sectionCallback(section);
				})
			);
		}

		// Make sure the function completes
		await Promise.all(promises);
	}

	async getViewMoreItems(
		homepageSectionId: string,
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		metadata: any
	): Promise<PagedResults> {
		const kavitaAPI = await getKavitaAPI(this.stateManager);
		const { pageSize, excludeBookTypeLibrary, useAlternativeAPI } = await getOptions(this.stateManager);
		const excludeLibraryIds: number[] = [];
		const page: number = (metadata?.page ?? 0) + 1;

		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		// rome-ignore lint/style/useSingleVarDeclarator: <explanation>
		let apiPath: string, body: any = {}, id: string = 'id', title: string = 'name', checkLibraryId = false, useBuiltInCache: boolean = false;
		switch (homepageSectionId) {
			case 'ondeck':
				apiPath = `${kavitaAPI.url}/Series/on-deck?PageNumber=${page}&PageSize=${pageSize}`;
				checkLibraryId = true;
				break;
			case 'recentlyupdated':
				apiPath = `${kavitaAPI.url}/Series/recently-updated-series`;
				id = 'seriesId', title = 'seriesName';
				checkLibraryId = true;
				useBuiltInCache = true;
				break;
			case 'newlyadded':
				if (useAlternativeAPI) apiPath = `${kavitaAPI.url}/Series/recently-added-v2?PageNumber=${page}&PageSize=${pageSize}`;
				else apiPath = `${kavitaAPI.url}/Series/recently-added?PageNumber=${page}&PageSize=${pageSize}`;
				checkLibraryId = true;
				break;
			default:
				if (useAlternativeAPI) {
					apiPath = `${kavitaAPI.url}/Series/v2?PageNumber=${page}&PageSize=${pageSize}`;
					body = {
						statements: [{ comparison: 0, field: 19, value: homepageSectionId }],
						combination: 1,
						sortOptions: { sortField: 1, isAscending: true },
						limitTo: 0
					};
				} else {
					apiPath = `${kavitaAPI.url}/Series/all?PageNumber=${page}&PageSize=${pageSize}&libraryId=${parseInt(homepageSectionId)}`;
				}
				break;
		}

		const request = App.createRequest({
			url: apiPath,
			data: JSON.stringify(body),
			method: 'POST'
		});

		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		let result: any;
		if (useBuiltInCache) {
			result = this.cacheManager.getCachedData(reqeustToString(request));
		}

		if (result === undefined) {
			const response = await this.requestManager.schedule(request, 1);
			result = JSON.parse(response.data ?? '[]');
		}

		if (useBuiltInCache) {
			this.cacheManager.setCachedData(reqeustToString(request), result);
			result = result.slice((page - 1) * pageSize, page * pageSize);
		}

		if (checkLibraryId) {
			const libraryRequest = App.createRequest({
				url: `${kavitaAPI.url}/Library`,
				method: 'GET',
			});

			const libraryResponse = await this.requestManager.schedule(libraryRequest, 1);
			const libraryResult = JSON.parse(libraryResponse.data ?? '[]');

			for (const library of libraryResult) {
				if (library.type === 2) excludeLibraryIds.push(library.id);
			}
		}

		const tiles: PartialSourceManga[] = [];
		for (const series of result) {
			if (checkLibraryId && excludeBookTypeLibrary && excludeLibraryIds.includes(series.libraryId)) continue;
			tiles.push(App.createPartialSourceManga({
				title: series[title],
				image: `${kavitaAPI.url}/image/series-cover?seriesId=${series[id]}&apiKey=${kavitaAPI.key}`,
				mangaId: `${series[id]}`,
				subtitle: undefined
			}));
		}

		metadata = tiles.length === 0 ? undefined : { page: page };
		return App.createPagedResults({
			results: tiles,
			metadata: metadata
		});
	}

	async getMangaProgress(mangaId: string): Promise<MangaProgress | undefined> {
		const kavitaAPI = await getKavitaAPI(this.stateManager);
		const request = App.createRequest({
			url: `${kavitaAPI.url}/Series/volumes`,
			param: `?seriesId=${mangaId}`,
			method: 'GET',
		});

		const response = await this.requestManager.schedule(request, 1);
		const result = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		const chapters: any[] = [];

		let i = 0;
		for (const volume of result) {
			for (const chapter of volume.chapters) {
				// rome-ignore lint/suspicious/noExplicitAny: <explanation>
				const item: any = {
					chapNum: parseFloat(chapter.number),
					volume: volume.number,
					time: new Date(chapter.lastReadingProgressUtc),
					read: chapter.pagesRead === chapter.pages,
					_index: i++,
				};
				
				if (!chapter.isSpecial) chapters.push(item);
			}
		}

		chapters.sort(sortHelper);

		let lastReadChapterNumber = 0;
		let lastReadVolumeNumber = 0;
		let lastReadTime = new Date(0);

		for (const chapter of chapters) {
			if (chapter.read) {
				lastReadChapterNumber = chapter.chapNum;
				lastReadVolumeNumber = chapter.volume;
				lastReadTime = chapter.time;
			} else {
				break;
			}
		}
		
		return App.createMangaProgress({
			mangaId: mangaId,
			lastReadChapterNumber: lastReadChapterNumber,
			lastReadVolumeNumber: lastReadVolumeNumber,
			trackedListName: 'TEST',
			lastReadTime: lastReadTime
		});
	}

	async getMangaProgressManagementForm(mangaId: string): Promise<DUIForm> {
		return App.createDUIForm({
			sections: async () => {
				const kavitaAPI = await getKavitaAPI(this.stateManager);

				const request = App.createRequest({
					url: `${kavitaAPI.url}/Series/${mangaId}`,
					method: 'GET',
				});
				const response = await this.requestManager.schedule(request, 1);
				const result = JSON.parse(response?.data ?? '{}');

				return [
					App.createDUISection({
						id: 'seriesInfo',
						header: 'Info',
						isHidden: false,
						rows: async () => [
							App.createDUILabel({
								id: 'seriesId',
								label: 'SeriesID',
								value: mangaId
							}),
							App.createDUILabel({
								id: 'libraryId',
								label: 'LibraryID',
								value: `${result.libraryId}`
							}),
							App.createDUILabel({
								id: 'pagesRead',
								label: 'Pages Read',
								value: `${result.pagesRead} / ${result.pages}`
							})
						]
					}),
					App.createDUISection({
						id: 'userReview',
						header: 'Rating & Review',
						isHidden: false,
						rows: async () => [
							App.createDUIStepper({
								id: 'rating',
								label: 'Rating',
								value: result.userRating ?? 0,
								min: 0,
								max: 5,
								step: 1
							}),
							App.createDUIInputField({
								id: 'review',
								label: '',
								value: result.userReview ?? '',
							})
						]
					})
				]
			},
			onSubmit: async (values) => {
				const kavitaAPI = await getKavitaAPI(this.stateManager);

				await this.requestManager.schedule(App.createRequest({
                    url: `${kavitaAPI.url}/Series/update-rating`,
					data: JSON.stringify({seriesId: mangaId, userRating: values.rating, userReview: values.review}),
                    method: 'POST'
                }), 1);
			}
		});
	}

	async processChapterReadActionQueue(actionQueue: TrackerActionQueue): Promise<void> {
		const chapterReadActions = await actionQueue.queuedChapterReadActions();
		const kavitaAPI = await getKavitaAPI(this.stateManager);

		for (const readAction of chapterReadActions) {
			if (!(await this.interceptor.isServerAvailable())) {
				await actionQueue.retryChapterReadAction(readAction);
				continue;
			}

			try {
				const chapterRequest = App.createRequest({
					url: `${kavitaAPI.url}/Reader/chapter-info`,
					param: `?chapterId=${readAction.sourceChapterId}`,
					method: 'GET',
				});

				const chapterResponse = await this.requestManager.schedule(chapterRequest, 1);
				const chapterResult = JSON.parse(chapterResponse?.data ?? '{}');

				const progressRequest = App.createRequest({
					url: `${kavitaAPI.url}/Reader/progress`,
					data: JSON.stringify({
						volumeId: chapterResult.volumeId,
						chapterId: parseInt(readAction.sourceChapterId),
						pageNum: chapterResult.pages,
						seriesId: chapterResult.seriesId,
						libraryId: chapterResult.libraryId
					}),
					method: 'POST',
				});

				const progressResponse = await this.requestManager.schedule(progressRequest, 1);

				if(progressResponse.status < 400) {
					await actionQueue.discardChapterReadAction(readAction);
				} else {
					await actionQueue.retryChapterReadAction(readAction);
				}
			} catch(error) {
				await actionQueue.retryChapterReadAction(readAction);
			}
		}
	}
}