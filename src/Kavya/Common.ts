import {
	SourceStateManager,
} from 'paperback-extensions-common';
import { KavitaRequestInterceptor } from './Kavya';

export function log(message: string) {
	console.log(`[Kavya] ${message}`);
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

// 
// KAVITA API STATE METHODS
//
const DEFAULT_KAVITA_SERVER_ADDRESS = 'https://demo.kavitareader.com'
const DEFAULT_KAVITA_SERVER_API_URL = `${DEFAULT_KAVITA_SERVER_ADDRESS}/api`
const DEFAULT_KAVITA_SERVER_API_KEY = ''

const DEFAULT_SHOW_ON_DECK = true
const DEFAULT_SHOW_RECENTLY_UPDATED = true
const DEFAULT_SHOW_NEWLY_ADDED = true

const DEFAULT_ENABLE_RECURSIVE_SEARCH = false

const DEFAULT_EXCLUDE_BOOK_TYPE_LIBRARY = false

export async function getKavitaAPIUrl(stateManager: SourceStateManager): Promise<string> {
	return (await stateManager.retrieve('kavitaAPIUrl') as string | undefined) ?? DEFAULT_KAVITA_SERVER_API_URL
}

export async function getAuthorizationString(stateManager: SourceStateManager): Promise<string> {
	const apiUri = (await stateManager.retrieve('kavitaAPIUrl') as string) ?? DEFAULT_KAVITA_SERVER_API_URL
	const apiKey = (await stateManager.keychain.retrieve('kavitaAPIKey') as string) ?? DEFAULT_KAVITA_SERVER_API_KEY

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

export async function getOptions(stateManager: SourceStateManager): Promise<{ showOnDeck: boolean; showRecentlyUpdated: boolean; showNewlyAdded: boolean; enableRecursiveSearch: boolean; excludeBookTypeLibrary: boolean }> {
	const showOnDeck = (await stateManager.retrieve('showOnDeck') as boolean) ?? DEFAULT_SHOW_ON_DECK
	const showRecentlyUpdated = (await stateManager.retrieve('showRecentlyUpdated') as boolean) ?? DEFAULT_SHOW_RECENTLY_UPDATED
	const showNewlyAdded = (await stateManager.retrieve('showNewlyAdded') as boolean) ?? DEFAULT_SHOW_NEWLY_ADDED

	const enableRecursiveSearch = (await stateManager.retrieve('enableRecursiveSearch') as boolean) ?? DEFAULT_ENABLE_RECURSIVE_SEARCH

	const excludeBookTypeLibrary = (await stateManager.retrieve('excludeBookTypeLibrary') as boolean) ?? DEFAULT_EXCLUDE_BOOK_TYPE_LIBRARY

	return { showOnDeck, showRecentlyUpdated, showNewlyAdded, enableRecursiveSearch, excludeBookTypeLibrary }
}

export async function retrieveStateData(stateManager: SourceStateManager) {
	const kavitaURL = (await stateManager.retrieve('kavitaAddress') as string) ?? DEFAULT_KAVITA_SERVER_ADDRESS
	const kavitaAPIKey = (await stateManager.keychain.retrieve('kavitaAPIKey') as string) ?? DEFAULT_KAVITA_SERVER_API_KEY

	const showOnDeck = (await stateManager.retrieve('showOnDeck') as boolean) ?? DEFAULT_SHOW_ON_DECK
	const showRecentlyUpdated = (await stateManager.retrieve('showRecentlyUpdated') as boolean) ?? DEFAULT_SHOW_RECENTLY_UPDATED
	const showNewlyAdded = (await stateManager.retrieve('showNewlyAdded') as boolean) ?? DEFAULT_SHOW_NEWLY_ADDED

	const enableRecursiveSearch = (await stateManager.retrieve('enableRecursiveSearch') as boolean) ?? DEFAULT_ENABLE_RECURSIVE_SEARCH

	const excludeBookTypeLibrary = (await stateManager.retrieve('excludeBookTypeLibrary') as boolean) ?? DEFAULT_EXCLUDE_BOOK_TYPE_LIBRARY

	return { kavitaURL, kavitaAPIKey, showOnDeck, showRecentlyUpdated, showNewlyAdded, enableRecursiveSearch, excludeBookTypeLibrary }
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function setStateData(stateManager: SourceStateManager, interceptor: KavitaRequestInterceptor, data: Record<string, any>) {
	await setKavitaServer(
		stateManager,
		data['kavitaAddress'] ?? DEFAULT_KAVITA_SERVER_ADDRESS,
		data['kavitaAPIKey'] ?? DEFAULT_KAVITA_SERVER_API_KEY,
	)
	await interceptor.updateAuthorization();
	await setOptions(
		stateManager,
		data['showOnDeck'] ?? DEFAULT_SHOW_ON_DECK,
		data['showRecentlyUpdated'] ?? DEFAULT_SHOW_RECENTLY_UPDATED,
		data['showNewlyAdded'] ?? DEFAULT_SHOW_NEWLY_ADDED,
		data['enableRecursiveSearch'] ?? DEFAULT_ENABLE_RECURSIVE_SEARCH,
		data['excludeBookTypeLibrary'] ?? DEFAULT_EXCLUDE_BOOK_TYPE_LIBRARY
	)
}

async function setKavitaServer(stateManager: SourceStateManager, apiUri: string, apiKey: string) {
	await stateManager.store('kavitaAddress', apiUri)
	await stateManager.store('kavitaAPIUrl', apiUri + (apiUri.slice(-1) === '/' ? 'api' : '/api'))
	await stateManager.keychain.store('kavitaAPIKey', apiKey)
}

async function setOptions(
	stateManager: SourceStateManager,
	showOnDeck: boolean,
	showRecentlyUpdated: boolean,
	showNewlyAdded: boolean,
	enableRecursiveSearch: boolean,
	excludeBookTypeLibrary: boolean
) {
	await stateManager.store('showOnDeck', showOnDeck)
	await stateManager.store('showRecentlyUpdated', showRecentlyUpdated)
	await stateManager.store('showNewlyAdded', showNewlyAdded)
	await stateManager.store('enableRecursiveSearch', enableRecursiveSearch)
	await stateManager.store('excludeBookTypeLibrary', excludeBookTypeLibrary)
}