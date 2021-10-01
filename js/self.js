import "./ensure-react-native-is-initialized";
import NativeModules from "react-native/Libraries/BatchedBridge/NativeModules";
import NativeEventEmitter from "react-native/Libraries/EventEmitter/NativeEventEmitter";

const { ThreadSelfManager } = NativeModules;
const ThreadSelfManagerEvents = new NativeEventEmitter(ThreadSelfManager);

const self = {
  onmessage: null,

  postMessage: (message) => {
    if (message != null) {
      ThreadSelfManager.postMessage(message);
    }
  },
};

ThreadSelfManagerEvents.addListener("message", (message) => {
  if (message != null && typeof self.onmessage === "function") {
    self.onmessage(message);
  }
});

export default self;
