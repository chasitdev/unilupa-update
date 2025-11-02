import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignContent: 'flex-start',
    gap: 3,
    borderRadius: 8,
  },
  wrapImage: {
    width: '100%',
    flex: 1,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: 10,
  },
  imageContainer: {
    width: 24,
    height: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
