import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import {ProgressCircle,  StackedAreaChart, BarChart,LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import firebase from 'firebase';
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

class BarChartExample2 extends React.PureComponent {

  
    render() {
        const fill = 'rgb(134, 65, 244)'
        const data02 = [1,LuzSensor(),0.5]
        const contentInset = { top: 20, bottom: 20 }
        const ultimaPos = Temper().slice(-1)
        const ultimaPosLuz = LuzSensor().slice(-1)
        

        return (
            <View>
              
                
                
                <View>
                
            <View style={{padding:25, height: 300, flexDirection: 'row' }}>
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
                

            </View>
        )
    }
}
class BarChartExample3 extends React.PureComponent {

  
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
                
                
                

            </View>
        )
    }
}
const b = new BarChartExample2();
const c = new BarChartExample3();

export default function SensoresDomesticos() {
  const options = ['RelePrimeroAbrir', 'RelePrimeroCerrar', 'RelePrimeroAutomatico'];
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handlePress = (option) => {
    setSelectedOption(option);
    setIsVisible(false);
    // Navigate to the desired screen based on the selected option
    if (option === 'RelePrimeroAbrir') {
      firebase.database().ref("estado_rele_manual").set(true)
    } else if (option === 'RelePrimeroCerrar') {
      firebase.database().ref("estado_rele_manual").set(false)
    } else if (option === 'RelePrimeroAutomatico') {
      firebase.database().ref("modo_rele").set(1)
    }
    // Add more conditionals for additional screens if needed
  };
  const optionsReleSegundo = ['ReleSegundoAbrir', 'ReleSegundoCerrar', 'ReleSegundoAutomatico'];
  const [isVisibleReleSegundo, setIsVisibleReleSegundo] = useState(false);
  const [selectedOptionReleSegundo, setSelectedOptionReleSegundo] = useState(null);

  const handlePressReleSegundo = (optionReleSegundo) => {
    setSelectedOptionReleSegundo(optionReleSegundo);
    setIsVisibleReleSegundo(false);
    // Navigate to the desired screen based on the selected option
    if (optionReleSegundo === 'ReleSegundoAbrir') {
      firebase.database().ref("estado_rele_segundo_manual").set(true)
    } else if (optionReleSegundo === 'ReleSegundoCerrar') {
      firebase.database().ref("estado_rele_segundo_manual").set(false)
    } else if (optionReleSegundo === 'ReleSegundoAutomatico') {
      firebase.database().ref("modo_rele_segundo").set(1)
    }
    // Add more conditionals for additional screens if needed
  };

  const optionsServoPrimero= ['ServoPrimeroAbrir', 'ServoPrimeroCerrar', 'ServoPrimeroAutomatico'];
  const [isVisibleServoPrimero, setIsVisibleServoPrimero] = useState(false);
  const [selectedOptionServoPrimero, setSelectedOptionServoPrimero] = useState(null);

  const handlePressServoPrimero= (optionServoPrimero) => {
    setSelectedOptionServoPrimero(optionServoPrimero);
    setIsVisibleServoPrimero(false);
    // Navigate to the desired screen based on the selected option
    if (optionServoPrimero=== 'ServoPrimeroAbrir') {
      firebase.database().ref("angulo_servo").set(180)
    } else if (optionServoPrimero=== 'ServoPrimeroCerrar') {
      firebase.database().ref("angulo_servo").set(0)
    } else if (optionServoPrimero=== 'ServoPrimeroAutomatico') {
      firebase.database().ref("estadoServo").set(1)
    }
    // Add more conditionals for additional screens if needed
  };

  const optionsServoSegundo= ['ServoSegundoAbrir', 'ServoSegundoCerrar', 'ServoSegundoAutomatico'];
  const [isVisibleServoSegundo, setIsVisibleServoSegundo] = useState(false);
  const [selectedOptionServoSegundo, setSelectedOptionServoSegundo] = useState(null);

  const handlePressServoSegundo= (optionServoSegundo) => {
    setSelectedOptionServoSegundo(optionServoSegundo);
    setIsVisibleServoSegundo(false);
    // Navigate to the desired screen based on the selected option
    if (optionServoSegundo=== 'ServoSegundoAbrir') {
      firebase.database().ref("angulo_servo_segundo").set(180)
    } else if (optionServoSegundo=== 'ServoSegundoCerrar') {
      firebase.database().ref("angulo_servo_segundo").set(0)
    } else if (optionServoSegundo=== 'ServoSegundoAutomatico') {
      firebase.database().ref("estadoServoSegundo").set(1)
    }
    // Add more conditionals for additional screens if needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensores</Text>
      <Text style={styles.subtitle}>Temperatura</Text>
      <View style={styles.row}>
        <View>
            {b.render()}
            
        </View>

        <View style={styles.containerCombo}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisibleServoPrimero(true)}
      >
        <Text style={styles.buttonText}>
          {selectedOptionServoPrimero|| 'Select an option'}
        </Text>
        
      </TouchableOpacity>
      <Modal visible={isVisibleServoPrimero} transparent>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setIsVisibleServoPrimero(false)}
        >
          <View style={styles.modalContent}>
            {optionsServoPrimero?.map((optionServoPrimero, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handlePressServoPrimero(optionServoPrimero)}
              >
                <Text style={styles.optionText}>{optionServoPrimero}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
        {/* Add your combo box component here */}
      </View>
      <View style={styles.row}>
        <View style={styles.containerCombo}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisibleServoSegundo(true)}
      >
        <Text style={styles.buttonText}>
          {selectedOptionServoSegundo|| 'Select an option'}
        </Text>
        
      </TouchableOpacity>
      <Modal visible={isVisibleServoSegundo} transparent>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setIsVisibleServoSegundo(false)}
        >
          <View style={styles.modalContent}>
            {optionsServoSegundo?.map((optionServoSegundo, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handlePressServoSegundo(optionServoSegundo)}
              >
                <Text style={styles.optionText}>{optionServoSegundo}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
        {/* Add your combo box component here */}
      </View>
      <Text style={styles.subtitle}>Luz</Text>
      <View style={styles.row}>
                {c.render()}
        <View style={styles.containerCombo}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.buttonText}>
          {selectedOption || 'Select an option'}
        </Text>
        
      </TouchableOpacity>
      <Modal visible={isVisible} transparent>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modalContent}>
            {options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handlePress(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
        {/* Add your combo box component here */}
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Label 7:</Text>
        <View style={styles.containerCombo}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisibleReleSegundo(true)}
      >
        <Text style={styles.buttonText}>
          {selectedOptionReleSegundo || 'Select an option'}
        </Text>
        
      </TouchableOpacity>
      <Modal visible={isVisibleReleSegundo} transparent>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setIsVisibleReleSegundo(false)}
        >
          <View style={styles.modalContent}>
            {optionsReleSegundo?.map((optionReleSegundo, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handlePressReleSegundo(optionReleSegundo)}
              >
                <Text style={styles.optionText}>{optionReleSegundo}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
        {/* Add your combo box component here */}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  containerCombo: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 5,
    padding: 10,
  },
  optionButton: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    padding: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 20
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    padding: 20
  },
});