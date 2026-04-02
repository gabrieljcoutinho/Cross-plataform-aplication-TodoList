import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, useWindowDimensions } from 'react-native';

export default function TarefaItem({ tarefa, onRemover, onAlternar }) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  return (
    <View style={[
      styles.container,
      tarefa.concluida && styles.containerConcluido,
      isLargeScreen && styles.containerLarge
    ]}>
      <View style={styles.leftWrapper}>
        <Switch
          trackColor={{ false: '#444', true: '#00ff88' }}
          thumbColor={tarefa.concluida ? '#fff' : '#ed145b'}
          onValueChange={() => onAlternar(tarefa.id)}
          value={tarefa.concluida}
        />
        <View style={styles.textWrapper}>
          <Text style={[
            styles.texto,
            tarefa.concluida && styles.textoConcluido,
            isLargeScreen && styles.textoLarge
          ]}>
            {tarefa.texto}
          </Text>
          {tarefa.concluida && <Text style={styles.feitoLabel}>Feito</Text>}
        </View>
      </View>

      <TouchableOpacity onPress={() => onRemover(tarefa.id)}>
        <Text style={styles.remover}>❌</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 6,
    backgroundColor: '#000',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ed145b',
    elevation: 5,
    shadowColor: '#ed145b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  containerConcluido: {
    borderLeftColor: '#00ff88',
    backgroundColor: '#05140d',
    shadowColor: '#00ff88',
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textWrapper: {
    marginLeft: 10,
  },
  texto: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500'
  },
  textoConcluido: {
    color: '#00ff88',
    textDecorationLine: 'line-through',
    opacity: 0.7
  },
  feitoLabel: {
    color: '#00ff88',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 2
  },
  remover: { fontSize: 18 },
  // Css da responsividade desse componente
  containerLarge: {
    padding: 25,
    marginVertical: 10,
  },
  textoLarge: {
    fontSize: 20,
  }
});