import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Display = () => {
  return (
    <View style={styles.container}>
      <Text>THIS WILL BE THE DISPLAY PAGE</Text>
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
