import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import LoginScreen from './src/components/LoginScreen';
import CallScreen from './src/components/CallScreen';
import SplashScreen from './src/components/SplashScreen';
import GroupCallScreen from './src/components/GroupCallScreen';
import UserList from './src/components/UserList';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Splash"
            component={SplashScreen}
          />

          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={LoginScreen}
          />

          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="UserList"
            component={UserList}
          />

          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="GroupCallScreen"
            component={GroupCallScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
