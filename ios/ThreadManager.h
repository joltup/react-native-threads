#import <React/RCTEventEmitter.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>

#import "ThreadSelfManager.h"

@interface ThreadManager : RCTEventEmitter <ThreadSelfManagerDelegate>
@end
