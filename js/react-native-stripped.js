/*
 * The minimum amount of imports/exports required to get a thread to run
 * These references are copied from react-native/index.js
 */
import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge';
import NativeModules from 'react-native/Libraries/BatchedBridge/NativeModules';
import DeviceEventEmitter from 'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter';

// This is safe to call multiple times with the same arguments
// Should the user `import 'react-native'`
BatchedBridge.registerCallableModule('RCTDeviceEventEmitter', DeviceEventEmitter);

export {
  NativeModules,
  DeviceEventEmitter,
};
