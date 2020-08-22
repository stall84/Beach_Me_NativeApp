import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Display = ({route}) => {
  const [searchBeaches, setSearchBeaches] = useState({searchBeaches: ''});
  const {Lat, Lng} = route.params.userCoords;

  return (
    <View style={styles.container}>
      <Text>THIS WILL BE THE DISPLAY PAGE</Text>
      <Text>
        Route Param-Props: Lat: {Lat}, Lng: {Lng}
      </Text>
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
});

export default Display;
