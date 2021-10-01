import "./ensure-react-native-is-initialized";
import NativeModules from "react-native/Libraries/BatchedBridge/NativeModules";
import NativeEventEmitter from "react-native/Libraries/EventEmitter/NativeEventEmitter";

const { ThreadSelfManager } = NativeModules;
const ThreadSelfManagerEvents = new NativeEventEmitter(ThreadSelfManager);

const self = {
  postMessage: (message) => {
    if (message != null) {
      ThreadSelfManager.postMessage(message);
    }
  },
  onmessage: null,
};

ThreadSelfManagerEvents.addListener("message", (message) => {
  if (typeof self.onmessage === "function") {
    self.onmessage({ data: message });
  }
});

export default self;
