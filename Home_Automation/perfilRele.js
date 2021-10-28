import { View, Text,  Switch} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import React, { useState, useEffect, Component } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from './database/firebase';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as d3 from 'd3';
import { render } from 'react-dom';

class RelojMinutos extends React.Component{
    /*state = {
    curTime: null,
    };*/
    componentWillMount(){ setInterval(function(){ this.setState({ curTime: new Date().toLocaleString() }) }.bind(this), 1000); }
    state = {curTime:new Date().getMinutes()};


    
}
    const primerRelojMinutos = new RelojMinutos();
    class RelojHoras extends React.Component{
    /*state = {
    curTime: null,
    };*/
    componentWillMount(){ setInterval(function(){ this.setState({ curTime: new Date().toLocaleString() }) }.bind(this), 1000); }
    state = {curTime:new Date().getHours()};


    
}
   const primerRelojHoras = new RelojHoras();
       class RelojSegundos extends React.Component{
    /*state = {
    curTime: null,
    };*/
    componentWillMount(){ setInterval(function(){ this.setState({ curTime: new Date().toLocaleString() }) }.bind(this), 1000); }
    state = {curTime:new Date().getSeconds()};


    
}
   const primerRelojSegundos= new RelojSegundos();






const PerfilTest= () => {
    firebase.database().ref("reloj_horas").set(parseInt(primerRelojHoras.state.curTime));
    firebase.database().ref("reloj_minutos").set(parseInt(primerRelojMinutos.state.curTime));
    firebase.database().ref("reloj_segundos").set(parseInt(primerRelojSegundos.state.curTime));
    
    
    const [selectedHora, setSelectedHora] = useState(0);
    const [selectedMinutos, setSelectedMinutos] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);
    const estadoReleHorario= () => {setIsEnabled(isEnabled => !isEnabled); firebase.database().ref("estado_rele_horario").set(isEnabled)};

    useEffect(() => {
    const getValueHora = firebase.database().ref("hora");
    const getValueMinutos= firebase.database().ref("minutos");
    //const getValueRele= firebase.database().ref("estado_rele_manual");
    
    getValueHora.on("value", snapshot => {
      let value = snapshot.val();
      setSelectedHora(value);
    });
    getValueMinutos.on("value", snapshot => {
      let value = snapshot.val();
      setSelectedMinutos(value);
    });
    /*getValueRele.on("value", snapshot => {
      let value = snapshot.val();
      setIsEnabled(value);
    });*/
        


  }, []);


    return (
      // Try setting `justifyContent` to `center`.
      // Try setting `flexDirection` to `row`.
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}>
        <View style={{flex:0.1,width: 380, height: 100, backgroundColor: 'powderblue', justifyContent: 'center'}}>
        <Text style={{alignSelf:'center'}}>
        Perfil Reles
        </Text>
        </View>
        <View style={{flex:0.5, width: 380, height: 100, backgroundColor: 'skyblue'}}>
          <Text style={{flex:0.5,alignSelf:'center'}}>
         Rele #1 
          </Text>
          <View style={{flex:0.5, flexDirection:'row', background:'#a503fc', justifyContent:'center'}}>
            <Text style={{alignSelf:'center', flex:0.5}}>
               Hora Determinada 
            </Text>
            <Text style={{alignSelf:'center', flex:0.5}}>
            </Text>
                                    
            
          </View>
          <View style={{flex:0.5,flexDirection:'row',  alignSelf: 'center'}}>
              
            <Button
                    title="Modo Horario"
                    onPress={() => { firebase.database().ref("activacion_rele_horario").set(true);  }}
            />
            <Button
                    title="Modo Normal"
                    onPress={() => { firebase.database().ref("activacion_rele_horario").set(false);  }}
            />
          
          
          </View>
        </View>
        
        <View style={{flex:1,width: 380, height: 100, backgroundColor: 'steelblue'}}>
          <Text style={{flex:0.5,alignSelf:'center', color:'white'}}>
         Posicion del rele 
          </Text>
          <Switch style={{flex:0.3,alignSelf:'center', color:'white'}}
                trackColor={{ true: "#767577", false: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={estadoReleHorario}
                value={isEnabled}
            />
          
          <View style={{flex:2,flexDirection:'row', alignSelf: 'center'}}>
          
          
          </View>
        </View>
        
      </View>
    );
};

export default PerfilTest;