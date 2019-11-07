import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { State, PanGestureHandler } from 'react-native-gesture-handler';
import CameraIcon from './CameraIcon';
import CancelIcon from './CancelIcon';

const {
  Value,
  clockRunning,
  cond,
  set,
  startClock,
  spring,
  stopClock,
  Clock,
  event,
  eq,
  neq,
  and,
  debug,
  block,
  multiply,
  abs,
  or,
  SpringUtils,
  interpolate,
  Extrapolate,
  greaterThan,
} = Animated;

const Message = ({ y }) => {
  const [state, setState] = useState({
    translationX: new Value(0),
    handlerState: new Value(State.UNDETERMINED),
    clock: new Clock(),
    finished: new Value(0),
    position: new Value(0),
    velocity: new Value(0),
    time: new Value(0),
  });
  const {
    translationX,
    velocityX,
    handlerState,
    clock,
    finished,
    position,
    velocity,
    time,
  } = state;
  const shadowOpacity = interpolate(translationX, {
    inputRange: [-4, 0, 4],
    outputRange: [0.3, 0, 0.3],
    extrapolate: Extrapolate.CLAMP,
  });
  const right = interpolate(translationX, {
    inputRange: [-20, 0],
    outputRange: [5, 0],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const left = interpolate(translationX, {
    inputRange: [0, 20],
    outputRange: [0, 5],
    extrapolateLeft: Extrapolate.CLAMP,
  });
  const margin = interpolate(y, {
    inputRange: [-32, 0],
    outputRange: [14, 8],
    extrapolateRight: Extrapolate.CLAMP,
  });
  return (
    <View>
      <Animated.View
        style={{
          zIndex: 1,
          position: 'absolute',
          justifyContent: 'center',
          left,
          opacity: cond(greaterThan(right, 0), 0, 1),
          top: 0,
          bottom: 0,
        }}
      >
        <CancelIcon y={translationX} />
      </Animated.View>
      <PanGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          handlerState.setValue(nativeEvent.state);
        }}
        onGestureEvent={event([{ nativeEvent: { translationX, velocityX } }], {
          useNativeDriver: true,
        })}
      >
        <Animated.View
          style={{
            zIndex: 2,
            borderRadius: 10,
            backgroundColor: '#FEFCF4',
            padding: 10,
            shadowColor: 'gray',
            shadowOffset: {
              height: 3,
              width: -3,
            },
            shadowOpacity,
            shadowRadius: 8,
            flexDirection: 'row',
            marginBottom: margin,
            transform: [
              {
                translateX: cond(
                  neq(handlerState, State.END),
                  [stopClock(clock), translationX],
                  [
                    cond(clockRunning(clock), 0, [
                      set(position, translationX),
                      set(finished, 0),
                      startClock(clock),
                    ]),
                    spring(
                      clock,
                      {
                        finished,
                        position,
                        velocity,
                        time,
                      },
                      {
                        stiffness: new Value(500),
                        mass: new Value(1),
                        damping: new Value(100),
                        overshootClamping: false,
                        restSpeedThreshold: 0,
                        restDisplacementThreshold: 0,
                        toValue: new Value(0),
                      }
                    ),
                    set(translationX, position),
                    cond(finished, stopClock(clock)),
                    position,
                  ]
                ),
              },
            ],
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: '#CBC9C3',
              borderRadius: 39,
              height: 78,
              width: 78,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16,
            }}
          >
            <Image
              source={require('./assets/narendra.jpg')}
              style={{
                width: 68,
                height: 68,
                borderRadius: 34,
                padding: 2,
              }}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>
              narendrashetty
            </Text>
            <Text style={{ fontSize: 14, paddingTop: 4 }}>
              You mentioned narendrashe...
            </Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View
        style={{
          zIndex: 1,
          position: 'absolute',
          justifyContent: 'center',
          right,
          opacity: cond(greaterThan(left, 0), 0, 1),
          top: 0,
          bottom: 0,
        }}
      >
        <CameraIcon y={translationX} />
      </Animated.View>
    </View>
  );
};

export default Message;
