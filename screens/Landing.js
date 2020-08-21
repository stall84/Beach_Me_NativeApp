import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const Landing = ({navigation}) => {
  // Initializing our state hook setting initial values to empty strings
  const [coords, setCoords] = useState({lat: '', lng: ''});
  // getCoords hook will query the app's built-in geolocator, and then assign those coordinates to current state
  // pass in empty array for hook dependencies so that function only runs once instead of every re-render
  const getCoords = useCallback(() => {
    Geolocation.getCurrentPosition((position) => {
      console.log('Geolocation: ', position);
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);
  // useEffect effectively works as a componentDidMount class method in this case calling our
  // getCoords callback function on app-load/initial render. getCoords is also passed in dependencies array.
  useEffect(() => {
    getCoords();
  }, [getCoords]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>BEACH-ME!</Text>
      <TouchableOpacity
        style={styles.button}
        // utilizing navigation prop that was passed in at top to navigate to display-beaches page
        onPress={() => navigation.push('Display-Beaches')}>
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
    padding: 20,
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

export default Landing;
