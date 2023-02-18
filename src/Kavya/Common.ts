import {
	SourceStateManager,
} from "paperback-extensions-common";

export function getServerUnavailableMangaTiles() {
	// This tile is used as a placeholder when the server is unavailable
	return [
		createMangaTile({
			id: "placeholder-id",
			title: createIconText({ text: "Server" }),
			image: "",
			subtitleText: createIconText({ text: "unavailable" }),
		}),
	];
}

// 
// KAVITA API STATE METHODS
//
const DEFAULT_KAVITA_SERVER_ADDRESS = 'https://demo.kavitareader.com'
const DEFAULT_KAVITA_SERVER_API_KEY = ''

const DEFAULT_KAVITA_API = `${DEFAULT_KAVITA_SERVER_ADDRESS}/api`
const DEFAULT_KAVITA_OPDS = `${DEFAULT_KAVITA_SERVER_ADDRESS}/api/opds/${DEFAULT_KAVITA_SERVER_API_KEY}`

const DEFAULT_SHOW_ON_DECK = true
const DEFAULT_SHOW_RECENTLY_ADDED = true

export async function getKavitaAPI(stateManager: SourceStateManager): Promise<string> {
	return (await stateManager.retrieve('kavitaAPI') as string | undefined) ?? DEFAULT_KAVITA_API
}

export async function getKavitaOPDS(stateManager: SourceStateManager): Promise<string> {
	return (await stateManager.retrieve('kavitaOPDS') as string | undefined) ?? DEFAULT_KAVITA_OPDS
}

export async function getOptions(stateManager: SourceStateManager): Promise<{ showOnDeck: boolean; showRecentlyAdded: boolean; }> {
	const showOnDeck = (await stateManager.retrieve('showOnDeck') as boolean) ?? DEFAULT_SHOW_ON_DECK
	const showRecentlyAdded = (await stateManager.retrieve('showRecentlyAdded') as boolean) ?? DEFAULT_SHOW_RECENTLY_ADDED
	
	return { showOnDeck, showRecentlyAdded }
}

export async function retrieveStateData(stateManager: SourceStateManager) {
	const serverURL = (await stateManager.retrieve('serverAddress') as string) ?? DEFAULT_KAVITA_SERVER_ADDRESS
	const serverAPIKey = (await stateManager.retrieve('serverAPIKey') as string) ?? DEFAULT_KAVITA_SERVER_API_KEY
	const showOnDeck = (await stateManager.retrieve('showOnDeck') as boolean) ?? DEFAULT_SHOW_ON_DECK
	const showRecentlyAdded = (await stateManager.retrieve('showRecentlyAdded') as boolean) ?? DEFAULT_SHOW_RECENTLY_ADDED

	return { serverURL, serverAPIKey, showOnDeck, showRecentlyAdded }
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function setStateData(stateManager: SourceStateManager, data: Record<string, any>) {
	await setKavitaServer(
		stateManager,
		data['serverAddress'] ?? DEFAULT_KAVITA_SERVER_ADDRESS,
		data['serverAPIKey'] ?? DEFAULT_KAVITA_SERVER_API_KEY
	)
	await setOptions(
		stateManager,
		data['showOnDeck'] ?? DEFAULT_SHOW_ON_DECK,
		data['showRecentlyAdded'] ?? DEFAULT_SHOW_RECENTLY_ADDED,
	)
}

async function setKavitaServer(stateManager: SourceStateManager, apiUri: string, apiKey: string) {
	await stateManager.keychain.store('serverAPIKey', apiKey)

	await stateManager.store('serverAddress', apiUri)
	await stateManager.store('kavitaAPI', apiUri + (apiUri.slice(-1) === '/' ? 'api' : '/api'))	
	await stateManager.store('kavitaOPDS', apiUri + (apiUri.slice(-1) === '/' ? 'api/opds/' : '/api/opds/') + apiKey)
}

async function setOptions(stateManager: SourceStateManager, showOnDeck: boolean, showRecentlyAdded: boolean) {
	await stateManager.store('showOnDeck', showOnDeck)
	await stateManager.store('showRecentlyAdded', showRecentlyAdded)
}