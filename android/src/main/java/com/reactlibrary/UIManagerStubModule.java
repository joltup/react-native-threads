package com.reactlibrary;

import com.facebook.react.bridge.OnBatchCompleteListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class UIManagerStubModule extends ReactContextBaseJavaModule implements OnBatchCompleteListener {

    public UIManagerStubModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "UIManager";
    }

    @Override
    public void onBatchComplete() {

    }
    
    @ReactMethod
    public void dummy() {
    }
}
