import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import '../utilities';
import TripDisplay from '../components/TripDisplay';
import WeatherDisplay from '../components/WeatherDisplay';

const Display = ({route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [closestBeaches, setClosestBeaches] = useState({
    closestBeaches: [],
  });
  const [forecasts, setForecasts] = useState({
    forecast1: '',
    forecast2: '',
    forecast3: '',
    forecast4: '',
    forecast5: '',
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
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          'There was an error retrieving closest beaches from server: ',
          error,
        );
      });
  }, [Lat, Lng, searchBeaches]);

  const callServerWeather = useCallback(() => {
    axios
      .post('https://mes-personal-site.herokuapp.com/api/v1/get-weather', {
        fiveBeaches: closestBeaches.closestBeaches,
      })
      .then((response) => {
        console.log('Weather Response: ', response);
        setForecasts({
          forecast1: response.data.data[0],
          forecast2: response.data.data[1],
          forecast3: response.data.data[2],
          forecast4: response.data.data[3],
          forecast5: response.data.data[4],
        });
      });
  }, [closestBeaches]);

  useEffect(() => {
    callServerBeaches();
  }, [callServerBeaches]);
  useEffect(() => {
    if (!isLoading) {
      callServerWeather();
    }
  }, [isLoading, callServerWeather]);

  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text style={styles.textItem}>
          Click for Navigation-Directions via Google maps
        </Text>

        <TripDisplay
          beachProps={closestBeaches}
          userCoords={route.params.userCoords}
        />
        <WeatherDisplay forecastProps={forecasts} />
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'pink',
  },
  textItem: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Modak',
  },
  ListItem: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Display;
