module.exports = {
  verbose: true,
  transform: {
    '^.+\\.(js|jsx|json)$': 'babel-jest',
  },
  globals: {
    NODE_ENV: 'test',
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'node', /* Load scrypt properly, for web3 */
  ],
  moduleDirectories: [
    'node_modules',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>$1',
  },
};
