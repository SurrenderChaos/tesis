import { View, Text,  Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState, useEffect, Component } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from './database/firebase';

let actuador = {
    servos: {
            angulo:10,
            modo:false,
            rutinas:[[],[]],
            actualizarAngulo: function () {

            },
            actualizarModo: function (){

            }

    },

    reles: {
            posicion: false,
            modo:false,
            rutinas:[],
            actualizarPosicion: function () {
                const [isEnabled, setIsEnabled] = useState(false);
                const toggleSwitch = () => {setIsEnabled(isEnabled => !isEnabled); firebase.database().ref("actuador.reles.posicion").set(isEnabled)};
            },
            actualizarRutinas: function () {
                const [isEnabled, setIsEnabled] = useState(false);
                const toggleSwitch = () => {setIsEnabled(isEnabled => !isEnabled); firebase.database().ref("actuador.reles.posicion").set(isEnabled)};
            },



    }
};

let sensor = {};
let ubicacion = {};
