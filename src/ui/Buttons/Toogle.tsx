import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TextTitle from '../Text/TextCustom';

interface ToggleButtonProps {
  options: Array<{label: string; value: string}>;
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = props => {
  return (
    <View style={styles.toggleButtonGroup}>
      {props.options.map(option => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.toggleButton,
            props.selectedValue === option.value
              ? styles.toggleButtonSelected
              : {},
          ]}
          onPress={() => props.onSelect(option.value)}>
          <TextTitle
            style={[
              styles.toggleButtonText,
              props.selectedValue === option.value
                ? {}
                : styles.toggleButtonTextInactive,
            ]}>
            {option.label}
          </TextTitle>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  toggleButtonGroup: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3D3B3E',
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#202026',
  },
  toggleButtonSelected: {
    backgroundColor: '#0E46F1',
    // borderColor: '#0E46F1',
  },
  toggleButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
  toggleButtonTextInactive: {
    color: 'white',
  },
});

export default ToggleButton;
