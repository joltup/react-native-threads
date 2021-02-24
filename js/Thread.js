import { NativeModules, DeviceEventEmitter } from "./react-native-stripped";

const { ThreadManager } = NativeModules;

const eventName = (id) => `Thread${id}`;

export default class Thread {
  constructor(jsPath) {
    if (typeof jsPath !== "string" || !jsPath.endsWith(".js")) {
      throw new Error("Invalid path for thread. Only js files are supported");
    }

    this._terminated = false;

    this._messageHandler = (message) => {
      if (
        !this._terminated &&
        message != null &&
        typeof this.onmessage === "function"
      ) {
        this.onmessage(message);
      }
    };

    this.id = ThreadManager.startThread(jsPath.slice(0, -".js".length))
      .then((id) => {
        DeviceEventEmitter.addListener(eventName(id), this._messageHandler);

        return id;
      })
      .catch(() => {
        console.warn(`Failed to start thread (${jsPath})`);
      });
  }

  postMessage(message) {
    this.id.then((id) => {
      if (!this._terminated) {
        ThreadManager.postThreadMessage(id, message);
      }
    });
  }

  terminate() {
    if (!this._terminated) {
      // Ensure termination is synchronous
      this._terminated = true;

      this.id.then((id) => {
        DeviceEventEmitter.removeListener(eventName(id), this._messageHandler);

        ThreadManager.stopThread(id);
      });
    }
  }
}
