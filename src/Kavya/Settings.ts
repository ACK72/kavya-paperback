import {
	DUINavigationButton,
	SourceStateManager,
} from '@paperback/types';
import {
	DEFAULT_VALUES,
	KavitaRequestInterceptor
} from './Common';

/* UI definition */
// NOTE: Submitted data won't be tested
export const serverSettingsMenu = (
	stateManager: SourceStateManager,
	interceptor: KavitaRequestInterceptor
): DUINavigationButton => {
	return App.createDUINavigationButton({
		id: "server_settings",
		label: "Server Settings",
		form: App.createDUIForm({
			sections: async () => [
				App.createDUISection({
					id: "information",
					header: undefined,
					isHidden: false,
					rows: async () => [
						App.createDUIMultilineLabel({
							label: "Demo Server",
							value: "Server URL: https://demo.kavitareader.com\nUsername: demouser\nPassword: Demouser64\n\nNote: Values are case-sensitive.",
							id: "description",
						}),
					],
				}),
				App.createDUISection({
					id: "serverSettings",
					header: "Server Settings",
					isHidden: false,
					rows: async () => retrieveStateData(stateManager).then((values) => [
						App.createDUIInputField({
							id: "kavitaAddress",
							label: "Server URL",
							value: App.createDUIBinding({
								async get() {
									return values.kavitaAddress;
								},
								async set(value) {
									values.kavitaAddress = value;
									await setStateData(stateManager, interceptor, values);
								}
							})
						}),
						App.createDUISecureInputField({
							id: 'kavitaAPIKey',
							label: 'API Key',
							value: App.createDUIBinding({
								async get() {
									return values.kavitaAPIKey
								},
								async set(newValue) {
									values.kavitaAPIKey = newValue
									await setStateData(stateManager, interceptor, values)
								}
							})
						}),
						App.createDUIInputField({
							id: 'pageSize',
							label: 'Page Size',
							value: App.createDUIBinding({
								async get() {
									return typeof values.pageSize === 'string' ? values.pageSize : values.pageSize.toString();
								},
								async set(value) {
									values.pageSize = value;
									await setStateData(stateManager, interceptor, values);
								}
							})
						})
					]),
				}),
				App.createDUISection({
					id: "sourceOptions",
					header: "Source Options",
					isHidden: false,
					footer: "",
					rows: async () => retrieveStateData(stateManager).then((values) => [
						App.createDUISwitch({
							id: 'showOnDeck',
							label: 'Show On Deck',value: App.createDUIBinding({
								async get() {
									return values.showOnDeck;
								},
								async set(value) {
									values.showOnDeck = value;
									await setStateData(stateManager, interceptor, values);
								}
							})
						}),
						App.createDUISwitch({
							id: 'showRecentlyUpdated',
							label: 'Show Recently Updated',
							value: App.createDUIBinding({
								async get() {
									return values.showRecentlyUpdated;
								},
								async set(value) {
									values.showRecentlyUpdated = value;
									await setStateData(stateManager, interceptor, values);
								}
							})
						}),
						App.createDUISwitch({
							id: 'showNewlyAdded',
							label: 'Show Newly Added',
							value: App.createDUIBinding({
								async get() {
									return values.showNewlyAdded;
								},
								async set(value) {
									values.showNewlyAdded = value;
									await setStateData(stateManager, interceptor, values);
								}
							})
						}),
						App.createDUISwitch({
							id: 'excludeBookTypeLibrary',
							label: 'Exclude Book & Novel Type Libraries',
							value: App.createDUIBinding({
								async get() {
									return values.excludeBookTypeLibrary;
								},
								async set(value) {
									values.excludeBookTypeLibrary = value;
									await setStateData(stateManager, interceptor, values);
								}
							})
						})
					]),
				}),
				App.createDUISection({
					id: "experimentalOptions",
					header: "Experimental Options",
					isHidden: false,
					footer: "",
					rows: async () => retrieveStateData(stateManager).then((values) => [
						App.createDUISwitch({
							id: 'enableRecursiveSearch',
							label: 'Enable Recursive Search',
							value: App.createDUIBinding({
								async get() {
									return values.enableRecursiveSearch;
								},
								async set(value) {
									values.enableRecursiveSearch = value;
									await setStateData(stateManager, interceptor, values);
								}
							})
						})
					]),
				}),
			],
		}),
	});
};

export async function retrieveStateData(stateManager: SourceStateManager) {
	const kavitaAddress = (await stateManager.retrieve('kavitaAddress') as string) ?? DEFAULT_VALUES.kavitaAddress;
	const kavitaAPIKey = (await stateManager.keychain.retrieve('kavitaAPIKey') as string) ?? DEFAULT_VALUES.kavitaAPIKey;
	const pageSize = (await stateManager.retrieve('pageSize') as number) ?? DEFAULT_VALUES.pageSize;

	const showOnDeck = (await stateManager.retrieve('showOnDeck') as boolean) ?? DEFAULT_VALUES.showOnDeck;
	const showRecentlyUpdated = (await stateManager.retrieve('showRecentlyUpdated') as boolean) ?? DEFAULT_VALUES.showRecentlyUpdated;
	const showNewlyAdded = (await stateManager.retrieve('showNewlyAdded') as boolean) ?? DEFAULT_VALUES.showNewlyAdded;
	const excludeBookTypeLibrary = (await stateManager.retrieve('excludeBookTypeLibrary') as boolean) ?? DEFAULT_VALUES.excludeBookTypeLibrary;

	const enableRecursiveSearch = (await stateManager.retrieve('enableRecursiveSearch') as boolean) ?? DEFAULT_VALUES.enableRecursiveSearch;

	return { kavitaAddress, kavitaAPIKey, pageSize, showOnDeck, showRecentlyUpdated, showNewlyAdded, excludeBookTypeLibrary, enableRecursiveSearch }
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function setStateData(stateManager: SourceStateManager, interceptor: KavitaRequestInterceptor, data: Record<string, any>) {
	const promises: Promise<void>[] = [];
	const prevStateData: any = await retrieveStateData(stateManager);

	let clear = false;
	for (const [key, value] of Object.entries(data)) {
		if (prevStateData[key] !== value) {
			switch (key) {
				case 'kavitaAddress':
					promises.push(stateManager.store(key, value));
					promises.push(stateManager.store('kavitaAPIUrl', value + (value.slice(-1) === '/' ? 'api' : '/api')));
					clear = true;
					break;
				case 'kavitaAPIKey':
					promises.push(stateManager.keychain.store(key, value));
					clear = true;
					break;
				case 'pageSize':
					const pageSize = typeof value === 'string' ? parseInt(value) === 0 ? DEFAULT_VALUES.pageSize : parseInt(value) : DEFAULT_VALUES.pageSize;
					promises.push(stateManager.store(key, pageSize));
					break;
				default:
					promises.push(stateManager.store(key, value));
			}
		}
	}
	
	await Promise.all(promises);
	if (clear) interceptor.clearAuthorizationString();
}