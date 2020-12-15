import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AppRegistry, StyleSheet, View, Text, processColor, Button, Switch  } from "react-native";
import Slider from '@react-native-community/slider';
import firebase from './database/firebase';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import SensoresTest from './sensores';
import ActuadoresTest from './actuadores';

function Temper(){
  const [temperatura, setTemperatura] = useState(0);
  // Listen to changes on the firebase database, specifically the "distance" entry
  useEffect(() => {
    const getValue = firebase.database().ref("temperatura01");
    //al parecer existe diferencia en los datos del firebase por lo que se debe cambiar de datos si da un error con este codigo
    getValue.on("value", snapshot => {
      // Whenever the value changes on the server, it is also reset on the running app through the variable
      let value = snapshot.val();
      setTemperatura(value);
    });

  }, []);
  return temperatura;        
}
function LuzSensor(){
  const [luz, setLuz] = useState(0);
  // Listen to changes on the firebase database, specifically the "distance" entry
  useEffect(() => {
    const getValue = firebase.database().ref("sensor_luz");
    //al parecer existe diferencia en los datos del firebase por lo que se debe cambiar de datos si da un error con este codigo
    getValue.on("value", snapshot => {
      // Whenever the value changes on the server, it is also reset on the running app through the variable
      let value = snapshot.val();
      setLuz(value);
    });

  }, []);
  return temperatura;        
}
class BarChartExample extends React.PureComponent {

  
    render() {
        const fill = 'rgb(134, 65, 244)'
        const data = [1,Temper(),1]
         const contentInset = { top: 100, bottom: 100 }


        return (
          <View>
            <Text>SENSORES</Text>
            
            <BarChart style={{ height: 400 }} data={data} svg={{ fill }} contentInset={{ top: 10, bottom: 10 }} spacing={0.2} gridMin={0}>
                <Grid direction={Grid.Direction.HORIZONTAL} />
            </BarChart>
            <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={data}
                    formatLabel={(value, index) => index}
                    contentInset={{ left: 100, right: 100 }}
                    svg={{ fontSize: 30, fill: 'black' }}
                />
                        <Text>Temperatura: {Temper()}</Text>
                </View>
        )
    }
}


 
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

 

function Sensores(){
  const [temperatura, setTemperatura] = useState(0);
  // Listen to changes on the firebase database, specifically the "distance" entry
  useEffect(() => {
    const getValue = firebase.database().ref("temperatura01");
    //al parecer existe diferencia en los datos del firebase por lo que se debe cambiar de datos si da un error con este codigo
    getValue.on("value", snapshot => {
      // Whenever the value changes on the server, it is also reset on the running app through the variable
      let value = snapshot.val();
      setTemperatura(value);
    });
        

  }, []);
const a = new BarChartExample();
  return (
    a.render()

    
   );
}


function Actuadores() {
  const [servo, setServo] = useState(0);
  useEffect(() => {
    const getValue = firebase.database().ref("angulo_servo");
    getValue.on("value", snapshot => {
      let value = snapshot.val();
      setServo(value);
    });
        


  }, []);
  return (
    
    <View style={styles.container}>
              <Text>{servo} grados </Text>
       

         <Slider
           style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={180}
          step={10}
          minimumTrackTintColor="#FFFF00"
          maximumTrackTintColor="#00FF00"
         //   value={this.state.value}
         //    onValueChange= {() => firebase.database().ref("servo01").set(value)}
          value={servo}
          onValueChange={(servo) => firebase.database().ref("angulo_servo").set(servo)}
        />
        <View> 

        </View>
         
    </View>
  );
}

function MoverServo(){
  const [isEnabled, setIsEnabled] = useState(false);
//  const relb = false;
  const toggleSwitch = () => {setIsEnabled(isEnabled => !isEnabled); firebase.database().ref("estado_rele_manual").set(isEnabled)};

  return(
    <View style={styles.container}>
      <Button
        title="Automatico"
        onPress={() => { firebase.database().ref("modo_rele").set(1);  }}
      />
      <Button
        title="Manual"
        onPress={() => { firebase.database().ref("modo_rele").set(0);  }}
      />
       <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

    </View>

  );
}
const Tab = createBottomTabNavigator();

 export default function App() {
  // Define the state of the component
/*const [servo, setServo] = useState(0);
  useEffect(() => {
    const getValue = firebase.database().ref("dato01");
    getValue.on("value", snapshot => {
      let value = snapshot.val();
      setServo(value);
    });
        


  }, []);

  const [temperatura, setTemperatura] = useState(0);
  // Listen to changes on the firebase database, specifically the "distance" entry
  useEffect(() => {
    const getValue = firebase.database().ref("temperatura01");
    //al parecer existe diferencia en los datos del firebase por lo que se debe cambiar de datos si da un error con este codigo
    getValue.on("value", snapshot => {
      // Whenever the value changes on the server, it is also reset on the running app through the variable
      let value = snapshot.val();
      setTemperatura(value);
    });
        


  }, []);*/

  


  return (
     <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Sensores" component={Sensores} />
        <Tab.Screen name="Actuadores" component={Actuadores} />
        <Tab.Screen name="MoverServo" component={MoverServo} />
        <Tab.Screen name="SensorTest" component={SensoresTest} />
        <Tab.Screen name="ActuadoresTest" component={ActuadoresTest} />

      </Tab.Navigator>
    </NavigationContainer>
      

      
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
