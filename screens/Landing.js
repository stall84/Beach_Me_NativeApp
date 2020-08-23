import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const Landing = ({navigation}) => {
  // Initializing our state hook setting initial values to empty strings
  const [coords, setCoords] = useState({lat: '', lng: ''});
  const [isLoading, setIsLoading] = useState(true);
  const [dbBeaches, setDbBeaches] = useState({searchBeaches: ''});
  // getCoords hook will query the app's built-in geolocator, and then assign those coordinates to current state
  // pass in empty array for hook dependencies so that function only runs once instead of every re-render
  const getCoords = useCallback(() => {
    Geolocation.getCurrentPosition((position) => {
      console.log('Geolocation: ', position);
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setIsLoading(false);
    });
  }, []);
  const callBeachDB = useCallback(() => {
    console.log('Calling Backend for Beaches..');
    axios
      .post('https://mes-personal-site.herokuapp.com/api/v1/beaches', {
        lat: coords.lat,
        lng: coords.lng,
      })
      .then((response) => {
        const searchBeaches = response.data.data;
        setDbBeaches({
          searchBeaches: searchBeaches,
        });
      });
  }, [coords.lat, coords.lng]);

  // useEffect effectively works as a componentDidMount class method in this case calling our
  // getCoords callback function on app-load/initial render. getCoords is also passed in dependencies array.
  useEffect(() => {
    getCoords();
  }, [getCoords]);
  useEffect(() => {
    if (!isLoading) {
      callBeachDB();
    }
  }, [callBeachDB, isLoading]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>BEACH-ME!</Text>
      <Image source={require('./PalmTree.png')} style={styles.palmImage} />
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.button}
          // utilizing navigation prop that was passed in at top to navigate to display-beaches page
          onPress={() =>
            navigation.push('Display-Beaches', {
              userCoords: {
                Lat: coords.lat,
                Lng: coords.lng,
              },
              searchBeaches: dbBeaches.searchBeaches,
            })
          }>
          <Text style={styles.buttonText}>Press To Get Beached</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>Copyright 2020 Michael E Stallings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  palmImage: {
    height: 420,
    width: 400,
  },
  text: {
    fontSize: 52,
    fontFamily: 'Modak',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonView: {
    marginTop: 60,
  },
  button: {
    width: 240,
    alignItems: 'center',
    backgroundColor: '#87CEEB',
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 130,
  },
});

export default Landing;
