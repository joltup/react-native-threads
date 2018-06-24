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

For running android in release mode, you will need to generate a signing key.
Follow these instructions to generate a key: https://facebook.github.io/react-native/docs/signed-apk-android.html#generating-a-signing-key

When you edit your `~/.gradle/gradle.properties` to put in the name of your
release keystore file, alias, and passwords, use the following format, with the
names of your keystore, alias, and actual passwords instead:

```
SIMPLE_EXAMPLE_RELEASE_STORE_FILE=your-release-key.keystore
SIMPLE_EXAMPLE_RELEASE_KEY_ALIAS=your-key-alias
SIMPLE_EXAMPLE_RELEASE_STORE_PASSWORD=*****
SIMPLE_EXAMPLE_RELEASE_KEY_PASSWORD=*****
```

This android project will be looking for the `SIMPLE_EXAMPLE_` prefixed variables
specifically.
