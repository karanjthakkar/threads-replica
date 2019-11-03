import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Vibration,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useSafeArea, SafeAreaProvider } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import * as Haptics from 'expo-haptics';

const HEADER_HEIGHT = 110;
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
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const Content = ({ y, height }) => {
  const insets = useSafeArea();
  return (
    <Animated.ScrollView
      contentContainerStyle={{ flexGrow: 1, zIndex: 1 }}
      onScroll={Animated.event([
        {
          nativeEvent: {
            contentOffset: {
              y,
            },
          },
        },
      ])}
      scrollEventThrottle={1}
    >
      <Animated.View
        style={{
          flex: 1,
          paddingHorizontal: 18,
          paddingTop: Animated.add(height, 12, insets.top),
        }}
      >
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
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
        </View>
      </Animated.View>
    </Animated.ScrollView>
  );
};

export default class App extends React.Component {
  render() {
    const y = new Animated.Value(0);
    const height = Animated.interpolate(y, {
      inputRange: [0, 180],
      outputRange: [HEADER_HEIGHT, 0],
      extrapolateRight: Animated.Extrapolate.CLAMP,
    });
    return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FEFCF4',
          }}
        >
          <Header y={y} height={height} />
          <Content y={y} height={height} />
        </View>
      </SafeAreaProvider>
    );
  }
}

console.disableYellowBox = true;
