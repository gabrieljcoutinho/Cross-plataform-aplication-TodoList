import { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
  TouchableOpacity,
  Text,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TarefaItem from './components/TarefaItem';
import InputComponent from './components/InputComponent';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const { width } = useWindowDimensions();
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState('');

  useEffect(() => {
    carregarTarefas();
  }, []);

  const animar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const carregarTarefas = async () => {
    const dados = await AsyncStorage.getItem('tarefas');
    if (dados) setTarefas(JSON.parse(dados));
  };

  const salvarTarefas = async (lista) => {
    await AsyncStorage.setItem('tarefas', JSON.stringify(lista));
  };

  const adicionarTarefa = () => {
    if (!texto.trim()) return;

    animar();

    const nova = {
      id: Date.now().toString(),
      texto,
      concluida: false
    };

    const novaLista = [nova, ...tarefas];
    setTarefas(novaLista);
    salvarTarefas(novaLista);
    setTexto('');
  };

  const alternarTarefa = (id) => {
    animar();

    const atualizadas = tarefas.map(t =>
      t.id === id ? { ...t, concluida: !t.concluida } : t
    );

    const novaLista = [
      ...atualizadas.filter(t => !t.concluida),
      ...atualizadas.filter(t => t.concluida)
    ];

    setTarefas(novaLista);
    salvarTarefas(novaLista);
  };

  const removerTarefa = (id) => {
    animar();

    const novaLista = tarefas.filter(t => t.id !== id);
    setTarefas(novaLista);
    salvarTarefas(novaLista);
  };

  const limparTodasTarefas = async () => {
    animar();
    setTarefas([]);
    await AsyncStorage.removeItem('tarefas');
  };

  const isLargeScreen = width >= 768;

  return (
    <View style={[styles.container, isLargeScreen && styles.containerLarge]}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>Minhas Tarefas</Text>

      <InputComponent
        texto={texto}
        setTexto={setTexto}
        adicionarTarefa={adicionarTarefa}
      />

      <TouchableOpacity
        style={styles.clearButton}
        onPress={limparTodasTarefas}
      >
        <Text style={styles.clearText}>Limpar tudo</Text>
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
      />
    </View>
  );
}

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