import {
  NativeModules,
  DeviceEventEmitter,
} from './react-native-stripped';

const { ThreadSelfManager } = NativeModules;

const self = {
  onmessage: null,

  postMessage: (message) => {
    if (!message) { return; }
    ThreadSelfManager.postMessage(message);
  }
};

DeviceEventEmitter.addListener('ThreadMessage', (message) => {
  !!message && self.onmessage && self.onmessage(message);
});

export default self;
