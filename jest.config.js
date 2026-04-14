module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },

    testPathIgnorePatterns: [
        '/node_modules/',
        '/.next/'
    ],
};