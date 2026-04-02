import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 15,
    borderRadius: 12,
    color: '#fff',
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#ed145b',
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default styles;