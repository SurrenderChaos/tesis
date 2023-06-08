import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import firebase from 'firebase';
import PerfilServoPrimero from './perfilServoPrimero';



export default function ReleSegundo() {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {setIsEnabled(isEnabled => !isEnabled); firebase.database().ref("estado_rele_segundo_manual").set(isEnabled)};

 

  return (
   <View style={styles.container}>
      <Text style={styles.title}>Rele 02</Text>
      <Text style={styles.description}>
          Este rele corresponde a una luz en la zona 2
      </Text>
      <View style={styles.row}>
        <Text style={styles.label}>valor rele 2</Text>
        <View >
        <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      </View>
        

        
      </View>
      
      <TouchableOpacity style={styles.button}onPress={() => navigation.navigate("PerfilReleSegundo")}>
        <Text style={styles.buttonText}>Perfil Rele 2</Text>
      </TouchableOpacity>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  description: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 40,
  },
  value: {
    fontSize: 16,
  },
  slider: {
    width: '100%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});