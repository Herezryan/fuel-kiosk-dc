module.exports = {
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest', // Use Babel for .js, .jsx, .ts, .tsx files
    },
    testEnvironment: 'jest-environment-jsdom', // Explicitly specify jsdom
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS modules
    },
  };