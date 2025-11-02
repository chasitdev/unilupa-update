import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containerBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    // minWidth: 110,
    // maxWidth: 80,
  },
  btnBiggest: {
    flex: 1,
    // paddingLeft: 5,
    // paddingRight: 5,
    minHeight: 60,
    maxHeight: 60,
    minWidth: 60,
    maxWidth: 60,
    borderRadius: 99,
    overflow: 'hidden',
    // borderColor: '#ffffff',
    borderWidth: 2,
    position: 'relative',
  },
  iconBiggestBtn: {
    left: 9,
    bottom: 5,
    // top: 10,
  },
});
