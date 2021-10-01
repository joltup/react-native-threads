#import "ThreadSelfManager.h"
#include <stdlib.h>

@implementation ThreadSelfManager {
  // The JS loads after this module has been initialized
  // There doesn't seem to be a great way to detect this from this module
  // When this is not nil, queued events will be appended to this array
  // instead of being dispatched directly. When startObserving is called, we
  // dispatch all pending events, then set this to nil so events can be
  // dispatched directly.
  //
  // This isn't fully spec compliant - if you don't add listeners on the first
  // run loop, then add them later, you'll get all the events that should have
  // been discarded.
  NSMutableArray<NSString *> *_pendingEvents;
}

RCT_EXPORT_MODULE();

- (instancetype)init
{
  if (self = [super init]) {
    _pendingEvents = [NSMutableArray new];
  }
  return self;
}

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"message"];
}

- (void)startObserving
{
  if (_pendingEvents) {
    for (NSString *message in _pendingEvents) {
      [self sendEventWithName:@"message" body:message];
    }

    _pendingEvents = nil;
  }
}

- (void)stopObserving
{
  if (!_pendingEvents) {
    _pendingEvents = [NSMutableArray new];
  }
}

- (void)postMessage:(NSString *)message
{
  if (_pendingEvents) {
    [_pendingEvents addObject:message];
  } else {
    [self sendEventWithName:@"message" body:message];
  }
}

RCT_REMAP_METHOD(postMessage,
                 didReceiveMessage:(NSString *)message)
{
  if (self.delegate == nil) {
    NSLog(@"No parent bridge defined - abord sending thread message");
    return;
  }

  [self.delegate didReceiveMessage:self
                           message:message];
}

@end
