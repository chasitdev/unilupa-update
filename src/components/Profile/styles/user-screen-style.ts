import {StyleSheet} from 'react-native';
import {getCurrentHeightSize} from '@utils/currentSize';

export const styles = StyleSheet.create({
  safe: {
    backgroundColor: 'black',
  },
  container: {
    justifyContent: 'space-between',
  },
  nameText: {
    marginTop: 5,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 16,
    backgroundColor: '#454545',
  },
  topRectangle: {
    backgroundColor: '#202026',
    width: '100%',
    height: getCurrentHeightSize(150, 225, 932),
    borderBottomLeftRadius: 64,
    borderWidth: 1,
    borderBottomColor: '#3D3B3E',
    borderLeftColor: '#3D3B3E',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 36,
    paddingLeft: 32,
  },
  content: {},
  screen: {
    backgroundColor: 'black',
  },
  userInformation: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
  infoContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 40,
  },
  studyText: {
    marginBottom: 10,
  },
  containerHeader: {
    // flex: 1,
    display: 'flex',
    top: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 9999,
    paddingHorizontal: 20,
    // marginTop: 50,
    marginTop: -150,
  },
  settingsButton: {
    // position: 'absolute',
    top: -10,
    // right: 25,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    // zIndex: 100,
    backgroundColor: '#0E46F1',
  },
  btnsContainerBiggest: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between', // можно и без него
    gap: 10, // или вместо него использовать marginRight
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  iconEdit: {
    position: 'absolute',
    right: -40,
    top: 10,
    backgroundColor: '#0E46F1',
    borderRadius: 4,

    // padding: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingTop: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    width: 16,
    height: 16,
    marginRight: 5,
    tintColor: '#FFFFFF5C',
  },
  cityTag: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  resultLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  resultDivider: {
    flex: 1,
    height: 1,
    marginHorizontal: 10,
    marginTop: 9,
    backgroundColor: '#FFFFFF22',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
