module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	rules: {
		camelcase: 0,
		'no-use-before-define': [
			2,
			{ classes: false, variables: true, functions: true }
		],
		'no-prototype-builtins': 0,
		'handle-callback-err': 0,
		'multiline-ternary': 0,
		indent: [2, 'tab'],
		'no-tabs': 0,
		quotes: [2, 'single'],
		'no-restricted-globals': 0,
		'no-var': 2,
		'@typescript-eslint/semi': 0,
		'array-callback-return': 1,
		'lines-between-class-members': 0,
		// 'no-unused-vars': 2
		'@typescript-eslint/no-unused-vars': [
			1,
			{
				args: 'after-used',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_'
			}
		]
	},
	overrides: [
		{
			files: ['*.d.ts'],
			rules: {
				'no-use-before-define': 0
			}
		}
	]
}
