import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Switch
} from 'react-native';
import styles from '../Css/styleTarefa';

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