#import <React/RCTEventEmitter.h>

@protocol ThreadSelfManagerDelegate <NSObject>
- (void)didReceiveMessage:(id)sender
                  message:(NSString *)message;
@end

@interface ThreadSelfManager : RCTEventEmitter
@property (nonatomic, strong) NSNumber *threadId;
@property (nonatomic, weak) id<ThreadSelfManagerDelegate> delegate;
- (void)postMessage:(NSString *)message;
@end
