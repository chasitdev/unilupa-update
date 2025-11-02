import TextTitle from '../../Text/TextCustom';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const SaveButton = ({
  onPress,
  title,
}: {
  onPress: () => void;
  title?: string;
}) => (
  <TouchableOpacity style={styles.profileSetupButton} onPress={onPress}>
    <TextTitle fontSize={18} fontWeight="600" lineHeight={19}>
      {title ? title : 'Зберегти'}
    </TextTitle>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  profileSetupButton: {
    backgroundColor: '#0E46F1',
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default SaveButton;
