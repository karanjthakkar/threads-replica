import React from 'react';
import Animated from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { FontAwesome } from '@expo/vector-icons';

const HEADER_ICON_SIZE = 48;
const STROKE_WIDTH = 2;
const RADIUS = (HEADER_ICON_SIZE - STROKE_WIDTH) / 2;
const HEADER_ICON_BORDER_CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
let hasVibrated = new Animated.Value(false);
let lastValue = 0;

const CameraIcon = ({ y }) => {
  const strokeDashoffset = Animated.interpolate(y, {
    inputRange: [-80, 0],
    outputRange: [0, HEADER_ICON_BORDER_CIRCUMFERENCE],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  Animated.useCode(
    Animated.call(
      [
        Animated.or(
          Animated.cond(
            Animated.and(Animated.lessThan(y, -80), Animated.not(hasVibrated)),
            [Animated.set(hasVibrated, true), true],
            false
          ),
          Animated.cond(
            Animated.and(
              Animated.greaterThan(y, -80),
              Animated.eq(hasVibrated, true)
            ),
            [Animated.set(hasVibrated, false), true],
            false
          )
        ),
      ],
      ([val]) => {
        if (val) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    )
  );
  const lightInDarkIconOpacity = Animated.interpolate(y, {
    inputRange: [-84, -80],
    outputRange: [1, 0],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  const darkInLightIconOpacity = Animated.interpolate(y, {
    inputRange: [-84, -80],
    outputRange: [0, 1],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  return (
    <Animated.View
      style={{
        height: HEADER_ICON_SIZE,
        width: HEADER_ICON_SIZE,
      }}
    >
      <Svg
        width={HEADER_ICON_SIZE}
        height={HEADER_ICON_SIZE}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          zIndex: 3,
        }}
      >
        <AnimatedCircle
          stroke="black"
          fill="transparent"
          r={RADIUS}
          cx={HEADER_ICON_SIZE / 2}
          cy={HEADER_ICON_SIZE / 2}
          strokeDasharray={`${HEADER_ICON_BORDER_CIRCUMFERENCE} ${HEADER_ICON_BORDER_CIRCUMFERENCE}`}
          strokeWidth={STROKE_WIDTH}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <Animated.View
        style={{
          backgroundColor: '#F3EFE6',
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          height: HEADER_ICON_SIZE,
          width: HEADER_ICON_SIZE,
          opacity: darkInLightIconOpacity,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
          borderRadius: HEADER_ICON_SIZE / 2,
        }}
      >
        <FontAwesome name="camera" size={20} color="#49322F" />
      </Animated.View>
      <Animated.View
        style={{
          backgroundColor: '#49322F',
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          height: HEADER_ICON_SIZE,
          width: HEADER_ICON_SIZE,
          opacity: lightInDarkIconOpacity,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          borderRadius: HEADER_ICON_SIZE / 2,
        }}
      >
        <FontAwesome name="camera" size={20} color="#F3EFE6" />
      </Animated.View>
    </Animated.View>
  );
};

export default CameraIcon;
