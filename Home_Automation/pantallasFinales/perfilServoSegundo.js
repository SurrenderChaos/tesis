import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';


export default function PerfilServoSegundo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil Servo Segundo</Text>
      <Text style={styles.subtitle}>Temperatura</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Label 1:</Text>
        {/* Add your combo box component here */}
      </View>
      <Text style={styles.subtitle}>Another Text</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Label 2:</Text>
        {/* Add your combo box component here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
});