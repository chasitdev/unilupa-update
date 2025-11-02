import React from 'react';
import {StyleSheet, View} from 'react-native';
import TextTitle from '../../Text/TextCustom';

const ListHeader = () => (
  <View style={styles.headerContainer}>
    <TextTitle fontSize={14} fontWeight="500" lineHeight={16} color="white">
      #{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
      ПІБ
    </TextTitle>
    <TextTitle fontSize={14} fontWeight="500" lineHeight={16} color="white">
      Заг. бал
    </TextTitle>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});

export default ListHeader;
