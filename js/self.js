import { NativeModules, DeviceEventEmitter } from "./react-native-stripped";

const { ThreadSelfManager } = NativeModules;

const self = {
  onmessage: null,

  postMessage: (message) => {
    if (message != null) {
      ThreadSelfManager.postMessage(message);
    }
  },
};

DeviceEventEmitter.addListener("ThreadMessage", (message) => {
  if (message != null && typeof self.onmessage === "function") {
    self.onmessage(message);
  }
});

export default self;
