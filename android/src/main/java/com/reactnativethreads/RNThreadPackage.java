package com.reactnativethreads;

import com.facebook.react.ReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class RNThreadPackage implements ReactPackage {

    private ReactNativeHost mReactNativeHost;
    private ReactPackage mAdditionalThreadPackages[];

    public RNThreadPackage(ReactNativeHost reactNativeHost, ReactPackage... additionalThreadPackages) {
        mReactNativeHost = reactNativeHost;
        mAdditionalThreadPackages = additionalThreadPackages;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(
                new RNThreadModule(reactContext, mReactNativeHost, mAdditionalThreadPackages)
        );
    }
}