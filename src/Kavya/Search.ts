import {
	MangaTile,
	Request,
	RequestManager,
	SearchRequest, 
	SourceStateManager
} from "paperback-extensions-common";
import {
	getKavitaAPIUrl,
	getOptions,
	getServerUnavailableMangaTiles,
	log
} from "./Common";
import {
	KavitaRequestInterceptor
} from "./Kavya";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const KAVITA_PERSON_ROLES: any = {
	'1': 'other',
	'2': 'artist',
	'3': 'writer',
	'4': 'penciller',
	'5': 'inker',
	'6': 'colorist',
	'7': 'letterer',
	'8': 'coverArtist',
	'9': 'editor',
	'10': 'publisher',
	'11': 'character',
	'12': 'translators',
}

export async function searchRequest(
    searchQuery: SearchRequest,
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
	metadata: any,
    requestManager: RequestManager,
	interceptor: KavitaRequestInterceptor,
    stateManager: SourceStateManager
) {
	// This function is also called when the user search in an other source. It should not throw if the server is unavailable.
	if (!(await interceptor.isServerAvailable())) {
		log('searchRequest failed because server settings are invalid');

		return createPagedResults({
			results: getServerUnavailableMangaTiles(),
		});
	}
	
	const kavitaAPIUrl = await getKavitaAPIUrl(stateManager);
	const enableRecursiveSearch = (await getOptions(stateManager)).enableRecursiveSearch;

	const titleSearchIds: string[] = [];
	
	const tagSearchTiles: MangaTile[] = [];
	const titleSearchTiles: MangaTile[] = [];
	
	let peopleSearchTiles: MangaTile[] = [];

	const queryString = (typeof searchQuery.title === 'undefined' || searchQuery.title === '') ? '""' : searchQuery.title;

	const titleRequest = createRequestObject({
		url: `${kavitaAPIUrl}/Search/search`,
		param: `?queryString=${encodeURIComponent(queryString)}`,
		method: 'GET'
	});

	// We don't want to throw if the server is unavailable
	const titleResponse = await requestManager.schedule(titleRequest, 1);
	const titleResult = JSON.parse(titleResponse.data);

	for (const manga of titleResult.series) {
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
		const tags: string[] = ['persons', 'genres', 'tags'];

		for (const tag of tags) {
			for (const item of titleResult[tag]) {
				let titleTagRequest: Request;

				switch (tag) {
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
							data: JSON.stringify({[tag]: [item.id]}),
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
					body = {
						...body,
						[tag.id.split('-')[0] ?? '']: [parseInt(tag.id.split('-')[1] ?? '0')]
					}
			}
		});

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

		const peopleRequest = createRequestObject({
			url: `${kavitaAPIUrl}/Metadata/people`,
			method: 'GET'
		});

		const peopleResponse = await requestManager.schedule(peopleRequest, 1);
		const peopleResult = JSON.parse(peopleResponse.data);

		const promises: Promise<MangaTile[]>[] = [];

		for (const people of peopleResult) {
			if (peopleTags.includes(people.name)) {
				const request = createRequestObject({
					url: `${kavitaAPIUrl}/Series/all`,
					data: JSON.stringify({[KAVITA_PERSON_ROLES[people.role]]: [people.id]}),
					method: 'POST'
				});

				promises.push(
					(requestManager.schedule(request, 1).then((response) => {
						const result = JSON.parse(response.data);
						const tiles: MangaTile[] = [];

						for (const manga of result) {
							tiles.push(
								createMangaTile({
									id: `${manga.id}`,
									title: createIconText({text: manga.name}),
									image: `${kavitaAPIUrl}/image/series-cover?seriesId=${manga.id}`
								})
							)
						}

						return tiles;
					}))
				);
			}
		}

		peopleSearchTiles = (await Promise.all(promises)).flat();

		// Remove duplicates
		// as tile.id returns undefined (but, why ???), we use image instead
		peopleSearchTiles = peopleSearchTiles.filter((value, index, self) => index === self.findIndex((target) => target.image === value.image))

		// intersection of tagSearchTiles and peopleSearchTiles
		peopleSearchTiles = peopleSearchTiles.length > 0 ? peopleSearchTiles.filter((value) => tagSearchTiles.some((target) => target.image === value.image)) : tagSearchTiles;
	}

	peopleSearchTiles = peopleSearchTiles.length > 0 ? peopleSearchTiles.filter((value) => titleSearchTiles.some((target) => target.image === value.image)) : titleSearchTiles;

	return createPagedResults({
		results: peopleSearchTiles
	});
}