package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Random;

public class JSThread {
    private int id;

    private String jsSlugname;
    private ReactApplicationContext reactContext;

    public JSThread(String jsSlugname) {
        this.id = Math.abs(new Random().nextInt());
        this.jsSlugname = jsSlugname;
    }

    public int getThreadId() {
        return this.id;
    }

    public String getName() {
        return jsSlugname;
    }

    public void runFromContext(ReactApplicationContext context, ReactContextBuilder reactContextBuilder) throws Exception {
        if (reactContext != null) {
            return;
        }

        reactContext = reactContextBuilder.build();

        ThreadSelfModule threadSelfModule = reactContext.getNativeModule(ThreadSelfModule.class);
        threadSelfModule.initialize(id, context);
    }

    public void postMessage(String message) {
        if (reactContext == null) {
            return;
        }

        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("ThreadMessage", message);
    }

    public void onHostResume() {
        if (reactContext == null) {
            return;
        }

        reactContext.onHostResume(null);
    }

    public void onHostPause() {
        if (reactContext == null) {
            return;
        }

        reactContext.onHostPause();
    }

    public void terminate() {
        if (reactContext == null) {
            return;
        }

        reactContext.onHostPause();
        reactContext.destroy();
        reactContext = null;
    }
}
