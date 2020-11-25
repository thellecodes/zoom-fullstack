import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {StackActions} from '@react-navigation/native';

const SplashImg = require('../assets/splash.png');

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Login'));
    }, 3000);
  }, []);

  return (
    <View style={{...styles.container}}>
      <Image
        style={{
          width,
          height,
        }}
        source={SplashImg}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
