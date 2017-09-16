import { self } from 'react-native-thread';

/*
 * Web Worker
 * you have access to all RN native modules (timeout, fetch, AsyncStorage, Vibration ...)
 */

// receive messages from main thread
self.onmessage = (message) => {
  console.log('worker received message', message);
}

function ping() {
  // send messages to main thread
  console.log('SENDING PING FROM WORKER TO MAIN');
  self.postMessage("Ping");
  setTimeout(ping, 5000);
}


setTimeout(ping, 5000);
