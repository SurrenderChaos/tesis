import { View, Text,  Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState, useEffect, Component } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from './database/firebase';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as d3 from 'd3';

function MoverRele(){
  const [isEnabled, setIsEnabled] = useState(false);
//  const relb = false;
  const toggleSwitch = () => {setIsEnabled(isEnabled => !isEnabled); firebase.database().ref("estado_rele_manual").set(isEnabled)};

  return(
    <View >
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

function MoverServo() {
  const [servo, setServo] = useState(0);
  useEffect(() => {
    const getValue = firebase.database().ref("angulo_servo");
    getValue.on("value", snapshot => {
      let value = snapshot.val();
      setServo(value);
    });
        


  }, []);
  return (
      <View >
      <Text >
          Angulo: {servo}

      </Text>
             

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
        </View>
        
         
  );
}

const ActuadoresTest= () => {


    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}>
        <View style={{flex:0.5,width: 380, height: 100, backgroundColor: 'powderblue', justifyContent: 'center'}}>
        <Text style={{alignSelf:'center'}}>
            ACTUADORES 
        </Text>
        </View>
        <View style={{flex:3, width: 380, height: 100, backgroundColor: 'skyblue'}}>
          <Text style={{flex:0.5,alignSelf:'center'}}>
            Servomotor 
          </Text>
          <View style={{flex:0.5, flexDirection:'row', background:'#a503fc', justifyContent: 'center'}}>
              <Button
                title="Automatico"
                onPress={() => { firebase.database().ref("estadoServo").set(1);  }}
              />
              <Button
                title="Manual"
                onPress={() => { firebase.database().ref("estadoServo").set(0);  }}
              />
              

            
          </View>
          <View style={{flex:0.5,flexDirection:'row',  alignSelf: 'center'}}>
              {MoverServo()}

              
          
          
          </View>
        </View>
        
        <View style={{flex:3,width: 380, height: 100, backgroundColor: 'steelblue'}}>
         <Text style={{flex:0.5,alignSelf:'center', color:'white'}}>
            Rele 
          </Text>
          <View style={{flex:1, flexDirection:'row', background:'#a503fc', justifyContent: 'center'}}>
              {MoverRele()}
            
          </View>
          <View style={{flex:1,flexDirection:'row', alignSelf: 'center'}}>
          
          
          </View>
        </View>
        
      </View>
    );
};

export default ActuadoresTest;