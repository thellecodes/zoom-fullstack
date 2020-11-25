import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import store from './src/store';
import 'react-native-gesture-handler';

const AppRedux = () => (
  <Provider {...{store}}>
    <PaperProvider>
      <App />
    </PaperProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppRedux);
