import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from '../Css/styleInput';

export default function InputComponent({ texto, setTexto, adicionarTarefa }) {
  return (
    <View style={styles.container}>
      <TextInput
        value={texto}
        onChangeText={setTexto}
        placeholder="Adicionar tarefa..."
        placeholderTextColor="#777"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={adicionarTarefa}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}