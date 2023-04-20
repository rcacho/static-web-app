const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
	roots: ['<rootDir>'],
	testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
	testTimeout: 45000,
	transform: {
	  '^.+\\.jsx?$': 'babel-jest',
	  '^.+\\.(ts|tsx)$': 'ts-jest'
	},
	moduleNameMapper: {
		"@/(.*)": "<rootDir>/src/$1"
	},
	setupFiles: ["<rootDir>/__test__/setup-tests.ts"]
}
      