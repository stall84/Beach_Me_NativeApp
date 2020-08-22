<script src="http://localhost:8097"></script>;
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Geocode from 'react-geocode';
import Config from 'react-native-config';

const apiKey = Config.GOOGLE_API_KEY;

const Landing = ({navigation}) => {
  // Initializing our state hook setting initial values to empty strings
  const [coords, setCoords] = useState({lat: '', lng: ''});
  const [geoField, setGeoField] = useState({lat: '', lng: ''});
  const [value1, setValue1] = useState('');
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
    });
  }, []);
  const getGeoCodeData = useCallback(() => {
    console.log('api-key: ' + apiKey);
    console.log('input coords: ', coords);
    Geocode.setApiKey(Config.GOOGLE_API_KEY);
    Geocode.setLanguage('en');
    Geocode.fromAddress(value1).then((response) => {
      const {lat, lng} = response.results[0].geometry.location;
      setCoords({
        lat: lat,
        lng: lng,
      });
      setGeoField({
        lat: lat,
        lng: lng,
      });
    });
  }, [coords, value1]);
  const callBeachDB = useCallback(() => {
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
        console.log('Response from POST call to backend: ', response);
      });
  }, [coords.lat, coords.lng]);

  // const queryDB = () => {
  //   axios
  //     .post('https://mes-personal-site.herokuapp.com/api/v1/beaches', {
  //       lat: coords.lat,
  //       lng: coords.lng,
  //     })
  //     .then((response) => {
  //       console.log('Response from POST call to backend: ', response);
  //       setDbBeaches({
  //         searchBeaches: response.data.data,
  //       });
  //       console.log('dbBeaches Hook: ', dbBeaches);
  //     });
  // };
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
        onPress={() =>
          navigation.push('Display-Beaches', {
            userCoords: {
              Lat: coords.lat,
              Lng: coords.lng,
            },
          })
        }>
        <Text style={styles.buttonText}>Press To Get Beached</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.stateDisp}>
          Lat: {coords.lat}
          Lng: {coords.lng}
        </Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={value1}
            onChangeText={setValue1}
            onSubmitEditing={getGeoCodeData}
            placeholder="Enter City or Zip"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={callBeachDB}>
          <Text>Call Backend</Text>
        </TouchableOpacity>
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
  formContainer: {
    marginTop: 40,
    height: 44,
    backgroundColor: 'white',
  },
  input: {
    textAlign: 'center',
    borderWidth: 1,
    height: 44,
    borderColor: 'grey',
    padding: 5,
  },
});

export default Landing;
