import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'

// /** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	{
		plugins: {
			prettier: pluginPrettier,
		},
	},
	{
		ignores: ['node_modules', 'dist', 'webpack.config.js'],
	},
	pluginJs.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.commonjs,
				...globals.browser,
				...globals.es2021,
			},
		},
	},
	{
		files: ['**/*.js'],
		rules: {
			...configPrettier.rules,
			'prefer-const': 'error',
			'no-unused-vars': 'error',
		},
	},
]
