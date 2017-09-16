#ifndef WorkerManager_h
#define WorkerManager_h

#import "WorkerSelfManager.h"
#import <React/RCTBridge.h>
#import <React/RCTBridge+Private.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTBundleURLProvider.h>

@interface WorkerManager : NSObject <RCTBridgeModule>
@end

#endif
