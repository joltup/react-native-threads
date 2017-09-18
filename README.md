# react-native-threads

Spawn new react native JavaScript processes for CPU intensive work outside of your
main UI JavaScript process.

Despite this package's name, this isn't real 'threading', but rather multi-processing.
The main tradeoff of using this library is memory usage, as creating new JS processes
can have significant overhead.  Be sure to benchmark your app's memory usage and other
resources before using this library! Alternative solutions include using `runAfterInteractions`
or the [Interaction Manager](https://facebook.github.io/react-native/docs/interactionmanager.html),
and I recommend you investigate those thoroughly before using this library.

## Getting started

`$ npm install react-native-thread --save`

### Mostly automatic installation

`$ react-native link react-native-thread`

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
2. Go to `node_modules` ➜ `react-native-thread` and add `RNThread.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNThread.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNThreadPackage;` to the imports at the top of the file
  - Add `new RNThreadPackage(mReactNativeHost)` to the list returned by the `getPackages()` method
  - Also note that only the official react native modules are available from your
    threads (vibration, fetch, etc...). To include additional native modules in your
    threads, pass them into the `RNThreadPackage` constructor after the `mReactNativeHost`
    like this:
    `new RNThreadPackage(mReactNativeHost, new ExampleNativePackage(), new SQLitePackage())`

2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-thread'
  	project(':react-native-thread').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-thread/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-thread')
  	```

#### Windows
Windows support is not yet implemented, but PRs are welcome if you want to give it a shot!

[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNThread.sln` in `node_modules/react-native-thread/windows/RNThread.sln` folder to their solution, reference from their app.
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
thread.onMessage = (message) => console.log(message);

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

Check out the examples directory in this repo for demos of using `react-native-thread`
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
