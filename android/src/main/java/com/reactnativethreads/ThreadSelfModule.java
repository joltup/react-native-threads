package com.reactnativethreads;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nullable;

@ReactModule(name = ThreadSelfModule.REACT_MODULE_NAME)
public class ThreadSelfModule extends ReactContextBaseJavaModule {
    public static final String REACT_MODULE_NAME = "ThreadSelfManager";

    public interface MessageListener {
        void onMessage(ThreadSelfModule threadSelfModule, String message);
        void onError(ThreadSelfModule threadSelfModule, String message);
    }

    private ReactApplicationContext mReactContext;
    private int mThreadId;
    private @Nullable MessageListener mMessageListener;

    public ThreadSelfModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    public void setThreadId(int threadId) {
        mThreadId = threadId;
    }

    public int getThreadId() {
        return mThreadId;
    }

    public void setMessageListener(MessageListener messageListener) {
        mMessageListener = messageListener;
    }

    public @Nullable MessageListener getMessageListener() {
        return mMessageListener;
    }

    @Override
    public String getName() {
        return REACT_MODULE_NAME;
    }

    @ReactMethod()
    public void postMessage(String message) {
        if (mMessageListener != null) {
            mMessageListener.onMessage(this, message);
        }
    }

    @ReactMethod()
    public void postError(String message) {
        if (mMessageListener != null) {
            mMessageListener.onError(this, message);
        }
    }

    public void sendMessage(String message) {
        mReactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("message", message);
    }

    public void onHostResume() {
        mReactContext.onHostResume(null);
    }

    public void onHostPause() {
        mReactContext.onHostPause();
    }

    public void terminate() {
        mReactContext.onHostPause();
        mReactContext.destroy();
        mReactContext = null;
    }
}
