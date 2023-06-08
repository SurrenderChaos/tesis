import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import firebase from 'firebase';
// Initialize Firebase


export default function GraficarBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = firebase.database().ref('angulo_servo');
        ref.on('value', (snapshot) => {
          const value = snapshot.val();
          const newData = [{ value }];
          setData(newData);
        });
      } catch (error) {
        console.log('Error fetching value from Firebase:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: ['angulo_servo'],
          datasets: [{ data }],
        }}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(1, 0, 0, ${opacity})`,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
