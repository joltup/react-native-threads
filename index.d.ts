declare module "react-native-threads" {
  export class Thread {
    constructor(jsPath: string);
    postMessage(message: string): void;
    terminate(): void;
    onmessage: null | ((message: string) => void);
  }

  interface Self {
    onmessage: null | ((message: string) => void);
    postMessage: (message: string) => void;
  }
  export const self: Self;
}
