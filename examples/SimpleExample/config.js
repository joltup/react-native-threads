import Reactotron from 'reactotron-react-native'

console.tron = { log: Function.prototype };

if (__DEV__) {
  Reactotron
    .configure()
    .useReactNative()
    .connect();

  console.tron = Reactotron;
}
