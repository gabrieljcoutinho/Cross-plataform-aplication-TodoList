import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';

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