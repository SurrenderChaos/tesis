import { View, Text,  Switch } from 'react-native';
import React, { useState, useEffect, Component } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from './database/firebase';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as d3 from 'd3';

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
  return luz;        
}




class BarChartExample extends React.PureComponent {

  
    render() {
        const fill = 'rgb(134, 65, 244)'
        const data = [19,Temper(),17]
         const contentInset = { top: 100, bottom: 100 }


        return (
          <View>
            
            <BarChart style={{ height: 90 }} data={data} svg={{ fill }} contentInset={{ top: 10, bottom: 10 }} spacing={0.2} gridMin={0}>
                <Grid direction={Grid.Direction.HORIZONTAL} />
            </BarChart>
            <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={data}
                    //formatLabel={(value, index) => index}
                    contentInset={{ left: 100, right: 100 }}
                    //svg={{ fontSize: 30, fill: 'black' }}
                />
                        <Text>Temperatura: {Temper()}</Text>
                </View>
        )
    }
}

class BarChartExample2 extends React.PureComponent {

  
    render() {
        const fill = 'rgb(134, 65, 244)'
        const data = [1,LuzSensor(),0.5]
         const contentInset = { top: 100, bottom: 100 }


        return (
          <View>
            
            <BarChart style={{ height: 90 }} data={data} svg={{ fill }} contentInset={{ top: 10, bottom: 10 }} spacing={0.2} gridMin={0}>
                <Grid direction={Grid.Direction.HORIZONTAL} />
            </BarChart>
            <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={data}
                    //formatLabel={(value, index) => index}
                    contentInset={{ left: 100, right: 100 }}
                    //svg={{ fontSize: 30, fill: 'black' }}
                />
                        <Text>Luz: {LuzSensor()}</Text>
                </View>
        )
    }
}
const a = new BarChartExample();
const b = new BarChartExample2();






const SensoresTest= () => {


    return (
      // Try setting `justifyContent` to `center`.
      // Try setting `flexDirection` to `row`.
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}>
        <View style={{flex:0.5,width: 380, height: 100, backgroundColor: '#8E7DBE', justifyContent: 'center'}}>
        <Text style={{alignSelf:'center',color:'white'}}>
        SENSORES
        </Text>
        </View>
        <View style={{flex:3, width: 380, height: 100, backgroundColor: '#99C1B9'}}>
          <Text style={{flex:1,alignSelf:'center'}}>
          TEMPERATURA
          </Text>
          <View style={{flex:1, flexDirection:'row', background:'#F1E3D3', justifyContent: 'flex-evenly'}}>
            <Text style={{flex:2,alignSelf:'center', alignSelf:'center'}}>
                Temperatura: {Temper()} grados
            </Text>
            <Button
                
                    title="Automatico"
                    onPress={() => { firebase.database().ref("modo_servo").set(1);  }}
                />
                <Button
                    title="Manual"
                    onPress={() => { firebase.database().ref("modo_servo").set(0);  }}
            />
                        
            
          </View>
          <View style={{flex:2,flexDirection:'row',  alignSelf: 'center'}}>
              {a.render()}
              
          
          
          </View>
        </View>
        
        <View style={{flex:3,width: 380, height: 100, backgroundColor: '#8E7DBE'}}>
          <Text style={{flex:1,alignSelf:'center', color:'white'}}>
          LUZ
          </Text>
          <View style={{flex:1, flexDirection:'row', background:'#99C1B9', justifyContent: 'space-between'}}>
            <Text style={{flex:1,alignSelf:'center',color:'white'}}>
                Sensor Luz: {LuzSensor()}
            </Text>
            <Button
                    title="Automatico"
                    onPress={() => { firebase.database().ref("modo_rele").set(1);  }}
            />
            <Button
                    title="Manual"
                    onPress={() => { firebase.database().ref("modo_rele").set(0);  }}
            />


            
          </View>
          <View style={{flex:2,flexDirection:'row', alignSelf: 'center'}}>
              {b.render()} 
          
          
          </View>
        </View>
        
      </View>
    );
};

export default SensoresTest;