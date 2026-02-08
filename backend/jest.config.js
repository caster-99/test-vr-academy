module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'server.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  verbose: true
};
