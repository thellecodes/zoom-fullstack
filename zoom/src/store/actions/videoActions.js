import IO from 'socket.io-client';
import Peer from 'react-native-peerjs';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {ID} from './authActions';

/** Web RTC */
import {mediaDevices} from 'react-native-webrtc';

//** API_URI */
export const API_URI = `http://192.168.254.243:5000`;

const peerServer = new Peer(undefined, {
  secure: false,
  config: {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
  },
});

peerServer.on('error', console.log);

//** Socket Config */
export const socket = IO(`${API_URI}`, {
  forceNew: true,
});

socket.on('connection', () => console.log('Connection'));

export const joinGeneralRoom = () => async (dispatch) => {
  socket.emit('join-general-room', 'ajsdflajslkdfuaisfjwioerwqiheriyqw87ery');
};

export const userJoin = () => async (dispatch, getState) => {};

// Stream Actions
export const joinStream = (stream) => async (dispatch, getState) => {};

export const disconnect = () => async () => {
  // peerServer.disconnect();
};

export const stream = () => async (dispatch) => {
  let isFront = true;
  mediaDevices.enumerateDevices().then((sourceInfos) => {
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if (
        sourceInfo.kind == 'videoinput' &&
        sourceInfo.facing == (isFront ? 'front' : 'environment')
      ) {
        videoSourceId = sourceInfo.deviceId;
      }
    }

    mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          mandatory: {
            minWidth: 500,
            minHeight: 300,
            minFrameRate: 30,
          },
          facingMode: isFront ? 'user' : 'environment',
          optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
        },
      })
      .then((stream) => {
        dispatch(joinStream(stream));
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
