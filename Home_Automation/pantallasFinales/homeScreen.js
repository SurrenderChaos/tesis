import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SensoresDomesticos from './sensores';
import ActuadoresDomesticos from './actuadores';
import AcercaDe from './AcercaDe';
import CustomComboBox from './combobox';
import ServoPrimero from './servoPrimero';
import ServoSegundo from './servoSegundo';
import RelePrimero from './relePrimero';
import ReleSegundo from './releSegundo';
import PerfilServoPrimero from './perfilServoPrimero';
import PerfilRelePrimero from './PerfilRelePrimero';
import PerfilReleSegundo from './perfilReleSegundo';
/*
function MyStack() {
  return(
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
      name="SensoresFinales"
      component={SensoresFinales}
      />

    </HomeStackNavigator.Navigator>
    
    

  )
}*/

export default function HomeScreen() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Automation </Text>
      <Text style={styles.about}>Una aplicación móvil para controlar actuadores domésticos y visualizar sensores</Text>
      <View style={styles.buttonsContainer}>
         
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SensoresDomesticos")}>
          <Text style={styles.buttonText}>Sensores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ActuadoresDomesticos")}>
          <Text style={styles.buttonText}>Actuadores</Text>
        </TouchableOpacity>
        
        
        
        
      </View>
      <TouchableOpacity style={styles.bottomButton}onPress={() => navigation.navigate("AcercaDe")}>
        <Text style={styles.buttonText}>Acerca de</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  about: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});