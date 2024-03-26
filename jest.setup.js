
// Mock AudioContext globally to prevent 'createBuffer is not a function' errors

global.AudioContext = class MockAudioContext {
  constructor() {}
  createBuffer(channels, length, sampleRate) {
    return {
      getChannelData: (index) => new Float32Array(length),
      numberOfChannels: channels,
      length,
      sampleRate,
    };
  }
  createBufferSource() {
    return {
      connect: jest.fn(),
      start: jest.fn(),
    };
  }
  createMediaElementSource() {}
  createAnalyser() {}
  connect() {}
  destination = {};
};
