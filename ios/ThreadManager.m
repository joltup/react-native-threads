#import "ThreadManager.h"
#include <stdlib.h>

@implementation ThreadManager

RCT_EXPORT_MODULE();

NSMutableDictionary *threads;

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"message"];
}

- (instancetype)init
{
  if (self = [super init]) {
    threads = [[NSMutableDictionary alloc] init];
  }
  return self;
}

RCT_EXPORT_METHOD(startThread:(nonnull NSNumber *)threadId
                  name:(NSString *)name)
{
  NSURL *threadURL = [RCTBundleURLProvider.sharedSettings jsBundleURLForBundleRoot:name
                                                                  fallbackResource:name];
  NSLog(@"starting Thread %@", [threadURL absoluteString]);

  RCTBridge *threadBridge = [[RCTBridge alloc] initWithBundleURL:threadURL
                                                  moduleProvider:nil
                                                   launchOptions:nil];

  ThreadSelfManager *threadSelf = [threadBridge moduleForClass:ThreadSelfManager.class];
  threadSelf.threadId = threadId;
  threadSelf.delegate = self;

  threads[threadId] = threadBridge;
}

RCT_EXPORT_METHOD(stopThread:(nonnull NSNumber *)threadId)
{
  RCTBridge *threadBridge = threads[threadId];
  if (threadBridge == nil) {
    NSLog(@"Thread is Nil. abort stopping thread with id %@", threadId);
    return;
  }

  [threadBridge invalidate];
  [threads removeObjectForKey:threadId];
}

RCT_EXPORT_METHOD(postThreadMessage:(nonnull NSNumber *)threadId
                  message:(NSString *)message)
{
  RCTBridge *threadBridge = threads[threadId];
  if (threadBridge == nil) {
    NSLog(@"Thread is Nil. abort posting to thread with id %@", threadId);
    return;
  }

  ThreadSelfManager *thread = [threadBridge moduleForClass:ThreadSelfManager.class];

  [thread postMessage:message];
}

- (void)invalidate {
  for (NSNumber *threadId in threads) {
    RCTBridge *threadBridge = threads[threadId];
    [threadBridge invalidate];
  }

  [threads removeAllObjects];
  threads = nil;

  [super invalidate];
}

- (void)didReceiveMessage:(ThreadSelfManager *)sender
                  message:(NSString *)message
{
  id body = @{
    @"id": sender.threadId,
    @"message": message,
  };
  [self sendEventWithName:@"message"
                     body:body];
}

@end
