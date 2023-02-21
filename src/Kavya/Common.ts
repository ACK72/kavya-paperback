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
const DEFAULT_KAVITA_SERVER_API_KEY = ''

const DEFAULT_KAVITA_API = `${DEFAULT_KAVITA_SERVER_ADDRESS}/api`

const DEFAULT_SHOW_ON_DECK = true
const DEFAULT_SHOW_RECENTLY_UPDATED = true
const DEFAULT_SHOW_NEWLY_ADDED = true

export async function getKavitaAPI(stateManager: SourceStateManager): Promise<string> {
	return (await stateManager.retrieve('kavitaAPI') as string | undefined) ?? DEFAULT_KAVITA_API
}

export async function getAuthorizationString(stateManager: SourceStateManager): Promise<string> {
	const apiUri = (await stateManager.retrieve('kavitaAPI') as string) ?? DEFAULT_KAVITA_API
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

export async function getOptions(stateManager: SourceStateManager): Promise<{ showOnDeck: boolean; showRecentlyUpdated: boolean; showNewlyAdded: boolean; }> {
	const showOnDeck = (await stateManager.retrieve('showOnDeck') as boolean) ?? DEFAULT_SHOW_ON_DECK
	const showRecentlyUpdated = (await stateManager.retrieve('showRecentlyUpdated') as boolean) ?? DEFAULT_SHOW_RECENTLY_UPDATED
	const showNewlyAdded = (await stateManager.retrieve('showNewlyAdded') as boolean) ?? DEFAULT_SHOW_NEWLY_ADDED

	return { showOnDeck, showRecentlyUpdated, showNewlyAdded }
}

export async function retrieveStateData(stateManager: SourceStateManager) {
	const kavitaURL = (await stateManager.retrieve('kavitaAddress') as string) ?? DEFAULT_KAVITA_SERVER_ADDRESS
	const kavitaAPIKey = (await stateManager.keychain.retrieve('kavitaAPIKey') as string) ?? DEFAULT_KAVITA_SERVER_API_KEY

	const showOnDeck = (await stateManager.retrieve('showOnDeck') as boolean) ?? DEFAULT_SHOW_ON_DECK
	const showRecentlyUpdated = (await stateManager.retrieve('showRecentlyUpdated') as boolean) ?? DEFAULT_SHOW_RECENTLY_UPDATED
	const showNewlyAdded = (await stateManager.retrieve('showNewlyAdded') as boolean) ?? DEFAULT_SHOW_NEWLY_ADDED

	return { kavitaURL, kavitaAPIKey, showOnDeck, showRecentlyUpdated, showNewlyAdded }
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
		data['showNewlyAdded'] ?? DEFAULT_SHOW_NEWLY_ADDED
	)
}

async function setKavitaServer(stateManager: SourceStateManager, apiUri: string, apiKey: string) {
	await stateManager.store('kavitaAddress', apiUri)
	await stateManager.store('kavitaAPI', apiUri + (apiUri.slice(-1) === '/' ? 'api' : '/api'))
	await stateManager.keychain.store('kavitaAPIKey', apiKey)
}

async function setOptions(stateManager: SourceStateManager, showOnDeck: boolean, showRecentlyUpdated: boolean, showNewlyAdded: boolean) {
	await stateManager.store('showOnDeck', showOnDeck)
	await stateManager.store('showRecentlyUpdated', showRecentlyUpdated)
	await stateManager.store('showNewlyAdded', showNewlyAdded)
}