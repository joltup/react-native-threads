package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

@ReactModule(name = ThreadSelfModule.REACT_MODULE_NAME)
public class ThreadSelfModule extends ReactContextBaseJavaModule {
    public static final String REACT_MODULE_NAME = "ThreadSelfManager";

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
        return REACT_MODULE_NAME;
    }

    @ReactMethod
    public void postMessage(String data) {
        if (parentContext == null) { return; }

        parentContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("Thread" + String.valueOf(threadId), data);
    }
}
