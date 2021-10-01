const reactNativeIsInitialized = global.__fbBatchedBridge !== undefined;

if (!reactNativeIsInitialized) {
  /*
   * The minimum amount of setup and imports required to get a thread to run
   * These references are copied from react-native/index.js
   *
   * This is to avoid importing things like `FlatList` into a thread bundle.
   */
  require("react-native/Libraries/Core/setUpGlobals");
  const BatchedBridge = require("react-native/Libraries/BatchedBridge/BatchedBridge");

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

  BatchedBridge.registerLazyCallableModule("HMRClient", () => {
    return require("react-native/Libraries/Utilities/HMRClientProdShim");
  });
}
