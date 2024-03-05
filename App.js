import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const request = async(callback) =>{
  const response = await fetch('https://date.nager.at/api/v3/NextPublicHolidays/BR');
  const parsed = await response.json();
  callback(parsed);
}

export default function App() {

  const [registros, setRegistros] = useState([]);
  useEffect(()=>{
    request(setRegistros);
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Feriados Públicos no Brasil</Text>
      <FlatList
      data={registros}
      renderItem={({item}) =>
      <Text style={styles.itens}>
        <Text>Data: {item.date}{'\n'}</Text>
        <Text>Nome do feriado: {item.localName}{'\n'}</Text>
        <Text style={styles.espaco}>{'\n'}</Text>
        </Text>
      }/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd866',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: '#f57900',
    textAlign: 'center',
    margin: 45,
    fontWeight: 'bold',
    fontSize: 30
  },
  
  itens: {
    backgroundColor: '#ff5c68',
    borderRadius: 20,
    margin: 15,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  }
});