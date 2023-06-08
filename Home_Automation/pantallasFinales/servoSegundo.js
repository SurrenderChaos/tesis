import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import firebase from 'firebase';
import PerfilServoSegundo from './perfilServoPrimero';
export default function ServoSegundo() {
  const navigation = useNavigation();
 const [servo, setServo] = useState(0);
 const [switchValue, setSwitchValue] = useState(false);
 const handleChange = async (value) => {
    setSwitchValue(value);
    const newValue = value ? 180 : 0;
    try {
      await firebase.database().ref('angulo_servo_segundo').set(newValue);
    } catch (error) {
      console.log('Error actualizando el valor en firebase:', error);
    }
  };
  useEffect(() => {
    const getValue = firebase.database().ref("angulo_servo_segundo");
    getValue.on("value", snapshot => {
      let value = snapshot.val();
      setServo(value);
    });
        


  }, []); 


  return (
   <View style={styles.container}>
      <Text style={styles.title}>Servo 02</Text>
      <Text style={styles.description}>
          Este servomotor corresponde a una puerta
      </Text>
      <View style={styles.row}>
        <Text style={styles.label}>{ servo }</Text>
        <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={switchValue? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleChange}
        value={switchValue}
      />

        
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Posición Manual</Text>
      </View>
      <Slider
           style={styles.slider}
          minimumValue={0}
          maximumValue={180}
          step={10}
          minimumTrackTintColor="#FFFF00"
          maximumTrackTintColor="#00FF00"
         //   value={this.state.value}
         //    onValueChange= {() => firebase.database().ref("servo01").set(value)}
          value={servo}
          onValueChange={(servo) => firebase.database().ref("angulo_servo_segundo").set(servo)}
        />
      <TouchableOpacity style={styles.button}onPress={() => navigation.navigate("PerfilServoSegundo")}>
        <Text style={styles.buttonText}>Perfil Servo 2</Text>
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