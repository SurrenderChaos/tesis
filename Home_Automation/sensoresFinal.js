import { StyleSheet, View, Text,  Switch } from 'react-native';
//import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

import React, { useState, useEffect, Component } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from './database/firebase';
import {ProgressCircle,  StackedAreaChart, BarChart,LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { Circle, Path } from 'react-native-svg'

import * as shape from 'd3-shape';


function MoverServo() {
  const [servo, setServo] = useState(0);
  useEffect(() => {
    const getValue = firebase.database().ref("angulo_servo");
    getValue.on("value", snapshot => {
      let value = snapshot.val();
      setServo(value);
    });
        


  }, []);
  return servo;
}

function Temper(){
  const [temperatura, setTemperatura] = useState(0);
  const [searches, setSearches] = useState([]);
  // Listen to changes on the firebase database, specifically the "distance" entry
  useEffect(() => {
  
    const getValue = firebase.database().ref("temperatura01");
    //al parecer existe diferencia en los datos del firebase por lo que se debe cambiar de datos si da un error con este codigo
    getValue.on("value", snapshot => {
      // Whenever the value changes on the server, it is also reset on the running app through the variable
      let value = snapshot.val();
      setSearches(searches => searches.concat(value))

    });

  }, []);
  return searches;        
}
function LuzSensor(){
  const [luz, setLuz] = useState(0);
  const [medicionLuz, setMedicionLuz] = useState([]);
  // Listen to changes on the firebase database, specifically the "distance" entry
  useEffect(() => {
    const getValue = firebase.database().ref("sensor_luz");
    //al parecer existe diferencia en los datos del firebase por lo que se debe cambiar de datos si da un error con este codigo
    getValue.on("value", snapshot => {
      // Whenever the value changes on the server, it is also reset on the running app through the variable
      let value = snapshot.val();
      setMedicionLuz(medicionLuz => medicionLuz.concat(value));
    });

  }, []);
  return medicionLuz;        
}
/*class LineChartExample extends React.PureComponent {
    render() {
        const data = [Temper()]

        return (
            <LineChart
                style={{ height: 200 }}
                data={data}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid />
            </LineChart>
        )
    }
}*/


class BarChartExample2 extends React.PureComponent {

  
    render() {
        const fill = 'rgb(134, 65, 244)'
        const data02 = [1,LuzSensor(),0.5]
        const contentInset = { top: 20, bottom: 20 }
        const ultimaPos = Temper().slice(-1)
        const ultimaPosLuz = LuzSensor().slice(-1)
        

        return (
            <View>
              <View style={{padding:25, height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={LuzSensor()}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 15,
                    }}
                    numberOfTicks={5}
                    formatLabel={(value) => `${value}L`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={LuzSensor()}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={contentInset}
                >
                    <Grid />
                </LineChart>
            </View>
            <Text>Luz: {ultimaPosLuz}</Text>
                
                
                <View>
                
            <View style={{padding:25, height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={Temper()}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 15,
                    }}
                    numberOfTicks={5}
                    formatLabel={(value) => `${value}ºC`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={Temper()}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={contentInset}
                >
                    <Grid />
                </LineChart>
            </View>
        
                <Text>Temperatura: {ultimaPos}</Text>


            
                </View>
                <View>
                  <ProgressCircle
                style={ { height: 200 } }
                progress={ 0.7 }
                progressColor={'rgb(134, 65, 244)'}
                startAngle={0}
                endAngle={(Math.PI/180) * MoverServo()}
            />
                </View>

            </View>
        )
    }
}
const b = new BarChartExample2();
const SensoresFinal= () => {
    return(
        <View>
            {b.render()}
            
        </View>
        

    );
    
};

export default SensoresFinal;
