#import "ThreadManager.h"
#include <stdlib.h>

@implementation ThreadManager

@synthesize bridge = _bridge;

NSMutableDictionary *threads;

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(startThread,
                 name: (NSString *)name
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  if (threads == nil) {
    threads = [[NSMutableDictionary alloc] init];
  }

  int threadId = abs(arc4random());

  NSURL *threadURL = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:name fallbackResource:name];
  NSLog(@"starting Thread %@", [threadURL absoluteString]);


   RCTBridge *threadBridge = [[RCTBridge alloc] initWithBundleURL:threadURL
                                            moduleProvider:nil
                                             launchOptions:nil];

  ThreadSelfManager *threadSelf = [threadBridge moduleForName:@"ThreadSelfManager"];
  [threadSelf setThreadId:threadId];
  [threadSelf setParentBridge:self.bridge];


  [threads setObject:threadBridge forKey:[NSNumber numberWithInt:threadId]];
  resolve([NSNumber numberWithInt:threadId]);
}

RCT_EXPORT_METHOD(stopThread:(int)threadId)
{
  if (threads == nil) {
    NSLog(@"Empty list of threads. abort stopping thread with id %i", threadId);
    return;
  }

  RCTBridge *threadBridge = threads[[NSNumber numberWithInt:threadId]];
  if (threadBridge == nil) {
    NSLog(@"Thread is NIl. abort stopping thread with id %i", threadId);
    return;
  }

  [threadBridge invalidate];
  [threads removeObjectForKey:[NSNumber numberWithInt:threadId]];
}

RCT_EXPORT_METHOD(postThreadMessage: (int)threadId message:(NSString *)message)
{
  if (threads == nil) {
    NSLog(@"Empty list of threads. abort posting to thread with id %i", threadId);
    return;
  }

  RCTBridge *threadBridge = threads[[NSNumber numberWithInt:threadId]];
  if (threadBridge == nil) {
    NSLog(@"Thread is NIl. abort posting to thread with id %i", threadId);
    return;
  }

  [threadBridge.eventDispatcher sendAppEventWithName:@"ThreadMessage"
                                               body:message];
}

- (void)invalidate {
  if (threads == nil) {
    return;
  }

  for (NSNumber *threadId in threads) {
    RCTBridge *threadBridge = threads[threadId];
    [threadBridge invalidate];
  }

  [threads removeAllObjects];
  threads = nil;
}

@end
