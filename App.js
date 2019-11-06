import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Vibration,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

import Header, { HEADER_HEIGHT } from './Header';
import Content from './Content';

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
