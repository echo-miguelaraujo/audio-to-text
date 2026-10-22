import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Keyboard,
  SafeAreaView
} from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [texto, setTexto] = useState('');
  const [falando, setFalando] = useState(false);

  const reproduzirTexto = () => {
    if (texto.trim() === '') return;
    Keyboard.dismiss();
    Speech.stop();
    setFalando(true);

    Speech.speak(texto, {
      language: 'pt-BR',
      onDone: () => setFalando(false),
      onStopped: () => setFalando(false),
      onError: () => setFalando(false)
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.titulo}>Texto para Voz</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Digite o texto aqui..."
            placeholderTextColor="#999"
            multiline
            value={texto}
            onChangeText={setTexto}
          />

          <View style={styles.botoesContainer}>
            <TouchableOpacity 
              style={[styles.botao, falando ? styles.botaoDesativado : styles.botaoAtivo]} 
              onPress={reproduzirTexto}
              activeOpacity={0.8}
            >
              <Text style={styles.textoBotao}>
                {falando ? 'Lendo...' : 'Ouvir'}
              </Text>
            </TouchableOpacity>

            {falando && (
              <TouchableOpacity 
                style={styles.botaoParar} 
                onPress={() => {
                  Speech.stop();
                  setFalando(false);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.textoBotaoParar}>Parar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#333',
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 24,
  },
  botoesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  botao: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  botaoAtivo: {
    backgroundColor: '#000000',
  },
  botaoDesativado: {
    backgroundColor: '#CCCCCC',
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  botaoParar: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF3B30',
    alignItems: 'center',
  },
  textoBotaoParar: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  }
});
