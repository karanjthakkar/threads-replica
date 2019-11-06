import React from 'react';
import { View, Image, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useSafeArea } from 'react-native-safe-area-context';

import CameraIcon from './CameraIcon';

export const HEADER_HEIGHT = 110;
const HEADER_MAX_CONTENT_HEIGHT = 68;
const HEADER_BOTTOM_SPACING = 12;
const HEADER_ICON_SIZE = 48;
const STROKE_WIDTH = 2;
const RADIUS = (HEADER_ICON_SIZE - STROKE_WIDTH) / 2;
const HEADER_ICON_BORDER_CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
let hasVibrated = new Animated.Value(false);
let lastValue = 0;

const Header = ({ height, y }) => {
  const insets = useSafeArea();
  const opacity = Animated.interpolate(height, {
    inputRange: [72, 74, 110],
    outputRange: [0, 1, 1],
    extrapolate: Animated.Extrapolate.CLAMP,
  });
  const shadowOpacity = new Animated.Value(0);
  Animated.useCode(
    Animated.cond(
      Animated.greaterOrEq(y, 2),
      Animated.set(shadowOpacity, 0.2),
      Animated.set(shadowOpacity, 0)
    )
  );
  return (
    <Animated.View
      style={{
        paddingTop: insets.top,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FEFCF4',
        zIndex: 2,
        shadowColor: 'gray',
        shadowOffset: {
          height: 2,
        },
        shadowOpacity,
        shadowRadius: 2,
      }}
    >
      <Animated.View
        style={{
          height,
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: Animated.sub(
              Animated.sub(height, HEADER_MAX_CONTENT_HEIGHT),
              HEADER_BOTTOM_SPACING
            ),
            left: 0,
            right: 0,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 18,
            opacity,
            paddingBottom: HEADER_BOTTOM_SPACING,
          }}
        >
          <Animated.View
            style={{
              backgroundColor: '#F3EFE6',
              height: 48,
              width: 48,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 24,
            }}
          >
            <Feather name="menu" size={20} color="#49322F" />
          </Animated.View>
          <Animated.View style={{ flex: 1, alignItems: 'center' }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#CBC9C3',
                borderRadius: 34,
                height: HEADER_MAX_CONTENT_HEIGHT,
                width: HEADER_MAX_CONTENT_HEIGHT,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: '#F3EFE6',
                  height: 60,
                  width: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30,
                  padding: 2,
                }}
              >
                <Image
                  source={require('./assets/karan.jpg')}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                  }}
                  resizeMode="contain"
                />
                <View
                  style={{
                    height: 24,
                    width: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    backgroundColor: '#FFFDF8',
                    position: 'absolute',
                    right: -4,
                    bottom: -4,
                    shadowColor: 'gray',
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 1,
                  }}
                >
                  <FontAwesome name="plus" size={14} color="#49322F" />
                </View>
              </View>
            </View>
          </Animated.View>
          <CameraIcon y={y} />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default Header;
