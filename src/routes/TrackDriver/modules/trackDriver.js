import update from 'react-addons-update';
import { Dimensions } from 'react-native';

import { Constants, Location, Permissions } from 'expo';

import calculateFare from '../../../utils/fareCalculator';

// Constants
import {
  GET_CURRENT_LOCATION,
  GET_DRIVER_INFORMATION,
  GET_DRIVER_LOCATION,
  GET_DISTANCE_FROM_DRIVER
} from './actionConstants';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

// ===========  ===========  ===========  ===========
//                  Actions
// ===========  ===========  ===========  ===========
export const getCurrentLocation = () => async dispatch => {
  try {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permssion to access Location was denied'
      });
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    });

    dispatch({
      type: GET_CURRENT_LOCATION,
      payload: location
    });
  } catch (error) {
    console.error('GET Current Location FAILURE ❌', error);
  }
};

export const getDriverInfo = () => (dispatch, store) => {
  let id = store().home.booking.driverId;
  console.log('ID', id);
  fetch(`http://localhost:3000/api/driver/${id}`)
    .then(res => res.json())
    .then(res => dispatch({ type: GET_DRIVER_INFORMATION, payload: res }))
    .catch(err =>
      console.error(`FAILED GETTING DRIVER INFO ❌  ${err.message}`)
    );
};

export const getDriverLocation = () => (dispatch, store) => {
  let id = store().home.booking.driverId;
  fetch(`http://localhost:3000/api/driverLocation/${id}`)
    .then(res => res.json())
    .then(res => dispatch({ type: GET_DRIVER_LOCATION, payload: res }))
    .catch(err =>
      console.error(`FAILED GETTING DRIVER LOCATION ❌  ${err.message}`)
    );
};

export const getDistanceFromDriver = () => (dispatch, store) => {
  const { selectedPickUp, selectedDropOff } = store().home.selectedAddress;

  if (store().trackDriver.driverLocation) {
    let DISTANCEMATRIX = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
      selectedPickUp.formatted_address
    }&destinations=${
      selectedDropOff.formatted_address
    }&mode="DRIVING"&key=AIzaSyDewkHCvIGDqfU3a9UZr_tKWFRAjdaHlZQ`;

    fetch(DISTANCEMATRIX)
      .then(res => res.json())
      .then(res => dispatch({ type: GET_DISTANCE_FROM_DRIVER, payload: res }))
      .catch(err =>
        console.error(
          `FAILED FETCHING GETTING DISTANCE FROM DRIVER ❌ ${err.message}`
        )
      );
  }
};

// ===========  ===========  ===========  ===========
//                  Action handlers
// ===========  ===========  ===========  ===========
const handleGetCurrentLocation = (state, action) =>
  update(state, {
    region: {
      latitude: {
        $set: action.payload.coords.latitude
      },
      longitude: {
        $set: action.payload.coords.longitude
      },
      latitudeDelta: {
        $set: LATITUDE_DELTA
      },
      longitudeDelta: {
        $set: LONGITUDE_DELTA
      }
    }
  });

const handleGetDriverInfo = (state, action) =>
  update(state, {
    driverInfo: { $set: action.payload }
  });

const handleUpdateDriverLocation = (state, action) =>
  update(state, {
    driverLocation: { $set: action.payload }
  });

const handleGetDriverLocation = (state, action) =>
  update(state, {
    driverLocation: { $set: action.payload },
    showDriverFound: { $set: false },
    showCarMarker: { $set: true }
  });

const handleGetDistanceFromDriver = (state, action) =>
  update(state, {
    distanceFromDriver: {
      $set: action.payload
    }
  });

const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_DRIVER_INFORMATION: handleGetDriverInfo,
  UPDATE_DRIVER_LOCATION: handleUpdateDriverLocation,
  GET_DRIVER_LOCATION: handleGetDriverLocation,
  GET_DISTANCE_FROM_DRIVER: handleGetDistanceFromDriver
};
const initialState = {
  region: {},
  showDriverFound: true
};

export function TrackDriverReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
