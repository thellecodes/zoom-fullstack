import {LOGIN_SUCCESS, REGISTER_SUCCESS} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = ({email, password}) => async (dispatch) => {};

// AsyncStorage.clear();
export const setUser = (email, password) => async (dispatch) => {};

// Load a user from async storage
export const loadUser = () => async (dispatch) => {};

export function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
