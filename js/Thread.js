import {
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';

const { ThreadManager } = NativeModules;

export default class Thread {
  constructor(jsPath) {
    if (!jsPath || !jsPath.endsWith('.js')) {
      throw new Error('Invalid path for thread. Only js files are supported');
    }

    this.id = 9999;
    ThreadManager.startThread(jsPath.replace(".js", ""))
    DeviceEventEmitter.addListener(`Thread${this.id}`, (message) => {
      !!message && this.onmessage && this.onmessage(message);
    });
  }

  postMessage(message) {
    ThreadManager.postThreadMessage(this.id, message);
  }

  terminate() {
    ThreadManager.stopThread(this.id);
  }
}
