import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const WeatherDisplay = ({forecastProps}) => {
  const {forecastArray} = forecastProps;
  return (
    <View style={styles.container}>
      <Text>WEATHER</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30bad9',
  },
});

export default WeatherDisplay;
