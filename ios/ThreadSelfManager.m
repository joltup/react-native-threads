#import "ThreadSelfManager.h"
#include <stdlib.h>

@implementation ThreadSelfManager

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"message"];
}

- (void)postMessage:(NSString *)message
{
  [self sendEventWithName:@"message" body:message];
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
