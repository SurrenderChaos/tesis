import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AppRegistry, StyleSheet, View, Text } from "react-native";
import Slider from '@react-native-community/slider';
import firebase from './database/firebase'


export default function App() {
  // Define the state of the component
  const [temperatura, setTemperatura] = useState(0);

  // Listen to changes on the firebase database, specifically the "distance" entry
  useEffect(() => {
    const getValue = firebase.database().ref("temperatura01");
    getValue.on("value", snapshot => {
      let value = snapshot.val();
      // Whenever the value changes on the server, it is also reset on the running app through the variable
      setTemperatura(value.toFixed(2));
    });
  }, []);

  return (

      <View style={styles.container}>
         <Slider
    style={{width: 200, height: 40}}
    minimumValue={0}
    maximumValue={180}
    step={10}
    minimumTrackTintColor="#FFFF00"
    maximumTrackTintColor="#00FF00"
 //   value={this.state.value}
//    onValueChange= {() => firebase.database().ref("servo01").set(value)}
    value={temperatura}
     onValueChange={(value) => firebase.database().ref("servo01").set({value})}
  />
    <Text>slider con valor de temperatura para probar: {temperatura}</Text>
    <Text>Temperatura: {temperatura}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
