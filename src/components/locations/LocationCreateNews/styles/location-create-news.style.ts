import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 9999,
    position: 'relative',
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  iconLeftText: {
    marginRight: 5,
  },
  label: {
    fontSize: 16,
    width: '100%',
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#91939F',
    backgroundColor: '#491717ff',
    borderRadius: 8,
    padding: 8,
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picker: {
    backgroundColor: 'transparent',
  },
  dropdownContainer: {
    width: '100%',
    borderColor: '#ccc',
    backgroundColor: '#202026',
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
});
