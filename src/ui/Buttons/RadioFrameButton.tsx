import {color} from '@utils/colors';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import RadioCircle from '../Text/RadioCircle';
import TextCustom from '../Text/TextCustom';

interface Props {
  isActive: boolean;
  onPress: () => void;
  title: string;
  description: string;
}
const RadioFrameButton: React.FC<Props> = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, props.isActive ? styles.active : null]}>
      <View>
        <RadioCircle isActive={props.isActive} />
      </View>
      <View>
        <TextCustom
          fontSize={14}
          lineHeight={20}
          fontWeight="500"
          color="#344054">
          {props.title}
        </TextCustom>
        <TextCustom
          fontSize={14}
          lineHeight={20}
          fontWeight="400"
          color="#344054">
          {props.description}
        </TextCustom>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: color.borderPrimary,
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    padding: 16,
    borderRadius: 12,
  },
  active: {
    borderColor: color.buttonPrimary,
  },
});

export default RadioFrameButton;
