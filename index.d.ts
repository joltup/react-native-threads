declare module "react-native-threads" {
  export class Thread {
    constructor(jsPath: string);
    postMessage(message: string): void;
    terminate(): void;
    onmessage?: (e: { data: string }) => void;
  }

  interface Self {
    postMessage: (message: string) => void;
    onmessage?: (e: { data: string }) => void;
  }
  export const self: Self;
}
