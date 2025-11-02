import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 5,
  },
  containerControllers: {
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: '#91939F',
    height: 26,
    paddingHorizontal: 7,
    width: '100%',
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 10,
  },
  iconLeftText: {
    marginRight: 5,
  },
});
