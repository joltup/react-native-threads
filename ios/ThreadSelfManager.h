#ifndef ThreadSelfManager_h
#define ThreadSelfManager_h

#import <React/RCTBridge.h>
#import <React/RCTBridge+Private.h>
#import <React/RCTEventDispatcher.h>

@interface ThreadSelfManager : NSObject <RCTBridgeModule>
@property int threadId;
@property RCTBridge *parentBridge;
@end

#endif
