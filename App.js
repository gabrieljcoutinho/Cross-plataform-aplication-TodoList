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

  // 🔥 ALTERAÇÃO PRINCIPAL AQUI
  const alternarTarefa = (id) => {
    const atualizadas = tarefas.map(t =>
      t.id === id ? { ...t, concluida: !t.concluida } : t
    );

    const naoConcluidas = atualizadas.filter(t => !t.concluida);
    const concluidas = atualizadas.filter(t => t.concluida);

    const novaLista = [...naoConcluidas, ...concluidas];

    setTarefas(novaLista);
    salvarTarefas(novaLista);
  };

  const removerTarefa = (id) => {
    const novaLista = tarefas.filter((t) => t.id !== id);
    setTarefas(novaLista);
    salvarTarefas(novaLista);
  };

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

      <View style={styles.clearContainer}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={limparTodasTarefas}
        >
          <Text style={styles.clearButtonText}>Limpar</Text>
        </TouchableOpacity>
      </View>

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
  clearContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#ed145b',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  }
});