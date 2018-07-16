# react-native-threads

[![npm version](https://img.shields.io/npm/v/react-native-threads.svg?style=flat-square)](https://www.npmjs.com/package/react-native-threads)
[![downloads](https://img.shields.io/npm/dm/react-native-threads.svg?style=flat-square)](https://www.npmjs.com/package/react-native-threads)

Spawn new react native JavaScript processes for CPU intensive work outside of your
main UI JavaScript process.

Despite this package's name, this isn't real 'threading', but rather multi-processing.
The main tradeoff of using this library is memory usage, as creating new JS processes
can have significant overhead.  Be sure to benchmark your app's memory usage and other
resources before using this library! Alternative solutions include using `runAfterInteractions`
or the [Interaction Manager](https://facebook.github.io/react-native/docs/interactionmanager.html),
and I recommend you investigate those thoroughly before using this library.

## Getting started

`$ npm install react-native-threads --save`

### Mostly automatic installation

`$ react-native link react-native-threads`

### Android

For android you will need to make a slight modification to your `MainApplication.java`
file.  In the `getPackages` method pass in `mReactNativeHost` to the `RNThreadPackage`
constructor:

```java
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNThreadPackage(mReactNativeHost)  // <-- Here
      );
    }
```

Also note that only the official react native modules are available from your
threads (vibration, fetch, etc...). To include additional native modules in your
threads, pass them into the `RNThreadPackage` constructor after the `mReactNativeHost`
like this:
`new RNThreadPackage(mReactNativeHost, new ExampleNativePackage(), new SQLitePackage())`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-threads` and add `RNThread.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNThread.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import com.reactlibrary.RNThreadPackage;` to the imports at the top of the file
  - Add `new RNThreadPackage(mReactNativeHost)` to the list returned by the `getPackages()` method
  - Also note that only the official react native modules are available from your
    threads (vibration, fetch, etc...). To include additional native modules in your
    threads, pass them into the `RNThreadPackage` constructor after the `mReactNativeHost`
    like this:
    `new RNThreadPackage(mReactNativeHost, new ExampleNativePackage(), new SQLitePackage())`

2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-threads'
  	project(':react-native-threads').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-threads/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-threads')
  	```

#### Windows
Windows support is not yet implemented, but PRs are welcome if you want to give it a shot!

[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNThread.sln` in `node_modules/react-native-threads/windows/RNThread.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Thread.RNThread;` to the usings at the top of the file
  - Add `new RNThreadPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage

In your application code (react components, etc.):

```javascript
import { Thread } from 'react-native-threads';

// start a new react native JS process
const thread = new Thread('path/to/thread.js');

// send a message, strings only
thread.postMessage('hello');

// listen for messages
thread.onmessage = (message) => console.log(message);

// stop the JS process
thread.terminate();
```

In your thread code (dedicated file such as `thread.js`):
```javascript
import { self } from 'react-native-threads';

// listen for messages
self.onmessage = (message) => {
}

// send a message, strings only
self.postMessage('hello');
```

Check out the examples directory in this repo for demos of using `react-native-threads`
in a functioning app!

### Thread Lifecycle

- Threads are paused when the app enters in the background
- Threads are resumed once the app is running in the foreground
- During development, when you reload the main JS bundle (shake device -> `Reload`) the threads are killed

### Debugging

Instantiating Threads creates multiple react native JS processes and can make debugging
remotely behave unpredictably. I recommend using a third party debugging tool like
[Reactotron](https://github.com/infinitered/reactotron) to aid with this. Each process,
including your main application as well as your thread code can connect to Reactotron
and log debugging messages.

### Building for Release

You will need to manually bundle your thread files for use in a production release
of your app.  This documentation assumes you have a single thread file called
`index.thread.js` in your project root.  If your file is named differently or in
a different location, you can update the documented commands accordingly.

**Note**: If your single thread file is in a different location, the folder structure needs to 
be replicated under `./ios` and `./android/app/src/main/assets/threads`.

```
./App/Workers/worker.thread.js => ./ios/App/Workers/worker.thread.jsbundle
./App/Workers/worker.thread.js => ./android/app/src/main/assets/threads/App/Workers/worker.thread.jsbundle
```

For iOS you can use the following command:

`node node_modules/react-native/local-cli/cli.js bundle --dev false --assets-dest ./ios --entry-file index.thread.js --platform ios --bundle-output ./ios/index.thread.jsbundle`

Once you have generated the bundle file in your ios folder, you will also need to add
the bundle file to you project in Xcode. In Xcode's file explorer you should see
a folder with the same name as your app, containing a `main.jsbundle` file as well
as an `appDelegate.m` file. Right click on that folder and select the 'Add Files to <Your App Name>'
option, which will open up finder and allow you to select your `ios/index.thread.jsbundle`
file. You will only need to do this once, and the file will be included in all future
builds.

For Android create this direactory
`mkdir ./android/app/src/main/assets/threads`

And then you can use the following command:

`node node_modules/react-native/local-cli/cli.js bundle --dev false --assets-dest ./android/app/src/main/res/ --entry-file index.thread.js --platform android --bundle-output ./android/app/src/main/assets/threads/index.thread.bundle`

For convenience I recommend adding these thread building commands as npm scripts
to your project.

## Example App
Included in this repository is a simple example application demonstrating basic
usage of react-native-threads. Look at `examples/SimpleExample/README.md` for
instructions on running it.  Here's how the app looks with the Reactotron debugger:

![SimpleExample Screen Capture](https://raw.githubusercontent.com/traviskn/react-native-threads/master/media/simplethreadexample.gif)

## Acknowledgements

This library was heavily inspired by two other packages both under the name of
`react-native-workers`.

The first was https://github.com/fabriciovergal/react-native-workers ,
and the second was https://github.com/devfd/react-native-workers

I ended up going with devfd's implementation strategy as it seemed more flexible
and feature-rich to me.  At the time of this writing neither library was functioning
on the latest version of react native, and neither seemed to be very actively maintained.

This library would not exist without those two reference implementations to guide me!
