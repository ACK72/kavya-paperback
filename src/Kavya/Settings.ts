import {
	NavigationButton,
	SourceStateManager,
} from "paperback-extensions-common";
import {
	retrieveStateData,
	setStateData,
} from "./Common";
import { KavitaRequestInterceptor } from "./Kavya";

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
						})
					]),
				}),
			],
		}),
	});
};