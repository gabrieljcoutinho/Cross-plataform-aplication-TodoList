import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, StatusBar, useWindowDimensions, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TarefaItem from './components/TarefaItem';
import InputComponent from './components/InputComponent';

export default function App() {
  const { width } = useWindowDimensions();
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState('');

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    const dados = await AsyncStorage.getItem('tarefas');
    if (dados) setTarefas(JSON.parse(dados));
  };

  const salvarTarefas = async (lista) => {
    await AsyncStorage.setItem('tarefas', JSON.stringify(lista));
  };

  const adicionarTarefa = () => {
    if (!texto.trim()) return;

    const nova = {
      id: Date.now().toString(),
      texto,
      concluida: false
    };

    const novaLista = [...tarefas, nova];
    setTarefas(novaLista);
    salvarTarefas(novaLista);
    setTexto('');
  };

  const alternarTarefa = (id) => {
    const novaLista = tarefas.map(t =>
      t.id === id ? { ...t, concluida: !t.concluida } : t
    );
    setTarefas(novaLista);
    salvarTarefas(novaLista);
  };

  const removerTarefa = (id) => {
    const novaLista = tarefas.filter((t) => t.id !== id);
    setTarefas(novaLista);
    salvarTarefas(novaLista);
  };

  // ✅ NOVA FUNÇÃO
  const limparTodasTarefas = async () => {
    setTarefas([]);
    await AsyncStorage.removeItem('tarefas');
  };

  const isLargeScreen = width >= 768;

  return (
    <View style={[
      styles.container,
      isLargeScreen && styles.containerLarge
    ]}>
      <StatusBar barStyle="light-content" />

      <InputComponent
        texto={texto}
        setTexto={setTexto}
        adicionarTarefa={adicionarTarefa}
      />

      {/* ✅ BOTÃO NOVO */}
      <TouchableOpacity
        style={styles.clearButton}
        onPress={limparTodasTarefas}
      >
        <Text style={styles.clearButtonText}>REMOVER TODAS</Text>
      </TouchableOpacity>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TarefaItem
            tarefa={item}
            onRemover={removerTarefa}
            onAlternar={alternarTarefa}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingTop: 60
  },
  listContent: {
    paddingBottom: 40,
  },
  containerLarge: {
    paddingHorizontal: '20%',
    backgroundColor: '#000',
  },

  // ✅ ESTILO NOVO
  clearButton: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  }
});