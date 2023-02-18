module.exports = {
	'env': {
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'modules-newline',
		'@typescript-eslint'
	],
	'rules': {
		"unicorn/filename-case": ["ignore", { "case": "kebabCase" }],
		'@typescript-eslint/indent': [
			'error',
			4
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'prefer-arrow-callback': 'error',
		'modules-newline/import-declaration-newline': 'error',
		'modules-newline/export-declaration-newline': 'error',
		// These checks were disabled since there are `metadata: any` declarations in the codebase
		// due to how metadata is handled in the Paperback app.
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off'
	}
}