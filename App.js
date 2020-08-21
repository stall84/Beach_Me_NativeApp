import 'react-native-gesture-handler';
import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  const [coords, setCoords] = useState({lat: '', lng: ''});

  const getCoords = useCallback(() => {
    Geolocation.getCurrentPosition((position) => {
      console.log('Geolocation: ', position);
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    getCoords();
  }, [getCoords]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Beach-Go'ers!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Press To Get Beached</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.stateDisp}>
          Lat: {coords.lat}
          Lng: {coords.lng}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 40,
    flex: 1,
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 38,
    fontFamily: 'Modak',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#87CEEB',
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  stateDisp: {
    marginTop: 80,
    padding: 20,
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default App;
