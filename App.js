import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from './screens/Landing';
import Display from './screens/Display';

// Create the Stack object to route navigation
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Beach-Me" component={Landing} />
        <Stack.Screen name="Display-Beaches" component={Display} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
