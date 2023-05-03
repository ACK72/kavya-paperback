import {
	MangaStatus,
	Request,
	RequestInterceptor,
	RequestManager,
	Response,
	SearchRequest,
	SourceStateManager,
	Tag,
	TagSection,
} from 'paperback-extensions-common';


//
// Kavya Common Class & Methods
//
export const KAVITA_PUBLICATION_STATUS: MangaStatus[] = [
	MangaStatus.ONGOING,
	MangaStatus.HIATUS,
	MangaStatus.COMPLETED,
	MangaStatus.ABANDONED,
	MangaStatus.COMPLETED
];

export class KavitaRequestInterceptor implements RequestInterceptor {
	stateManager: SourceStateManager;
	authorization: string;

	constructor(stateManager: SourceStateManager) {
		this.stateManager = stateManager;
		this.authorization = '';
	}

	async isServerAvailable(): Promise<boolean> {
		if (this.authorization === '') {
			await this.updateAuthorization();
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
			...request.headers,
			...(typeof request.data === 'string' ? { 'Content-Type': 'application/json' } : {}),

			'Authorization': this.authorization
		}

		if (request.url.startsWith('FAKE*')) {
			request.url = request.url.split('*REAL*').pop() ?? '';
		}

		return request;
	}
}

export function getServerUnavailableMangaTiles() {
	// This tile is used as a placeholder when the server is unavailable
	return [
		createMangaTile({
			id: 'placeholder-id',
			title: createIconText({ text: 'Server' }),
			image: '',
			subtitleText: createIconText({ text: 'unavailable' }),
		}),
	];
}

export async function getSeriesDetails(mangaId: string, requestManager: RequestManager, stateManager: SourceStateManager) {
	const kavitaAPIUrl = await getKavitaAPIUrl(stateManager);
	const kavitaAPIKey = await getKavitaAPIKey(stateManager);

	const seriesRequest = createRequestObject({
		url: `${kavitaAPIUrl}/Series/${mangaId}`,
		method: 'GET',
	});
	const metadataRequest = createRequestObject({
		url: `${kavitaAPIUrl}/Series/metadata`,
		param: `?seriesId=${mangaId}`,
		method: 'GET',
	});

	const promises: Promise<Response>[] = [];

	promises.push(requestManager.schedule(seriesRequest, 1));
	promises.push(requestManager.schedule(metadataRequest, 1));

	const responses: Response[] = await Promise.all(promises);

	const seriesResult = typeof responses[0]?.data === 'string' ? JSON.parse(responses[0]?.data) : responses[0]?.data;
	const metadataResult = typeof responses[1]?.data === 'string' ? JSON.parse(responses[1]?.data) : responses[1]?.data;

	// exclude people tags for now
	const tagNames = ['genres', 'tags']
	const tagSections: TagSection[] = [];

	for (const tagName of tagNames) {
		const tags: Tag[] = [];

		for (const tag of metadataResult[tagName]) {
			tags.push(createTag({
				id: `${tagName}-${tag.id}`,
				label: tag.title
			}));
		}

		tagSections.push(createTagSection({
			id: tagName,
			label: tagName,
			tags: tags
		}));
	}

	return {
		id: mangaId,
		titles: [seriesResult.name],
		image: `${kavitaAPIUrl}/image/series-cover?seriesId=${mangaId}&apiKey=${kavitaAPIKey}`,
		rating: seriesResult.userRating,
		status: KAVITA_PUBLICATION_STATUS[metadataResult.publicationStatus] ?? MangaStatus.UNKNOWN,
		artist: typeof metadataResult.pencillers[0] === 'undefined' ? '' : metadataResult.pencillers[0].name,
		author: typeof metadataResult.writers[0] === 'undefined' ? '' : metadataResult.writers[0].name,
		desc: metadataResult.summary.replace(/<[^>]+>/g, ''),
		tags: tagSections,
		lastUpdate: new Date(seriesResult.lastChapterAdded)
	};
}

export function reqeustToString(request: Request): string {
	return JSON.stringify({
		url: request.url,
		data: request.data,
		method: request.method
	});
}

export function searchRequestToString(searchQuery: SearchRequest): string {
	return JSON.stringify({
		title: searchQuery.title,
		tags: searchQuery.includedTags?.map(tag => tag.id)
	});
}


//
// Kavya Setting State Methods
//
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const DEFAULT_VALUES: any = {
	kavitaAddress: 'https://demo.kavitareader.com',
	kavitaAPIUrl: 'https://demo.kavitareader.com/api',
	kavitaAPIKey: '',

	showOnDeck: true,
	showRecentlyUpdated: true,
	showNewlyAdded: true,
	excludeBookTypeLibrary: false,
	enableRecursiveSearch: false,
	displayReadInstedOfUnread: true,
	pageSize: 40
}

export async function getKavitaAPIUrl(stateManager: SourceStateManager): Promise<string> {
	return (await stateManager.retrieve('kavitaAPIUrl') as string | undefined) ?? DEFAULT_VALUES.kavitaAPIUrl;
}

export async function getKavitaAPIKey(stateManager: SourceStateManager): Promise<string> {
	return (await stateManager.keychain.retrieve('kavitaAPIKey') as string) ?? DEFAULT_VALUES.kavitaAPIKey;
}

export async function getAuthorizationString(stateManager: SourceStateManager): Promise<string> {
	const apiUri = (await stateManager.retrieve('kavitaAPIUrl') as string) ?? DEFAULT_VALUES.kavitaAPIUrl;
	const apiKey = (await stateManager.keychain.retrieve('kavitaAPIKey') as string) ?? DEFAULT_VALUES.kavitaAPIKey;

	const manager = createRequestManager({
		requestsPerSecond: 4,
		requestTimeout: 20000
	});
	const request = createRequestObject({
		url: `${apiUri}/Plugin/authenticate`,
		param: `?apiKey=${apiKey}&pluginName=Kavya`,
		method: 'POST',
	});
	const response = await manager.schedule(request, 1);
	const token = typeof response.data === 'string' ? JSON.parse(response.data).token : undefined;

	return token ? `Bearer ${token}` : '';
}

export async function getOptions(
	stateManager: SourceStateManager
): Promise<{
	showOnDeck: boolean;
	showRecentlyUpdated: boolean;
	showNewlyAdded: boolean;
	excludeBookTypeLibrary: boolean;
	enableRecursiveSearch: boolean;
	displayReadInstedOfUnread: boolean;
	pageSize: number;
}> {
	const showOnDeck = (await stateManager.retrieve('showOnDeck') as boolean) ?? DEFAULT_VALUES.showOnDeck;
	const showRecentlyUpdated = (await stateManager.retrieve('showRecentlyUpdated') as boolean) ?? DEFAULT_VALUES.showRecentlyUpdated;
	const showNewlyAdded = (await stateManager.retrieve('showNewlyAdded') as boolean) ?? DEFAULT_VALUES.showNewlyAdded;
	const excludeBookTypeLibrary = (await stateManager.retrieve('excludeBookTypeLibrary') as boolean) ?? DEFAULT_VALUES.excludeBookTypeLibrary;
	const enableRecursiveSearch = (await stateManager.retrieve('enableRecursiveSearch') as boolean) ?? DEFAULT_VALUES.enableRecursiveSearch;
	const displayReadInstedOfUnread = (await stateManager.retrieve('displayReadInstedOfUnread') as boolean) ?? DEFAULT_VALUES.displayReadInstedOfUnread;
	const pageSize = (await stateManager.retrieve('pageSize') as number) ?? DEFAULT_VALUES.pageSize;

	return { showOnDeck, showRecentlyUpdated, showNewlyAdded, excludeBookTypeLibrary, enableRecursiveSearch, displayReadInstedOfUnread, pageSize };
}


//
// Kavya Logging Methods
//
export function log(message: string) {
	console.log(`[Kavya] ${message}`);
}