#import "ThreadManager.h"
#include <stdlib.h>

@implementation ThreadManager {
  NSMutableDictionary<NSNumber *, RCTBridge *> *_threads;
}

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (instancetype)init
{
  if (self = [super init]) {
    _threads = [NSMutableDictionary new];
  }
  return self;
}

- (void)invalidate {
  for (NSNumber *threadId in _threads) {
    RCTBridge *threadBridge = _threads[threadId];
    [threadBridge invalidate];
  }

  [_threads removeAllObjects];
  _threads = nil;

  [super invalidate];
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"message"];
}

RCT_EXPORT_METHOD(startThread:(nonnull NSNumber *)threadId
                  name:(NSString *)name)
{
  NSURL *threadURL = [RCTBundleURLProvider.sharedSettings jsBundleURLForBundleRoot:name
                                                                  fallbackResource:name];
  NSLog(@"Starting Thread %@ (id: %@)", threadURL.absoluteString, threadId);

  RCTBridge *threadBridge = [[RCTBridge alloc] initWithBundleURL:threadURL
                                                  moduleProvider:nil
                                                   launchOptions:nil];

  ThreadSelfManager *threadSelf = [threadBridge moduleForClass:ThreadSelfManager.class];
  threadSelf.threadId = threadId;
  threadSelf.delegate = self;

  _threads[threadId] = threadBridge;
}

RCT_EXPORT_METHOD(stopThread:(nonnull NSNumber *)threadId)
{
  RCTBridge *threadBridge = _threads[threadId];
  if (threadBridge == nil) {
    NSLog(@"Thread is Nil. abort stopping thread with id %@", threadId);
    return;
  }

  [threadBridge invalidate];
  [_threads removeObjectForKey:threadId];
}

RCT_EXPORT_METHOD(postThreadMessage:(nonnull NSNumber *)threadId
                  message:(NSString *)message)
{
  RCTBridge *threadBridge = _threads[threadId];
  if (threadBridge == nil) {
    NSLog(@"Thread is Nil. abort posting to thread with id %@", threadId);
    return;
  }

  ThreadSelfManager *threadSelf = [threadBridge moduleForClass:ThreadSelfManager.class];
  [threadSelf postMessage:message];
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
