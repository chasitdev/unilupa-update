import TextTitle from '../../../src/ui/Text/TextCustom';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface Props {
  onPress: () => void;
}
const FindButton: React.FC<Props> = props => {
  return (
    <View style={styles.button}>
      <TouchableOpacity style={styles.findButton} onPress={props.onPress}>
        <TextTitle fontSize={18} fontWeight="600" lineHeight={19}>
          Пошук
        </TextTitle>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  findButton: {
    backgroundColor: '#0E46F1',
    width: '90%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
  },
  button: {
    height: 65,
    justifyContent: 'center',
  },
});

export default FindButton;
