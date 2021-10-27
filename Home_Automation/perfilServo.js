import { View, Text,  Switch} from 'react-native';
import {Picker} from '@react-native-picker/picker';
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






const PerfilTest2= () => {
    firebase.database().ref("reloj_horas").set(parseInt(primerRelojHoras.state.curTime));
    firebase.database().ref("reloj_minutos").set(parseInt(primerRelojMinutos.state.curTime));
    firebase.database().ref("reloj_segundos").set(parseInt(primerRelojSegundos.state.curTime));
    
    
    const [selectedHora, setSelectedHora] = useState(0);
    const [selectedMinutos, setSelectedMinutos] = useState(0);
    const [servo, setServo] = useState(0);
    

    useEffect(() => {
    const getValue = firebase.database().ref("estado_servo_horario");
    const getValueHora = firebase.database().ref("hora");
    const getValueMinutos= firebase.database().ref("minutos");
    //const getValueRele= firebase.database().ref("estado_rele_manual");
    getValue.on("value", snapshot => {
      let value = snapshot.val();
      setServo(value);
    });
    
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
        Perfil Servos
        </Text>
        </View>
        <View style={{flex:0.5, width: 380, height: 100, backgroundColor: 'skyblue'}}>
          <Text style={{flex:0.5,alignSelf:'center'}}>
         Servo #1 
          </Text>
          <View style={{flex:0.5, flexDirection:'row', background:'#a503fc', justifyContent:'center'}}>
            <Text style={{alignSelf:'center', flex:0.5}}>
               Hora Determinada 
            </Text>
            <Text style={{alignSelf:'center', flex:0.5}}>
            </Text>
            <Picker
                selectedValue={selectedHora}
                onValueChange={(selectedHora) => firebase.database().ref("hora").set(parseInt(selectedHora))}>
                <Picker.Item label="01" value='1'/>
                <Picker.Item label="02" value='2'/>
                <Picker.Item label="03" value='3' />
                <Picker.Item label="04" value='4' />
                <Picker.Item label="05" value='5' />
                <Picker.Item label="06" value='6' />
                <Picker.Item label="07" value='7' />
                <Picker.Item label="08" value='8' />
                <Picker.Item label="09" value='9' />
                <Picker.Item label="10" value='10' />
                <Picker.Item label="11" value='11' />
                <Picker.Item label="12" value='12' />
                <Picker.Item label="13" value='13' />
                <Picker.Item label="14" value='14' />
                <Picker.Item label="15" value='15' />
                <Picker.Item label="16" value='16' />
                <Picker.Item label="17" value='17' />
                <Picker.Item label="18" value='18' />
                <Picker.Item label="19" value='19' />
                <Picker.Item label="20" value='20' />
                <Picker.Item label="21" value='21' />
                <Picker.Item label="22" value='22' />
                <Picker.Item label="23" value='23' />
                <Picker.Item label="24" value='24' />
            </Picker>
            <Picker
                selectedValue={selectedMinutos}
                onValueChange={(selectedMinutos) => firebase.database().ref("minutos").set(parseInt(selectedMinutos))}>
                    <Picker.Item label="01" value='1' />
                <Picker.Item label="02" value='2' />
                <Picker.Item label="03" value='3' />
                <Picker.Item label="04" value='4' />
                <Picker.Item label="05" value='5' />
                <Picker.Item label="06" value='6' />
                <Picker.Item label="07" value='7' />
                <Picker.Item label="08" value='8' />
                <Picker.Item label="09" value='9' />
                <Picker.Item label="10" value='10' />
                <Picker.Item label="11" value='11' />
                <Picker.Item label="12" value='12' />
                <Picker.Item label="13" value='13' />
                <Picker.Item label="14" value='14' />
                <Picker.Item label="15" value='15' />
                <Picker.Item label="16" value='16' />
                <Picker.Item label="17" value='17' />
                <Picker.Item label="18" value='18' />
                <Picker.Item label="19" value='19' />
                <Picker.Item label="20" value='20' />
                <Picker.Item label="21" value='21' />
                <Picker.Item label="22" value='22' />
                <Picker.Item label="23" value='23' />
                <Picker.Item label="24" value='24' />
                <Picker.Item label="25" value='25' />
                <Picker.Item label="26" value='26' />
                <Picker.Item label="27" value='27' />
                <Picker.Item label="28" value='28' />
                <Picker.Item label="29" value='29' />
                <Picker.Item label="30" value='30' />
                <Picker.Item label="31" value='31' />
                <Picker.Item label="32" value='32' />
                <Picker.Item label="33" value='33' />
                <Picker.Item label="34" value='34' />
                <Picker.Item label="35" value='35' />
                <Picker.Item label="36" value='36' />
                <Picker.Item label="37" value='37' />
                <Picker.Item label="38" value='38' />
                <Picker.Item label="39" value='39' />
                <Picker.Item label="40" value='40' />
                <Picker.Item label="41" value='41' />
                <Picker.Item label="42" value='42' />
                <Picker.Item label="43" value='43' />
                <Picker.Item label="44" value='44' />
                <Picker.Item label="45" value='45' />
                <Picker.Item label="46" value='46' />
                <Picker.Item label="47" value='47' />
                <Picker.Item label="48" value='48' />
                <Picker.Item label="49" value='49' />
                <Picker.Item label="50" value='50' />
                <Picker.Item label="51" value='51' />
                <Picker.Item label="52" value='52' />
                <Picker.Item label="53" value='53' />
                <Picker.Item label="54" value='54' />
                <Picker.Item label="55" value='55' />
                <Picker.Item label="56" value='56' />
                <Picker.Item label="57" value='57' />
                <Picker.Item label="58" value='58' />
                <Picker.Item label="59" value='59' />
                <Picker.Item label="60" value='60' />
                
            </Picker>
            
                        
            
          </View>
          <View style={{flex:0.5,flexDirection:'row',  alignSelf: 'center'}}>
              
            <Button
                    title="Modo Horario"
                    onPress={() => { firebase.database().ref("activacion_servo_horario").set(true);  }}
            />
            <Button
                    title="Modo Normal"
                    onPress={() => { firebase.database().ref("activacion_servo_horario").set(false);  }}
            />
          
          
          </View>
        </View>
        
        <View style={{flex:1,width: 380, height: 100, backgroundColor: 'steelblue'}}>
          <Text style={{flex:0.5,alignSelf:'center', color:'white'}}>
         Posicion del servo
          </Text>
          <Text >
          Angulo: {servo}

            </Text>
          
          
          <View style={{flex:2,flexDirection:'row', alignSelf: 'center'}}>
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
          onValueChange={(servo) => firebase.database().ref("estado_servo_horario").set(servo)}
        />

          
          
          </View>
        </View>
        
      </View>
    );
};

export default PerfilTest2;