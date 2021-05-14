import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import api from './src/services/api';


interface PorkemonProps {
  name: string;
  url: string;
}

export default function App() {
  const [ pokemons, setPokemons] = useState<PorkemonProps[]>([]);
  const [ loading, setLoading ] = useState(true);

  async function fetchPokemon(){
    const { data } = await api.get(`pokemon`);
    
    if(!data.results) return setLoading(true);

    setPokemons(data.results);

    setLoading(false);

  }

  useEffect(() => { 
    fetchPokemon()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Teste poke-app</Text>
      </View>
      <View style={styles.pokemons}>
        <FlatList
          data={pokemons}
          keyExtractor={( item, key ) => String(key)}
          renderItem={
            ({ item }) => (
              <>
                <Text>{ item.name }</Text>
                <Text>{ item.url }</Text>
              </>
            )
          }
          />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemons: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },
  pokemonList: {
    flex: 1
  }
});
