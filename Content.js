import React from 'react';
import Animated from 'react-native-reanimated';
import { useSafeArea } from 'react-native-safe-area-context';
import Message from './Message';

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
          paddingHorizontal: 10,
          paddingTop: Animated.add(height, 12, insets.top),
        }}
      >
        <Message />
      </Animated.View>
    </Animated.ScrollView>
  );
};

export default Content;
