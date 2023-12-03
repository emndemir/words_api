import React, { useState } from "react";
import { FlatList, Linking, Pressable, Text, TextInput, View } from "react-native";
import { ResponseModel } from "./src/models/responseModel";
import { Phonetic } from "./src/models/interfaces/phonetic";
import { Meaning } from "./src/models/interfaces/meaning";
import { Definition } from "./src/models/interfaces/definition";

const App = () => {
  const [data, setData] = useState();
  const [inputText, setInputText] = useState("");


  const fetchApi = (word: string) => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setData(data)
      })
      .catch(error => {
        console.error('Request failed:', error.message);
      });
  };

  const renderDefinitions = ({ item }: { item: Definition }) => (
    <View>
      <Text>Definition: {item.definition}</Text>
      {item.example ? <Text>Example: {item.example}</Text> : null}</View>
  )

  const renderPhonetics = ({ item }: { item: Phonetic }) => (
    <View>
      <Text>Phonetic: {item.text}</Text>
      {item.audio ? <Text>Audio: {item.audio}</Text> : null}

    </View>
  )

  const renderSynonims = ({ item }: { item: string[] }) => (
    <View>
      <Text>{item}</Text>
    </View>
  )

  const renderAntonyms = ({ item }: { item: string[] }) => (
    <View>
      <Text>{item}</Text>
    </View>
  )

  const renderMeanings = ({ item }: { item: Meaning }) => (
    <View>
      <Text style={{ fontSize: 24 }}>{item.partOfSpeech}</Text>
      <FlatList data={item.definitions} renderItem={renderDefinitions} />
      <Text style={{ fontSize: 24 }}>Synonims</Text>
      <FlatList data={item.synonyms} renderItem={renderSynonims} keyExtractor={(item) => item} />
      {item.antonyms ? <Text style={{ fontSize: 24 }}>Antonyms</Text> : null}
      <FlatList data={item.antonyms} renderItem={renderAntonyms} keyExtractor={(item) => item} />
    </View>
  )

  const renderItem = ({ item }: { item: ResponseModel }) => (
    <View style={{
      margin: 8,
    }}>
      <Text style={{ fontSize: 24 }}>Word: {item.word}</Text>
      <FlatList data={item.phonetics} renderItem={renderPhonetics} />
      <FlatList data={item.meanings} renderItem={renderMeanings} />
    </View>
  );

  return (
    <View style={{ justifyContent: "center", marginTop: 16, marginHorizontal: 8, padding: 8 }}>
      <TextInput
        onChangeText={(text) => setInputText(text)}
        value={inputText}
        style={{
          borderWidth: 1,
          borderRadius: 8,
        }}
      />

      <Pressable
        onPress={() => fetchApi(inputText)}
        style={{ justifyContent: "center", marginTop: 16, backgroundColor: '#9999CC', height: 50, alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Call</Text>
      </Pressable>


      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 8 }}>
        <Pressable onPress={() => Linking.openURL('https://youglish.com/pronounce/' + inputText + '/english?')} >
          <Text>YOUGLISH</Text>
        </Pressable>
        <Pressable>
          <Text>I LEARNED</Text>
        </Pressable>

      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  );
}

export default App;
