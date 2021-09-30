import { NativeModules, NativeEventEmitter } from "react-native";

const { ThreadManager } = NativeModules;
const ThreadEvents = new NativeEventEmitter(ThreadManager);

let currentId = 0;

export default class Thread {
  constructor(jsPath) {
    if (typeof jsPath !== "string" || !jsPath.endsWith(".js")) {
      throw new Error("Invalid path for thread. Only js files are supported");
    }

    this.id = currentId++;
    this.terminated = false;

    this.listener = ThreadEvents.addListener("message", ({ id, message }) => {
      if (
        !this.terminated &&
        id === this.id &&
        message != null &&
        typeof this.onmessage === "function"
      ) {
        this.onmessage(message);
      }
    });

    const name = jsPath.slice(0, -".js".length);
    ThreadManager.startThread(this.id, name);
  }

  postMessage(message) {
    if (this.terminated) {
      if (__DEV__) {
        console.warn("Attempted to call postMessage on terminated worker");
      }
      return;
    }

    ThreadManager.postThreadMessage(this.id, message);
  }

  terminate() {
    if (this.terminated) {
      if (__DEV__) {
        console.warn("Attempted to call terminate on terminated worker");
      }
      return;
    }

    this.terminated = true;
    this.listener.remove();
    ThreadManager.stopThread(this.id);
  }
}
