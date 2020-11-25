import React, {useEffect} from 'react';
import {View, Dimensions, FlatList, Image, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');

import {RTCView} from 'react-native-webrtc';
import {disconnect, stream} from '../store/actions/videoActions';

const calls = [
  {src: require('../assets/call1.jpg')},
  {src: require('../assets/call2.jpg')},
  {src: require('../assets/call3.jpg')},
  {src: require('../assets/call4.jpg')},
];

export default function GroupCallScreen({navigation, route}) {
  const dispatch = useDispatch();
  const {streams} = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(stream());

    return () => {
      dispatch(disconnect());
    };
  }, []);

  return (
    <View style={{backgroundColor: '#fff', flex: 1, alignItems: 'center'}}>
      <View
        height={height * 0.07}
        style={{
          alignItems: 'center',
          paddingTop: 10,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '900',
            textTransform: 'uppercase',
            color: '#2D8CFF',
          }}>
          Group call screen
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        showsVerticalScrollIndicator={false}
        data={streams}
        numColumns={2}
        renderItem={({item: {name, stream}}) => {
          return (
            <>
              <CallList {...{stream}} />
            </>
          );
        }}
        keyExtractor={() => Math.random().toString(36).slice(2).toString()}
      />
    </View>
  );
}

function CallList({src, stream, user}) {
  return (
    <View style={{paddingHorizontal: 10, marginBottom: 10, paddingTop: 10}}>
      <View
        style={{
          backgroundColor: '#2D8CFF',
          width: width * 0.45,
          height: height * 0.33,
          borderRadius: 10,
          position: 'relative',
        }}>
        <RTCView
          streamURL={stream.toURL()}
          style={{...StyleSheet.absoluteFillObject}}
          objectFit="cover"
        />

        <Button
          style={{
            backgroundColor: '#2D8CFF',
            borderRadius: 50,
            position: 'absolute',
            top: 10,
            right: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              textTransform: 'uppercase',
              fontWeight: '700',
              fontSize: 10,
            }}>
            Mute
          </Text>
        </Button>
      </View>
    </View>
  );
}
