//
//  BeaconModule.m
//  app
//
//  Created by Mochamad Gufron on 13/11/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BeaconModule.h"

@implementation BeaconModule {
  RCTPromiseResolveBlock connectResolveBlock;
  RCTPromiseRejectBlock connectRejectBlock;
  bool hasListeners;
}
@synthesize locationManager;
@synthesize beacons;
@synthesize beaconRegion;

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
- (NSArray<NSString *> *)supportedEvents {
  return @[@"beaconsUpdate"];
}
- (void) connect {
  NSUUID *uuid = [[NSUUID alloc] initWithUUIDString:@"EBEFD083-70A2-47C8-9837-E7B5634DF524"];
  beaconRegion = [[CLBeaconRegion alloc] initWithProximityUUID:uuid identifier:@"devsummit"];
  hasListeners = YES;
  locationManager = [[CLLocationManager alloc] init];
  locationManager.desiredAccuracy = kCLLocationAccuracyBest;
  locationManager.delegate = self;
  locationManager.distanceFilter = 20;
  [locationManager requestAlwaysAuthorization];
  
}

- (void) locationManager:(CLLocationManager *)manager monitoringDidFailForRegion:(CLRegion *)region withError:(NSError *)error{
  
}

- (void) locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status{
  NSLog(@"received status %d", status);
  if (status == kCLAuthorizationStatusAuthorizedAlways || status == kCLAuthorizationStatusAuthorizedWhenInUse) {
    connectResolveBlock(@"authorized");
    [locationManager startRangingBeaconsInRegion:beaconRegion];
  } else {
    NSString *errorStatus = [NSString stringWithFormat:@"%@", [NSNumber numberWithInt:status]];
    connectRejectBlock(errorStatus, @"Unauthorized", nil);
  }
}
- (void)locationManager:(CLLocationManager *)manager didRangeBeacons:(NSArray<CLBeacon *> *)beacons inRegion:(CLBeaconRegion *)region{
  if (hasListeners == NO) {
    return;
  }
    self.beacons = beacons;
//    NSLog(@"%@", beacons);
  NSMutableArray<NSObject *> *beaconsData = [[NSMutableArray alloc] init];
  for (CLBeacon *beacon in beacons){
    NSObject *beaconObject = @{
                               @"uuid": beacon.proximityUUID.UUIDString,
                               @"proximity": [NSNumber numberWithInt:[beacon proximity]],
                               @"accuracy": [NSNumber numberWithDouble:[beacon accuracy]],
                               @"major": [beacon major],
                               @"minor": [beacon minor],
                               @"rssi": [NSNumber numberWithInteger:[beacon rssi]],
                               };
    [beaconsData addObject:beaconObject];
  }
    [self sendEventWithName:@"beaconsUpdate" body:beaconsData];
}

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(startConnect, findEventsWithResolver:(RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock) reject){
  connectResolveBlock = resolve;
  connectRejectBlock = reject;
  [self connect];
}
RCT_EXPORT_METHOD(disconnect){
  hasListeners = NO;
}
@end
