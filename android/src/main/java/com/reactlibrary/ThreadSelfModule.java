package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class ThreadSelfModule extends ReactContextBaseJavaModule {

    private int threadId;
    private ReactApplicationContext parentContext;

    public ThreadSelfModule(ReactApplicationContext context) {
        super(context);
    }

    public void initialize(int threadId, ReactApplicationContext parentContext) {
        this.parentContext = parentContext;
        this.threadId = threadId;
    }

    @Override
    public String getName() {
        return "ThreadSelfManager";
    }

    @ReactMethod
    public void postMessage(String data) {
        if (parentContext == null) { return; }

        parentContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("Thread" + String.valueOf(threadId), data);
    }
}
