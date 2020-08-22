import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import axios from 'axios';
import '../utilities';
import {timeConverter} from '../utilities';
import TripDisplay from '../components/TripDisplay';
import WeatherDisplay from '../components/WeatherDisplay';

const Display = ({route}) => {
  const [closestBeaches, setClosestBeaches] = useState({
    closestBeaches: [],
    isLoading: true,
  });
  const [forecasts, setForecasts] = useState({
    forecastArray: [],
  });
  const {Lat, Lng} = route.params.userCoords;
  const searchBeaches = route.params.searchBeaches;

  const callServerBeaches = useCallback(() => {
    axios
      .post('https://mes-personal-site.herokuapp.com/api/v1/get-trips', {
        // formatting our request body with key 'reduxlat/lng'. This is merely because the server controller is set up
        // to receive from that key-name, as on our web-app project we used redux.
        reduxLat: Lat,
        reduxLng: Lng,
        searchBeaches: searchBeaches,
      })
      .then((response) => {
        console.log('Response after Google Query: ', response);
        setClosestBeaches({
          closestBeaches: response.data.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(
          'There was an error retrieving closest beaches from server: ',
          error,
        );
      });
  }, []);

  // const callServerWeather = useCallback(async () => {
  //   await axios
  //     .post('https://mes-personal-site.herokuapp.com/api/v1/get-weather', {
  //       fiveBeaches: closestBeaches.closestBeaches,
  //     })
  //     .then((response) => {
  //       console.log('Weather Response: ', response);
  //       setForecasts({
  //         forecastArray: response.data,
  //       });
  //     });
  // }, []);

  useEffect(() => {
    callServerBeaches();
  }, []);

  // useEffect(() => {
  //   callServerWeather();
  // }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.textItem}>
        Click for Navigation-Directions via Google maps
      </Text>

      <TripDisplay
        beachProps={closestBeaches}
        userCoords={route.params.userCoords}
      />
      <WeatherDisplay forecastProps={forecasts.forecastArray} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: 'orange',
  },
  textItem: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'Modak',
    fontWeight: 'bold',
  },
  ListItem: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Display;
