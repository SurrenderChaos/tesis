import { StyleSheet, View, Text,  Switch } from 'react-native';
//import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

import React, { useState, useEffect, Component } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from './database/firebase';
import { StackedAreaChart, BarChart,LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { Circle, Path } from 'react-native-svg'

import * as shape from 'd3-shape';

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
        const data01 = [19,Temper(),17]
        const data02 = [1,LuzSensor(),0.5]
        const pos00 = Temper[2]
        const contentInset = { top: 20, bottom: 20 }
        



        


        return (
            <View>
                <View>
            
            <BarChart style={{ height: 90 }} data={Temper()} svg={{ fill }} contentInset={{ top: 10, bottom: 10 }} spacing={0.2} gridMin={0}>
                <Grid direction={Grid.Direction.HORIZONTAL} />
            </BarChart>
            <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={Temper()}
                    //formatLabel={(value, index) => index}
                    contentInset={{ left: 100, right: 100 }}
                    //svg={{ fontSize: 30, fill: 'black' }}
                />
                        <Text>Temperatura: {Temper()}</Text>
                </View>
                <View>
            
            <BarChart style={{ height: 90 }} data={data02} svg={{ fill }} contentInset={{ top: 10, bottom: 10 }} spacing={0.2} gridMin={0}>
                <Grid direction={Grid.Direction.HORIZONTAL} />
            </BarChart>
            <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={data02}
                    //formatLabel={(value, index) => index}
                    contentInset={{ left: 100, right: 100 }}
                    //svg={{ fontSize: 30, fill: 'black' }}
                />
                        <Text>Luz: {LuzSensor()}</Text>
                </View>
                <View>
                
            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={Temper()}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
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
        
                <Text>Temperatura: {Temper()}</Text>


            
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
