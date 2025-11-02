import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    zIndex: 1000,
  },
  label: {
    fontSize: 16,
    width: '100%',
    color: '#fff',
    // marginRight: 8,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  inputContainer: {
    width: '100%',
  },
  picker: {
    borderColor: '#ccc',
  },
  dropdownContainer: {
    width: '100%',
    borderColor: '#ccc',
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
});
