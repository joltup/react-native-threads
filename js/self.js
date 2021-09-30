/*
 * The minimum amount of setup and imports required to get a thread to run
 * These references are copied from react-native/index.js
 */
import "react-native/Libraries/Core/setUpGlobals";
import BatchedBridge from "react-native/Libraries/BatchedBridge/BatchedBridge";
import NativeModules from "react-native/Libraries/BatchedBridge/NativeModules";
import NativeEventEmitter from "react-native/Libraries/EventEmitter/NativeEventEmitter";

/*
 * See `Libraries/Core/setUpBatchedBridge.js`
 * There is no impact for calling this function twice with the same arguments
 * So it is still safe for the user to `import 'react-native'`
 */
BatchedBridge.registerLazyCallableModule("RCTLog", () => {
  return require("react-native/Libraries/Utilities/RCTLog");
});
BatchedBridge.registerLazyCallableModule("RCTDeviceEventEmitter", () => {
  return require("react-native/Libraries/EventEmitter/RCTDeviceEventEmitter")
    .default;
});
BatchedBridge.registerLazyCallableModule("RCTNativeAppEventEmitter", () => {
  return require("react-native/Libraries/EventEmitter/RCTNativeAppEventEmitter");
});
/*
 * This module differs from what will happen in the default setup
 * (At least in development)
 * But as hot module reloading does not work in threads, this shouldn't matter
 */
BatchedBridge.registerLazyCallableModule("HMRClient", () => {
  return require("react-native/Libraries/Utilities/HMRClientProdShim");
});

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
