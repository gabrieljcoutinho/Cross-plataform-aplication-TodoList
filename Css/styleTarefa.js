import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1c',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  concluido: {
    backgroundColor: '#0f2b1f'
  },
  texto: {
    flex: 1,
    marginHorizontal: 10,
    color: '#fff'
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#00ff88'
  },
  delete: {
    fontSize: 18
  }
});

export default styles;