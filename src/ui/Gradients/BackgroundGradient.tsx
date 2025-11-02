import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  styleWrap?: StyleProp<ViewStyle>;
  styleGradient?: StyleProp<ViewStyle>;
  gradient: string[];
  directionGradient: 'to-right' | 'to-left' | 'to-up' | 'to-bottom';
}

const BackgroundGradient: React.FC<Props> = ({
  gradient = ['#207B6300', '#1A6251', '#15483C'],
  styleWrap,
  styleGradient,
  directionGradient,
}) => {
  let start: {x: number; y: number};
  let end: {x: number; y: number};
  switch (directionGradient) {
    case 'to-right':
      start = {x: 0, y: 0};
      end = {x: 1, y: 0};
      break;
    case 'to-left':
      start = {x: 1, y: 0};
      end = {x: 0, y: 0};
      break;
    case 'to-up':
      start = {x: 0, y: 1};
      end = {x: 0, y: 0};
      break;
    case 'to-bottom':
      start = {x: 0, y: 0};
      end = {x: 0, y: 1};
      break;
    default:
      start = {x: 0, y: 0};
      end = {x: 1, y: 0};
      break;
  }

  return (
    <View style={[styles.container, styleWrap]}>
      <LinearGradient
        colors={gradient}
        style={[styles.linearGradient, styleGradient]}
        start={start}
        end={end}
      />
      {/* {props.children} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default BackgroundGradient;
