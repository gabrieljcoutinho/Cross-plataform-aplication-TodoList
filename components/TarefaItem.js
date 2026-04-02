import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Switch
} from 'react-native';

export default function TarefaItem({ tarefa, onRemover, onAlternar }) {
  const scale = useRef(new Animated.Value(1)).current;

  const animPress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={animPress}
        style={[
          styles.container,
          tarefa.concluida && styles.concluido
        ]}
      >
        <Switch
          value={tarefa.concluida}
          onValueChange={() => onAlternar(tarefa.id)}
        />

        <Text style={[
          styles.texto,
          tarefa.concluida && styles.textoConcluido
        ]}>
          {tarefa.texto}
        </Text>

        <TouchableOpacity onPress={() => onRemover(tarefa.id)}>
          <Text style={styles.delete}>🗑️</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

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