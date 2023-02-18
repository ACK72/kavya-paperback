import {
	Chapter,
	ChapterDetails,
	ContentRating,
	HomeSection,
	Manga,
	MangaStatus,
	MangaTile,
	PagedResults,
	Response,
	SearchRequest,
	Section,
	Source,
	SourceInfo,
	TagType,
} from "paperback-extensions-common";
import {
	serverSettingsMenu
} from "./Settings";
import {
	getKavitaAPI,
	getKavitaOPDS,
	getOptions,
	getServerUnavailableMangaTiles,
} from "./Common";

export const KavyaInfo: SourceInfo = {
	version: "0.1.0",
	name: "Kavya",
	icon: "icon.png",
	author: "ACK72",
	authorWebsite: "https://github.com/ACK72",
	description: "Kavita client extension for Paperback",
	contentRating: ContentRating.EVERYONE,
	websiteBaseURL: "https://www.kavitareader.com/",
	sourceTags: [
		{
			text: "Kavita",
			type: TagType.GREEN,
		},
	],
};

export class Kavya extends Source {
	stateManager = createSourceStateManager({});

	requestManager = createRequestManager({
		requestsPerSecond: 4,
		requestTimeout: 20000
	});

	override async getSourceMenu(): Promise<Section> {
		return createSection({
			id: "main",
			header: "Source Settings",
			rows: async () => [
				serverSettingsMenu(this.stateManager)
			],
		});
	}

	async getMangaDetails(mangaId: string): Promise<Manga> {
		const kavitaAPI = await getKavitaAPI(this.stateManager);
		const kavitaOPDS = await getKavitaOPDS(this.stateManager);

		const request = createRequestObject({
			url: `${kavitaOPDS}/series/${mangaId}`,
			method: "GET",
		});

		const response = await this.requestManager.schedule(request, 1);

		let $ = this.cheerio.load(response.data, { xmlMode: true });

		return createManga({
			id: mangaId,
			titles: [$("title").first().text()],
			image: `${kavitaAPI}/image/series-cover?seriesId=${mangaId}`,
			desc: "",
			status: MangaStatus.UNKNOWN,
		});
	}

	async getChapters(mangaId: string): Promise<Chapter[]> {
		const kavitaOPDS = await getKavitaOPDS(this.stateManager);

		const request = createRequestObject({
			url: `${kavitaOPDS}/series/${mangaId}`,
			method: "GET",
		});

		const response = await this.requestManager.schedule(request, 1);

		let $ = this.cheerio.load(response.data, { xmlMode: true });

		const chapters: Chapter[] = [];

		$("entry").each((index, element) => {
			chapters.push(
				createChapter({
					id: $("id", element).first().text(),
					mangaId: mangaId,
					chapNum: parseFloat($("id", element).first().text()),
					name: `${$("title").first().text()} - ${$("title", element).first().text()}`,
					// @ts-ignore
					sortingIndex: index
				})
			);
		});

		return chapters;
	}

	async getChapterDetails(
		mangaId: string,
		chapterId: string
	): Promise<ChapterDetails> {
		const kavitaAPI = await getKavitaAPI(this.stateManager);
		const kavitaOPDS = await getKavitaOPDS(this.stateManager);

		const request = createRequestObject({
			url: `${kavitaOPDS}/series/4/volume/${chapterId}/chapter/${chapterId}`,
			method: "GET",
		});

		const response = await this.requestManager.schedule(request, 1);
		
		let $ = this.cheerio.load(response.data, { xmlMode: true });

		const pages: string[] = [];
		const pool: {[key: string]: number} = {};

		$('[rel="http://vaemendis.net/opds-pse/stream"]').each((_, element) => {
			const url = $(element).attr("href") ?? "";
			const count = parseInt($(element).attr("p5:count") ?? "0");

			let start = pool[url] ?? 0;
			for (let i = 1;i <= count;i++) {
				pages.push(kavitaAPI + url.slice(4).replace('{pageNumber}', `${start + i}`));
			}
			
			pool[url] = start + count;
		});
		
		return createChapterDetails({
			id: chapterId,
			longStrip: false,
			mangaId: mangaId,
			pages: pages,
		});
	}

	override async getSearchResults(
		searchQuery: SearchRequest,
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		metadata: any
	): Promise<PagedResults> {
		// This function is also called when the user search in an other source. It should not throw if the server is unavailable.
		const kavitaAPI = await getKavitaAPI(this.stateManager);
		const kavitaOPDS = await getKavitaOPDS(this.stateManager);

		if (kavitaOPDS === null) {
			console.log("searchRequest failed because server settings are unset");
			return createPagedResults({
				results: getServerUnavailableMangaTiles(),
			});
		}

		const request = createRequestObject({
			url: `${kavitaOPDS}/series`,
			param: `?query=${encodeURIComponent(searchQuery.title ?? "''")}`,
			method: "GET"
		});
	
		// We don't want to throw if the server is unavailable
		let response: Response;
		try {
			response = await this.requestManager.schedule(request, 1);
		} catch (error) {
			console.log(`searchRequest failed with error: ${error}`);
			return createPagedResults({
				results: getServerUnavailableMangaTiles(),
			});
		}
		
		let $ = this.cheerio.load(response.data, { xmlMode: true });
		
		const tiles: MangaTile[] = [];

		$("entry").each((_, element) => {
			tiles.push(
				createMangaTile({
					id: $("id", element).first().text(),
					title: createIconText({ text: $("title", element).first().text() }),
					image: `${kavitaAPI}/image/series-cover?seriesId=${$("id", element).first().text()}`,
				})
			);
		});
		
		return createPagedResults({
			results: tiles
		});
	}

	override async getHomePageSections(
		sectionCallback: (section: HomeSection) => void
	): Promise<void> {
		// This function is called on the homepage and should not throw if the server is unavailable

		// We won't use `await this.getKavitaAPI()` as we do not want to throw an error on
		// the homepage when server settings are not set
		const kavitaAPI = await getKavitaAPI(this.stateManager);
		const kavitaOPDS = await getKavitaOPDS(this.stateManager);
		const { showOnDeck, showRecentlyAdded } = await getOptions(this.stateManager);


		if (kavitaOPDS === null) {
			console.log("searchRequest failed because server settings are unset");
			const section = createHomeSection({
				id: "unset",
				title: "Go to source settings to set your Kavita server.",
				view_more: false,
				items: getServerUnavailableMangaTiles(),
			});
			sectionCallback(section);
			return;
		}

		// The source define two homepage sections: new and latest
		const sections = [];

		if (showOnDeck) {
			sections.push(createHomeSection({
				id: 'ondeck',
				title: 'On Deck',
				view_more: false,
			}));
		}

		if (showRecentlyAdded) {
			sections.push(createHomeSection({
				id: 'new',
				title: 'Recently added series',
				view_more: true,
			}));
		}

		const request = createRequestObject({
			url: `${kavitaOPDS}/libraries`,
			method: "GET",
		});

		const response = await this.requestManager.schedule(request, 1);
		
		let $ = this.cheerio.load(response.data, { xmlMode: true });

		$("entry").each((_, element) => {
			sections.push(createHomeSection({
				id: $("id", element).first().text(),
				title: $("title", element).first().text(),
				view_more: true,
			}));
		});

		const promises: Promise<void>[] = [];

		for (const section of sections) {
			// Let the app load empty tagSections
			sectionCallback(section);

			let apiPath: string;
			switch (section.id) {
				case 'ondeck':
					apiPath = `${kavitaOPDS}/on-deck`;
					break;
				case 'new':
					apiPath = `${kavitaOPDS}/recently-added`;
					break;
				default:
					apiPath = `${kavitaOPDS}/libraries/${section.id}`;
					break;
			}

			const request = createRequestObject({
				url: apiPath,
				method: "GET",
			});

			// Get the section data
			promises.push(
				this.requestManager.schedule(request, 1).then((response) => {
					let $ = this.cheerio.load(response.data, { xmlMode: true });

					const tiles: MangaTile[] = [];

					$("entry").each((_, element) => {
						tiles.push(
							createMangaTile({
								id: $("id", element).first().text(),
								title: createIconText({ text: $("title", element).first().text() }),
								image: `${kavitaAPI}/image/series-cover?seriesId=${$("id", element).first().text()}`,
							})
						);
					});

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
		const kavitaAPI = await getKavitaAPI(this.stateManager);
		const kavitaOPDS = await getKavitaOPDS(this.stateManager);

		let apiPath: string;
		switch (homepageSectionId) {
			case 'ondeck':
				apiPath = `${kavitaOPDS}/on-deck`;
				break;
			case 'new':
				apiPath = `${kavitaOPDS}/recently-added`;
				break;
			default:
				apiPath = `${kavitaOPDS}/libraries/${homepageSectionId}`;
				break;
		}

		const request = createRequestObject({
			url: apiPath,
			method: "GET",
		});

		const response = await this.requestManager.schedule(request, 1);

		let $ = this.cheerio.load(response.data, { xmlMode: true });

		const tiles: MangaTile[] = [];

		$("entry").each((_, element) => {
			tiles.push(
				createMangaTile({
					id: $("id", element).first().text(),
					title: createIconText({ text: $("title", element).first().text() }),
					image: `${kavitaAPI}/image/series-cover?seriesId=${$("id", element).first().text()}`,
				})
			);
		});

		return createPagedResults({
			results: tiles
		});
	}
}