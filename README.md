# 📱 App de Tarefas com React Native (Expo)

Este projeto é um aplicativo de **lista de tarefas (To-Do List)** que permite ao usuário adicionar, concluir, remover e salvar tarefas no dispositivo.

O foco do projeto é demonstrar conceitos importantes do React Native como **estado, efeitos, persistência e animações**.

---

## 🚀 Como o App Funciona

O aplicativo mantém uma lista de tarefas onde cada item possui:

- Um texto (descrição da tarefa)
- Um estado (concluída ou não)

O usuário pode interagir com essa lista em tempo real.

---

## 🧠 Lógica Principal

### 📌 Estado das Tarefas

O app utiliza estado para controlar os dados:

- `tarefas`: armazena todas as tarefas
- `texto`: armazena o que o usuário digita

Sempre que algo muda, o React atualiza a interface automaticamente.

---

### ➕ Adicionar Tarefa

Quando o usuário digita e clica no botão:

- O app verifica se o texto não está vazio
- Cria uma nova tarefa com ID único
- Adiciona no topo da lista
- Limpa o campo de input

---

### 🔄 Concluir Tarefa

Ao marcar uma tarefa:

- O estado `concluida` é invertido (true/false)
- A tarefa muda de estilo visual
- Tarefas concluídas vão para o final da lista

---

### 🗑️ Remover Tarefa

Ao clicar no ícone de lixeira:

- A tarefa é removida da lista
- O estado é atualizado automaticamente

---

### 🧹 Limpar Tudo

Existe um botão que:

- Remove todas as tarefas
- Limpa também o armazenamento do dispositivo

---

## 💾 Persistência de Dados

O app usa **AsyncStorage** para salvar as tarefas.

Isso significa que:

- Mesmo fechando o app, os dados continuam salvos
- Ao abrir novamente, as tarefas são carregadas automaticamente

---

## 🎉 Sistema de Conquista (Parabéns)

O app detecta quando:

- Existe pelo menos uma tarefa
- Todas estão concluídas

Quando isso acontece:

- Aparece uma animação de "Parabéns"
- A mensagem surge e depois desaparece automaticamente

---

## ⚡ Animações

O projeto usa dois tipos de animação:

### 🔹 LayoutAnimation
- Suaviza mudanças na lista (adicionar/remover)

### 🔹 Animated
- Anima o efeito de "Parabéns"
- Dá feedback visual ao usuário

---

## 📱 Responsividade

O app se adapta ao tamanho da tela:

- Em telas maiores (tablet), o layout muda
- Em telas menores (celular), mantém formato compacto

---

## 🧩 Componentização

O projeto é dividido em partes reutilizáveis:

- **InputComponent** → campo de texto + botão de adicionar  
- **TarefaItem** → cada item da lista  

Isso deixa o código mais organizado e escalável.

---

## 🎯 Objetivo do Projeto

Este app não é só uma lista de tarefas simples. Ele demonstra:

- Organização de código
- Separação de responsabilidades
- Uso real de armazenamento local
- Experiência do usuário com animações

---

## 📌 Conclusão

O projeto é uma base sólida para aplicações maiores, podendo evoluir para:

- Apps com backend
- Sincronização em nuvem
- Sistemas mais complexos de produtividade
