/*
 * The minimum amount of setup and imports required to get a thread to run
 * These references are copied from react-native/index.js
 */
import 'react-native/Libraries/Core/setUpGlobals'
import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';
import NativeModules from 'react-native/Libraries/BatchedBridge/NativeModules';
import DeviceEventEmitter from 'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter';

/*
 * See `Libraries/Core/setUpBatchedBridge.js`
 * There is no impact for calling this function twice with the same arguments
 * So it is still safe for the user to `import 'react-native'`
 */
BatchedBridge.registerLazyCallableModule(
  'RCTLog',
  () => require('react-native/Libraries/Utilities/RCTLog')
);
BatchedBridge.registerCallableModule('RCTDeviceEventEmitter', DeviceEventEmitter);
BatchedBridge.registerLazyCallableModule(
  'RCTNativeAppEventEmitter',
  () => require('react-native/Libraries/EventEmitter/RCTNativeAppEventEmitter')
);
/*
 * This module differs from what will happen in the default setup
 * (At least in development)
 * But as hot module reloading does not work in threads, this shouldn't matter
 */
BatchedBridge.registerLazyCallableModule(
  'HMRClient',
  () => require('react-native/Libraries/Utilities/HMRClientProdShim')
);

export {
  NativeModules,
  DeviceEventEmitter,
};
