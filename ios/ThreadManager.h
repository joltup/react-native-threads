#ifndef ThreadManager_h
#define ThreadManager_h

#import "ThreadSelfManager.h"
#import <React/RCTBridge.h>
#import <React/RCTBridge+Private.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTBundleURLProvider.h>

@interface ThreadManager : NSObject <RCTBridgeModule>
@end

#endif
