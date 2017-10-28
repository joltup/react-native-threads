# React Native Threads Simple Example

A simple example of using react-native-threads.

A single button sends a message to the worker thread, and the thread responds
with a message count that is displayed in the UI.

This example also shows how to use Reactotron for debugging.

## Running the example
I assume that you have Node.js, react-native-cli, and the necessary iOS/Android
dependencies installed.

To see debugging messages, [install Reactotron](https://github.com/infinitered/reactotron/blob/master/docs/installing.md)
and open it before running the app.

```shell
git clone https://github.com/Traviskn/react-native-threads.git

cd react-native-threads/examples/SimpleExample

npm install

react-native run-ios
# or
react-native run-android
```

To run in release mode first build the release thread bundles with the example's
npm scripts:

```shell
npm run build-thread-ios

npm run build-thread-android
```
