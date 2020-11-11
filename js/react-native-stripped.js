/*
 * The minimum amount of setup and imports required to get a thread to run
 * These references are copied from react-native/index.js
 */
import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';
import NativeModules from 'react-native/Libraries/BatchedBridge/NativeModules';
import DeviceEventEmitter from 'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter';

/*
 * See `Libraries/Core/setUpBatchedBridge.js`
 * There is no impact for calling this function twice with the same arguments
 * So it is still safe for the user to `import 'react-native'`
 */
BatchedBridge.registerCallableModule('RCTDeviceEventEmitter', DeviceEventEmitter);

export {
  NativeModules,
  DeviceEventEmitter,
};
