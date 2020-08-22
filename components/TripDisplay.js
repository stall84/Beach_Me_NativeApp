import React from 'react';
import {View, Text, StyleSheet, FlatList, Linking} from 'react-native';
import '../utilities';
import {timeConverter} from '../utilities';

const TripDisplay = ({beachProps, userCoords}) => {
  const {closestBeaches, isLoading} = beachProps;
  const {Lat, Lng} = userCoords;
  return (
    <React.Fragment>
      <FlatList
        style={styles.ListArea}
        data={closestBeaches}
        extraData={closestBeaches.isLoading}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => (
          <Text
            style={styles.ListItem}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/dir/?api=1&origin=${Lat},${Lng}&destination=${item.name}&travelmode=driving`,
              )
            }>
            {item.name} :{' '}
            <Text style={styles.TimeText}>{timeConverter(item.dur)}</Text>
          </Text>
        )}
      />
      <View></View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  ListArea: {
    height: 300,
    width: 360,
    marginTop: 10,
    padding: 8,
    backgroundColor: 'white',
  },
  ListItem: {
    fontFamily: 'Modak',
    color: '#db4735',
    fontSize: 28,
    fontWeight: '200',
    textAlign: 'center',
  },
  TimeText: {
    color: 'black',
    fontSize: 28,
    fontWeight: '200',
  },
});

export default TripDisplay;
