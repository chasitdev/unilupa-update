import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import TextTitle from '../../../src/ui/Text/TextCustom';

interface IProps {
  title: string;
  onPress: () => void;
  isSelected: boolean;
}
const CustomTimeButton: React.FC<IProps> = ({title, onPress, isSelected}) => {
  const buttonStyle = isSelected
    ? [styles.button, styles.selected]
    : styles.button;
  const textStyle = isSelected
    ? [styles.buttonText, styles.selectedText]
    : styles.buttonText;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <TextTitle
        fontSize={16}
        fontWeight="600"
        lineHeight={18}
        style={textStyle}>
        {title}
      </TextTitle>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#202026',
    borderRadius: 8,
    borderColor: '#3D3B3E',
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 10,
    justifyContent: 'center',
    minWidth: 90,
  },
  selected: {
    backgroundColor: '#0E46F1',
    borderColor: '#0E46F1',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  selectedText: {
    color: 'white',
  },
});

export default CustomTimeButton;
