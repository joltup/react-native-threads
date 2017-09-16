#ifndef WorkerSelfManager_h
#define WorkerSelfManager_h

#import <React/RCTBridge.h>
#import <React/RCTBridge+Private.h>
#import <React/RCTEventDispatcher.h>

@interface WorkerSelfManager : NSObject <RCTBridgeModule>
@property int workerId;
@property RCTBridge *parentBridge;
@end

#endif
