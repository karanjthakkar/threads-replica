import React from 'react';
import { View, Image, Text } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { State, PanGestureHandler } from 'react-native-gesture-handler';

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
  SpringUtils,
  interpolate,
  Extrapolate,
} = Animated;

const translationX = new Value(0);
const velocityX = new Value(0);
const state = new Value(State.UNDETERMINED);
const clock = new Clock();
const finished = new Value(0);
const position = new Value(0);
const velocity = new Value(0);
const time = new Value(0);

const Message = () => {
  const shadowOpacity = interpolate(translationX, {
    inputRange: [-4, 0, 4],
    outputRange: [0.3, 0, 0.3],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <PanGestureHandler
      onHandlerStateChange={({ nativeEvent }) => {
        state.setValue(nativeEvent.state);
      }}
      onGestureEvent={event([{ nativeEvent: { translationX, velocityX } }], {
        useNativeDriver: true,
      })}
    >
      <Animated.View
        style={{
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
          marginBottom: 12,
          transform: [
            {
              translateX: cond(
                neq(state, State.END),
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
  );
};

export default Message;
