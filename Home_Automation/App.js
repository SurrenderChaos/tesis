import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AppRegistry, StyleSheet, View, Text, processColor  } from "react-native";
import Slider from '@react-native-community/slider';
import firebase from './database/firebase';
import { BarChart, Grid } from 'react-native-svg-charts'


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
class BarChartExample extends React.PureComponent {

  
    render() {
        const fill = 'rgb(134, 65, 244)'
        const data = [1,Temper(),1]

        return (
            <BarChart style={{ height: 200 }} data={data} svg={{ fill }} contentInset={{ top: 50, bottom: 30 }}>
                <Grid />
            </BarChart>
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
    const getValue = firebase.database().ref("dato01");
    getValue.on("value", snapshot => {
      let value = snapshot.val();
      setServo(value);
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
          value={servo}
          onValueChange={(servo) => firebase.database().ref("dato01").set(servo)}
        />
        <Text>{servo} grados </Text>
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
