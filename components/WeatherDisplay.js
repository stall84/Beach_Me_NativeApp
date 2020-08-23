import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

const WeatherDisplay = ({forecastProps}) => {
  const {forecast1, forecast2, forecast3, forecast4, forecast5} = forecastProps;

  if (forecast1 === '') {
    return null;
  } else {
    return (
      <React.Fragment>
        <Text style={styles.titleText}>RESPECTIVE DAILY WEATHER FORECASTS</Text>
        <ScrollView>
          <View style={styles.wxImageContainer}>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast1.list[0].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast1.list[12].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast1.list[24].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast1.list[36].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
          </View>
          <View style={styles.wxImageContainer}>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast2.list[0].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast2.list[12].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast2.list[24].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast2.list[36].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
          </View>
          <View style={styles.wxImageContainer}>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast3.list[0].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast3.list[12].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast3.list[24].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast3.list[36].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
          </View>
          <View style={styles.wxImageContainer}>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast4.list[0].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast4.list[12].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast4.list[24].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast4.list[36].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
          </View>
          <View style={styles.wxImageContainer}>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast5.list[0].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast5.list[12].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast5.list[24].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast5.list[36].weather[0].icon}.png`,
              }}
              style={styles.wxImage}
            />
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
};

const styles = StyleSheet.create({
  wxImageContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#87CEEB',
  },
  titleText: {
    fontFamily: 'Modak',
    fontSize: 20,
  },
  wxImage: {
    width: 95,
    height: 80,
  },
});

export default WeatherDisplay;
