import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SensoresDomesticos from './sensores';
import ActuadoresDomesticos from './actuadores';
import AcercaDe from './AcercaDe';

export default function CustomComboBox() {
      const navigation = useNavigation();
    const options = ['Option 1', 'Option 2', 'Option 3'];
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handlePress = (option) => {
    setSelectedOption(option);
    setIsVisible(false);
    // Navigate to the desired screen based on the selected option
    if (option === 'Option 1') {
      navigation.navigate('ActuadoresDomesticos');
    } else if (option === 'Option 2') {
      navigation.navigate('AcercaDe');
    } else if (option === 'Option 3') {
      navigation.navigate('ActuadoresDomesticos');
    }
    // Add more conditionals for additional screens if needed
  };

  

  return (
      <View>
          <View style={styles.container}>
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
    <View style={styles.container}>
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

      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
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
