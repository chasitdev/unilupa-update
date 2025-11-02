import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface IProps {
  title: string;
  onPress: () => void;
  isSelected: boolean;
}

const EducationOptionButton: React.FC<IProps> = ({
  title,
  onPress,
  isSelected,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={onPress}>
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#202026',
    padding: 11,
    paddingHorizontal: 10,

    marginVertical: 8,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8F8F92',
    alignSelf: 'flex-start',
    width: '100%',
  },
  selectedButton: {
    backgroundColor: '#0E46F1',
    borderColor: '#0E46F1',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  selectedText: {
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

export default EducationOptionButton;
