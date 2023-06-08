import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import ServoPrimero from './servoPrimero';
import ServoSegundo from './servoSegundo';
import RelePrimero from './relePrimero';
import ReleSegundo from './releSegundo';
import AcercaDe from './AcercaDe';


export default function ActuadoresDomesticos() {      
      const navigation = useNavigation();
    const options = ['Servo1', 'Servo2' ];
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handlePress = (option) => {
    setSelectedOption(option);
    setIsVisible(false);
    // Navigate to the desired screen based on the selected option
    if (option === 'Servo1') {
      navigation.navigate('ServoPrimero');
    } else if (option === 'Servo2') {
      navigation.navigate('ServoSegundo');
    } 
    // Add more conditionals for additional screens if needed
  };
    const navigationRele = useNavigation();
    const optionsRele = ['Rele1', 'Rele2' ];
  const [isVisibleRele, setIsVisibleRele] = useState(false);
  const [selectedOptionRele, setSelectedOptionRele] = useState(null);

  const handlePressRele = (optionRele) => {
    setSelectedOptionRele(optionRele);
    setIsVisibleRele(false);
    // Navigate to the desired screen based on the selected option
    if (optionRele === 'Rele1') {
      navigationRele.navigate('RelePrimero');
    } else if (optionRele === 'Rele2') {
      navigationRele.navigate('ReleSegundo');
    } 
    // Add more conditionals for additional screens if needed
  };


  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actuadores</Text>
      <Text style={styles.subtitle}>Servomotores</Text>
      <View style={styles.row}>
<View style={styles.containerCombo}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.buttonText}>
          {selectedOption || 'Elija un Servomotor'}
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
      <Text style={styles.subtitle}>Reles</Text>
      <View style={styles.row}>

        <View style={styles.containerCombo}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsVisibleRele(true)}
      >
        <Text style={styles.buttonText}>
          {selectedOptionRele || 'Elija un Relé'}
        </Text>
        
      </TouchableOpacity>
      <Modal visible={isVisibleRele} transparent>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setIsVisibleRele(false)}
        >
          <View style={styles.modalContent}>
            {optionsRele?.map((optionRele, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handlePressRele(optionRele)}
              >
                <Text style={styles.optionText}>{optionRele}</Text>
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

/*
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
});
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 40,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    padding: 40,
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 40,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    padding: 40,
  },
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
  }
});