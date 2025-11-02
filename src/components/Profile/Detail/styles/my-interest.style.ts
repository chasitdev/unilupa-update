import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollView: {
    width: '100%',
    padding: 16,
  },
  buttons: {
    marginTop: 14,
    width: '100%',
    alignItems: 'center',
  },
  bottomButtons: {
    padding: 15,
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 5,
  },
  settingsButton: {
    alignSelf: 'flex-start',
    width: 48,
    height: 48,
    marginLeft: 16,
    backgroundColor: '#0E46F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
