
// jest.config.js
module.exports = {
  transform: {'^.+\\.js$': 'babel-jest'},
  transformIgnorePatterns: ['/node_modules/'],
  setupFiles: ['./jest.setup.js'] // Add setup file for global mocks
};

// jest.setup.js
// Mock AudioContext globally to prevent ReferenceError
global.AudioContext = class MockAudioContext {
  constructor() {}
  createMediaElementSource() {}
  createAnalyser() {}
  connect() {};
};

