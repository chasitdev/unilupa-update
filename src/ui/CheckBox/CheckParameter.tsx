import {color} from '@utils/colors';
import {icon} from 'src/assets/icons';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import TextTitle from '../Text/TextCustom';

interface Props {
  text: string;
  isActive: boolean;
}
const CheckParameter: React.FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Image
        width={20}
        height={20}
        source={props.isActive ? icon.activeCheck : icon.inactiveCheck}
      />

      <TextTitle
        fontSize={16}
        lineHeight={24}
        fontWeight="400"
        color={color.buttonDark}>
        {props.text}
      </TextTitle>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CheckParameter;
