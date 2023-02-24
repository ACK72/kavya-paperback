import {
	NavigationButton,
	SourceStateManager,
} from "paperback-extensions-common";
import {
	DEFAULT_VALUES,
	KavitaRequestInterceptor
} from "./Common";

/* UI definition */
// NOTE: Submitted data won't be tested
export const serverSettingsMenu = (
	stateManager: SourceStateManager,
	interceptor: KavitaRequestInterceptor
): NavigationButton => {
	return createNavigationButton({
		id: "server_settings",
		value: "",
		label: "Server Settings",
		form: createForm({
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			onSubmit: async (values: any) => setStateData(stateManager, interceptor, values),
			validate: async () => true,
			sections: async () => [
				createSection({
					id: "information",
					header: undefined,
					rows: async () => [
						createMultilineLabel({
							label: "Demo Server",
							value: "Server URL: https://demo.kavitareader.com\nUsername: demouser\nPassword: Demouser64\n\nNote: Values are case-sensitive.",
							id: "description",
						}),
					],
				}),
				createSection({
					id: "serverSettings",
					header: "Server Settings",
					rows: async () => retrieveStateData(stateManager).then((values) => [
						createInputField({
							id: "kavitaAddress",
							label: "Server URL",
							placeholder: "http://127.0.0.1:8080",
							value: values.kavitaURL,
							maskInput: false,
						}),
						// TS-Ignoring because this isnt documented yet
						// Fallback to default input field if the app version doesnt support
						// SecureInputField
						// @ts-ignore
						(typeof createSecureInputField === 'undefined' ? createInputField : createSecureInputField)({
							id: "kavitaAPIKey",
							label: "API Key",
							placeholder: "Kavita API Key",
							value: values.kavitaAPIKey
						}),
					]),
				}),
				createSection({
					id: "sourceOptions",
					header: "Source Options",
					footer: "",
					rows: async () => retrieveStateData(stateManager).then((values) => [
						createSwitch({
							id: 'showOnDeck',
							label: 'Show On Deck',
							value: values.showOnDeck,
						}),
						createSwitch({
							id: 'showRecentlyUpdated',
							label: 'Show Recently Updated',
							value: values.showRecentlyUpdated,
						}),
						createSwitch({
							id: 'showNewlyAdded',
							label: 'Show Newly Added',
							value: values.showNewlyAdded,
						}),
						createSwitch({
							id: 'excludeBookTypeLibrary',
							label: 'Exclude Book Type Library',
							value: values.excludeBookTypeLibrary,
						})
					]),
				}),
				createSection({
					id: "searchOptions",
					header: "Search Options",
					footer: "",
					rows: async () => retrieveStateData(stateManager).then((values) => [
						createSwitch({
							id: 'enableRecursiveSearch',
							label: 'Enable Recursive Search',
							value: values.enableRecursiveSearch,
						})
					]),
				}),
				createSection({
					id: "miscellaneous",
					header: "MISCELLANEOUS",
					footer: "",
					rows: async () => retrieveStateData(stateManager).then((values) => [
						createSwitch({
							id: 'displayReadInstedOfUnread',
							label: 'Display Status With Read Instead Of Unread',
							value: values.displayReadInstedOfUnread,
						})
					]),
				}),
			],
		}),
	});
};

export async function retrieveStateData(stateManager: SourceStateManager) {
	const kavitaURL = (await stateManager.retrieve('kavitaAddress') as string) ?? DEFAULT_VALUES.kavitaAddress;
	const kavitaAPIKey = (await stateManager.keychain.retrieve('kavitaAPIKey') as string) ?? DEFAULT_VALUES.kavitaAPIKey;

	const showOnDeck = (await stateManager.retrieve('showOnDeck') as boolean) ?? DEFAULT_VALUES.showOnDeck;
	const showRecentlyUpdated = (await stateManager.retrieve('showRecentlyUpdated') as boolean) ?? DEFAULT_VALUES.showRecentlyUpdated;
	const showNewlyAdded = (await stateManager.retrieve('showNewlyAdded') as boolean) ?? DEFAULT_VALUES.showNewlyAdded;
	const excludeBookTypeLibrary = (await stateManager.retrieve('excludeBookTypeLibrary') as boolean) ?? DEFAULT_VALUES.excludeBookTypeLibrary;
	const enableRecursiveSearch = (await stateManager.retrieve('enableRecursiveSearch') as boolean) ?? DEFAULT_VALUES.enableRecursiveSearch;
	const displayReadInstedOfUnread = (await stateManager.retrieve('displayReadInstedOfUnread') as boolean) ?? DEFAULT_VALUES.displayReadInstedOfUnread;

	return { kavitaURL, kavitaAPIKey, showOnDeck, showRecentlyUpdated, showNewlyAdded, excludeBookTypeLibrary, enableRecursiveSearch, displayReadInstedOfUnread }
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function setStateData(stateManager: SourceStateManager, interceptor: KavitaRequestInterceptor, data: Record<string, any>) {
	await setKavitaServer(
		stateManager,
		data['kavitaAddress'] ?? DEFAULT_VALUES.kavitaAddress,
		data['kavitaAPIKey'] ?? DEFAULT_VALUES.kavitaAPIKey,
	);
	await interceptor.updateAuthorization();
	await setOptions(
		stateManager,
		data['showOnDeck'] ?? DEFAULT_VALUES.showOnDeck,
		data['showRecentlyUpdated'] ?? DEFAULT_VALUES.showRecentlyUpdated,
		data['showNewlyAdded'] ?? DEFAULT_VALUES.showNewlyAdded,
		data['excludeBookTypeLibrary'] ?? DEFAULT_VALUES.excludeBookTypeLibrary,
		data['enableRecursiveSearch'] ?? DEFAULT_VALUES.enableRecursiveSearch,
		data['displayReadInstedOfUnread'] ?? DEFAULT_VALUES.displayReadInstedOfUnread
	);
}

async function setKavitaServer(stateManager: SourceStateManager, apiUri: string, apiKey: string) {
	await stateManager.store('kavitaAddress', apiUri);
	await stateManager.store('kavitaAPIUrl', apiUri + (apiUri.slice(-1) === '/' ? 'api' : '/api'));
	await stateManager.keychain.store('kavitaAPIKey', apiKey);
}

async function setOptions(
	stateManager: SourceStateManager,
	showOnDeck: boolean,
	showRecentlyUpdated: boolean,
	showNewlyAdded: boolean,
	excludeBookTypeLibrary: boolean,
	enableRecursiveSearch: boolean,
	displayReadInstedOfUnread: boolean
) {
	await stateManager.store('showOnDeck', showOnDeck);
	await stateManager.store('showRecentlyUpdated', showRecentlyUpdated);
	await stateManager.store('showNewlyAdded', showNewlyAdded);
	await stateManager.store('excludeBookTypeLibrary', excludeBookTypeLibrary);
	await stateManager.store('enableRecursiveSearch', enableRecursiveSearch);
	await stateManager.store('displayReadInstedOfUnread', displayReadInstedOfUnread);
}