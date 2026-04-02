import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  containerLarge: {
    paddingHorizontal: '20%',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },
  clearButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  clearText: {
    color: '#ed145b',
    fontWeight: 'bold'
  }
});

export default styles;