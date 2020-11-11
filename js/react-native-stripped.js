/*
 * The minimum amount of imports/exports required to get a thread to run
 * These references are copied from react-native/index.js
 */
import NativeModules from 'react-native/Libraries/BatchedBridge/NativeModules';
import DeviceEventEmitter from 'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter';

export {
  NativeModules,
  DeviceEventEmitter,
};
