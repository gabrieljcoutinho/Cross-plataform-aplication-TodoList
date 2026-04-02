import { useState, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  StatusBar,
  useWindowDimensions,
  TouchableOpacity,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TarefaItem from './components/TarefaItem';
import InputComponent from './components/InputComponent';
import styles from './Css/styleApp';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const { width } = useWindowDimensions();
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState('');

  // 🔥 animação parabéns
  const animParabens = useRef(new Animated.Value(0)).current;
  const jaAnimou = useRef(false);

  useEffect(() => {
    carregarTarefas();
  }, []);

  // 🎯 DETECTAR TODAS CONCLUÍDAS
  useEffect(() => {
    const todasConcluidas =
      tarefas.length > 0 &&
      tarefas.every(t => t.concluida);

    if (todasConcluidas && !jaAnimou.current) {
      jaAnimou.current = true;

      Animated.sequence([
        Animated.timing(animParabens, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true
        }),
        Animated.delay(1500),
        Animated.timing(animParabens, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true
        })
      ]).start();
    }

    // 🔄 reset quando tiver tarefa não concluída
    if (!todasConcluidas) {
      jaAnimou.current = false;
    }

  }, [tarefas]);

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

      {/* 🎉 PARABÉNS */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 120,
          alignSelf: 'center',
          opacity: animParabens,
          transform: [{
            scale: animParabens.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1.2]
            })
          }],
          backgroundColor: '#00ff88',
          padding: 20,
          borderRadius: 20,
          zIndex: 10
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>
          🎉 Parabéns! Todas concluídas!
        </Text>
      </Animated.View>

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