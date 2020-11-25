import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  BackHandler,
  TextInput,
  Text,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Face = require('../assets/face.png');
const SignIn = require('../assets/SignIn.png');
const Logo = require('../assets/logo.png');

/* Actions */
import {login, register, loadUser} from '../store/actions/authActions';
import {joinGeneralRoom, userJoin} from '../store/actions/videoActions';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flex: 1,
  },
  top: {
    height: height * 0.3,
    position: 'relative',
  },
  bottom: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const onLogin = () => {
    dispatch(login({password, email}));
  };

  const onRegister = () => {
    dispatch(register({email, password}));
  };

  const handleBackButtonClick = () => {
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  useEffect(() => {
    dispatch(joinGeneralRoom());
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    const {isAuthenticated, user} = auth;
    if (isAuthenticated) {
      navigation.dispatch(StackActions.replace('UserList'));
    }
  }, [auth]);

  return (
    <View
      style={{
        ...styles.root,
        justifyContent: 'flex-start',
        flexDirection: 'column',
      }}>
      <View style={{...styles.top}}>
        <Image source={Face} style={{width, height: height * 0.29}} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <Image
            source={SignIn}
            style={{width: 100, height: 100}}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            width: width * 0.7,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <TextInput
            onChangeText={(email) => setEmail(email)}
            defaultValue={email}
            keyboardType="email-address"
            placeholder="Email"
            style={{
              marginBottom: 20,
              borderColor: '#2D8CFF',
              height: 40,
              borderWidth: 1,
              padding: 10,
              borderRadius: 3,
            }}
          />
          <TextInput
            keyboardType="visible-password"
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            defaultValue={password}
            style={{
              marginBottom: 20,
              borderColor: '#2D8CFF',
              height: 40,
              borderWidth: 1,
              padding: 10,
              borderRadius: 3,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Button
            style={{
              backgroundColor: '#2D8CFF',
              height: 30,
              width: width * 0.3,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}
            mode="contained"
            onPress={() => {
              onLogin();
            }}>
            Login
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Image
            source={Logo}
            style={{height: 100, width: 100}}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;
