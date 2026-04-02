import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const InputComponent = ({ texto, setTexto, adicionarTarefa }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={texto}
        onChangeText={setTexto}
        placeholder="Nova tarefa..."
        placeholderTextColor="#555"
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={adicionarTarefa}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>ADICIONAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 30,
    position: 'relative',
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    color: '#000',
    fontSize: 16,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#ed145b',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#ed145b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

export default InputComponent;