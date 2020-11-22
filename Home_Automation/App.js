import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    <div className="litreDisplay">
      <div className="displayValue">
        <span>{temperatura}c</span>
      </div>
    </div>
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
