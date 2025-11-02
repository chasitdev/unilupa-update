import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
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
  input: {
    // width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    backgroundColor: '#F0F0F0',
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
});