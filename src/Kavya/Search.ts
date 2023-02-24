import {
	MangaTile,
	Request,
	RequestManager,
	SearchRequest, 
	SourceStateManager
} from "paperback-extensions-common";
import { CacheManager } from "./CacheManager";
import {
	KavitaRequestInterceptor,
	getKavitaAPIUrl,
	getOptions,
	getServerUnavailableMangaTiles,
	searchRequestToString,
	log
} from "./Common";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const KAVITA_PERSON_ROLES: any = {
	'1': 'other',
	'2': 'artist',
	'3': 'writers', // KavitaAPI /api/series/all uses 'writers' instead of 'writer'
	'4': 'penciller',
	'5': 'inker',
	'6': 'colorist',
	'7': 'letterer',
	'8': 'coverArtist',
	'9': 'editor',
	'10': 'publisher',
	'11': 'character',
	'12': 'translators' // KavitaAPI /api/series/all uses 'translators' instead of 'translator'
}

export async function searchRequest(
    searchQuery: SearchRequest,
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
	metadata: any,
    requestManager: RequestManager,
	interceptor: KavitaRequestInterceptor,
    stateManager: SourceStateManager,
	cacheManager: CacheManager
) {
	// This function is also called when the user search in an other source. It should not throw if the server is unavailable.
	if (!(await interceptor.isServerAvailable())) {
		log('searchRequest failed because server settings are invalid');

		return createPagedResults({
			results: getServerUnavailableMangaTiles(),
		});
	}
	
	const kavitaAPIUrl = await getKavitaAPIUrl(stateManager);
	const {enableRecursiveSearch, excludeBookTypeLibrary, pageSize} = await getOptions(stateManager);
	const page: number = metadata?.page ?? 0;

	const excludeLibraryIds: number[] = [];

	if (excludeBookTypeLibrary) {
		const request = createRequestObject({
			url: `${kavitaAPIUrl}/Library`,
			method: 'GET'
		});

		const response = await requestManager.schedule(request, 1);
		const result = JSON.parse(response.data);

		for (const library of result) {
			if (library.type === 2) {
				excludeLibraryIds.push(library.id);
			}
		}
	}

	const titleSearchIds: string[] = [];
	
	const tagSearchTiles: MangaTile[] = [];
	const titleSearchTiles: MangaTile[] = [];

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	let  result: any;
	if (cacheManager.getCachedData(searchRequestToString(searchQuery)) !== undefined) {
		result = cacheManager.getCachedData(searchRequestToString(searchQuery));
	} else {
		if (typeof searchQuery.title === 'string' && searchQuery.title !== '') {			
			const titleRequest = createRequestObject({
				url: `${kavitaAPIUrl}/Search/search`,
				param: `?queryString=${encodeURIComponent(searchQuery.title)}`,
				method: 'GET'
			});
	
			// We don't want to throw if the server is unavailable
			const titleResponse = await requestManager.schedule(titleRequest, 1);
			const titleResult = JSON.parse(titleResponse.data);
	
			for (const manga of titleResult.series) {
				if (excludeLibraryIds.includes(manga.libraryId)) {
					continue;
				}
	
				titleSearchIds.push(manga.seriesId);
				titleSearchTiles.push(
					createMangaTile({
						id: `${manga.seriesId}`,
						title: createIconText({text: manga.name}),
						image: `${kavitaAPIUrl}/image/series-cover?seriesId=${manga.seriesId}`
					})
				);
			}
	
			if (enableRecursiveSearch) {
				const tagNames: string[] = ['persons', 'genres', 'tags'];
	
				for (const tagName of tagNames) {
					for (const item of titleResult[tagName]) {
						let titleTagRequest: Request;
	
						switch (tagName) {
							case 'persons':
								titleTagRequest = createRequestObject({
									url: `${kavitaAPIUrl}/Series/all`,
									data: JSON.stringify({[KAVITA_PERSON_ROLES[item.role]]: [item.id]}),
									method: 'POST'
								});
								break;
							default:
								titleTagRequest = createRequestObject({
									url: `${kavitaAPIUrl}/Series/all`,
									data: JSON.stringify({[tagName]: [item.id]}),
									method: 'POST'
								});
						}
	
						const titleTagResponse = await requestManager.schedule(titleTagRequest, 1);
						const titleTagResult = JSON.parse(titleTagResponse.data);
	
						for (const manga of titleTagResult) {
							if (!titleSearchIds.includes(manga.id)) {
								titleSearchIds.push(manga.id);
								titleSearchTiles.push(
									createMangaTile({
										id: `${manga.id}`,
										title: createIconText({text: manga.name}),
										image: `${kavitaAPIUrl}/image/series-cover?seriesId=${manga.id}`
									})
								);
							}
						}
					}
				}
			}
		}
	
	
		if (typeof searchQuery.includedTags !== 'undefined') {
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			let body: any = {};
			const peopleTags: string[] = [];
	
			searchQuery.includedTags.forEach(async (tag) => {
				switch (tag.id.split('-')[0]) {
					case 'people':
						peopleTags.push(tag.label);
						break;
					default:
						body[tag.id.split('-')[0] ?? ''] = body[tag.id.split('-')[0] ?? ''] ?? []
						body[tag.id.split('-')[0] ?? ''].push(parseInt(tag.id.split('-')[1] ?? '0'));
				}
			});
	
			const peopleRequest = createRequestObject({
				url: `${kavitaAPIUrl}/Metadata/people`,
				method: 'GET'
			});
	
			const peopleResponse = await requestManager.schedule(peopleRequest, 1);
			const peopleResult = JSON.parse(peopleResponse.data);
	
			for (const people of peopleResult) {
				if (peopleTags.includes(people.name)) {
					body[KAVITA_PERSON_ROLES[people.role]] = body[KAVITA_PERSON_ROLES[people.role]] ?? [];
					body[KAVITA_PERSON_ROLES[people.role]].push(people.id);
				}
			}
			
			const tagRequst = createRequestObject({
				url: `${kavitaAPIUrl}/Series/all`,
				data: JSON.stringify(body),
				method: 'POST'
			});
	
			const tagResponse = await requestManager.schedule(tagRequst, 1);
			const tagResult = JSON.parse(tagResponse.data);
	
			for (const manga of tagResult) {
				tagSearchTiles.push(
					createMangaTile({
						id: `${manga.id}`,
						title: createIconText({text: manga.name}),
						image: `${kavitaAPIUrl}/image/series-cover?seriesId=${manga.id}`,
					})
				);
			}
		}
	
		result = (tagSearchTiles.length > 0 && titleSearchTiles.length > 0) ? tagSearchTiles.filter((value) => titleSearchTiles.some((target) => target.image === value.image)) : titleSearchTiles.concat(tagSearchTiles)
		cacheManager.setCachedData(searchRequestToString(searchQuery), result)
	}

	result = result.slice(page * pageSize, (page + 1) * pageSize);
	metadata = result.length === 0 ? undefined : { page: page + 1 };

	return createPagedResults({
		results: result,
		metadata: metadata
	});
}