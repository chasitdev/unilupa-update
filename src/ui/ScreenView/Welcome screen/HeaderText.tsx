import TextTitle from '../../Text/TextCustom';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const HeaderTextWelcomeScreen = ({username}) => (
  <View style={styles.headerContainer}>
    <TextTitle fontSize={32} fontWeight="400" lineHeight={32}>
      Привіт,
    </TextTitle>
    <TextTitle fontSize={32} fontWeight="600">
      {username}!
    </TextTitle>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
});

export default HeaderTextWelcomeScreen;
