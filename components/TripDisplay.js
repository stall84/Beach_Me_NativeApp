import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import '../utilities';

const TripDisplay = (beachProps) => {
  return (
    <FlatList
      style={styles.ListArea}
      data={closestBeaches.closestBeaches}
      extraData={closestBeaches.isLoading}
      keyExtractor={(item) => item.name}
      renderItem={({item}) => (
        <Text style={styles.ListItem}>
          {item.name} : {timeConverter(item.dur)}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  ListArea: {
    height: 400,
    width: 360,
    marginTop: 10,
    padding: 8,
    backgroundColor: 'white',
  },
  ListItem: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
