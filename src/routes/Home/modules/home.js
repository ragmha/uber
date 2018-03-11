import update from 'react-addons-update';
import { Dimensions } from 'react-native';

import { Constants, Location, Permissions } from 'expo';

import calculateFare from '../../../utils/fareCalculator';

// Constants
import {
  GET_CURRENT_LOCATION,
  GET_INPUT,
  GET_ADDRESS_PREDECTIONS,
  GET_SELECTED_ADDRESS,
  GET_DISTANCE_MATRIX,
  TOGGLE_SEARCH_RESULT,
  GET_FARE,
  BOOK_CAR,
  GET_NEARBY_DRIVERS,
  BOOKING_CONFIRMED
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

// Gets user's input
export const getInputData = payload => ({ type: GET_INPUT, payload });

// Gets addresses from google place
export const getAddressPredictions = () => (dispatch, store) => {
  let userInput = store().home.resultTypes.pickUp
    ? store().home.inputData.pickUp
    : store().home.inputData.dropOff;
  let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${userInput}&components=country:fi&key=AIzaSyDewkHCvIGDqfU3a9UZr_tKWFRAjdaHlZQ`;

  fetch(url)
    .then(res => res.json())
    .then(results =>
      dispatch({
        type: GET_ADDRESS_PREDECTIONS,
        payload: results.predictions
      })
    )
    .catch(error =>
      console.error('ADDRESS PREDICTIONS ERROR ❌', error.message)
    );
};

// Get selected address
export const getSelectedAddress = payload => (dispatch, store) => {
  let PLACEDETAILS = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${payload}&key=AIzaSyDewkHCvIGDqfU3a9UZr_tKWFRAjdaHlZQ`;

  fetch(PLACEDETAILS)
    .then(res => res.json())
    .then(res => dispatch({ type: GET_SELECTED_ADDRESS, payload: res.result }))
    .then(() => {
      // Get the Distance and Time
      let { selectedPickUp, selectedDropOff } = store().home.selectedAddress;

      const dummyObj = {
        baseFare: 0.4,
        timeRate: 0.14,
        distanceRate: 0.97,
        surge: 1
      };

      const dummyNumbers = Object.values(dummyObj);
      if (selectedPickUp && selectedDropOff) {
        let DISTANCEMATRIX = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
          selectedPickUp.formatted_address
        }&destinations=${
          selectedDropOff.formatted_address
        }&mode="DRIVING"&key=AIzaSyDewkHCvIGDqfU3a9UZr_tKWFRAjdaHlZQ`;

        fetch(DISTANCEMATRIX)
          .then(res => res.json())
          .then(res => dispatch({ type: GET_DISTANCE_MATRIX, payload: res }))
          .then(() => {
            let {
              duration,
              distance
            } = store().home.distanceMatrix.rows[0].elements[0];

            const fare = calculateFare(
              ...dummyNumbers,
              duration.value,
              distance.value
            );

            dispatch({ type: GET_FARE, payload: fare });
          });
      }
    })
    .catch(error => console.error('ADDRESS SELECTED ERROR ❌', error.message));
};

// Toggle Search result modal
export const toggleSearchResultModal = payload => ({
  type: TOGGLE_SEARCH_RESULT,
  payload
});

// Book Car
export const bookCar = () => (dispatch, store) => {
  const {
    address: paddress,
    name: pname,
    latitude: platitude,
    longitude: plongitude
  } = store().home.selectedAddress.selectedPickUp;

  const {
    address: daddress,
    name: dname,
    latitude: dlatitude,
    longitude: dlongitude
  } = store().home.selectedAddress.selectedDropOff;

  const { nearByDrivers } = store().home;

  const nearByDriver =
    nearByDrivers[Math.floor(Math.random() * nearByDrivers.length)];

  const payload = {
    data: {
      username: 'raghib',
      pickUp: {
        address: paddress,
        name: pname,
        latitude: platitude,
        longitude: plongitude
      },
      dropOff: {
        address: daddress,
        name: dname,
        latitude: dlatitude,
        longitude: dlongitude
      },
      fare: store().home.fare,
      status: 'pending'
    },
    nearByDriver: {
      socketId: nearByDriver.socketID,
      driverId: nearByDriver.driverID,
      latitude: nearByDriver.coordinate.coordinates[1],
      longitude: nearByDriver.coordinate.coordinates[0]
    }
  };

  const BOOKINGS = 'http://localhost:3000/api/bookings';
  fetch(BOOKINGS, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => res.json())
    .then(res => dispatch({ type: BOOK_CAR, payload: res }))
    .catch(err => console.error('BOOK CAR ERROR ❌', err.message));
};

// Get nearby Drivers
export const getNearByDrivers = () => (dispatch, store) => {
  const { latitude, longitude } = store().home.region;
  fetch(
    `http://localhost:3000/api/driverLocation?latitude=${latitude}&longitude=${longitude}`
  )
    .then(res => res.json())
    .then(res => dispatch({ type: GET_NEARBY_DRIVERS, payload: res }))
    .catch(err => console.error('GET NEARBY DRIVERS ERROR ❌', err));
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

const handleGetInputData = (state, action) => {
  const { key, value } = action.payload;
  return update(state, {
    inputData: {
      [key]: {
        $set: value
      }
    }
  });
};
const handleGetAddressPredictions = (state, action) =>
  update(state, {
    predictions: {
      $set: action.payload
    }
  });
const handleGetSelectedAddress = (state, action) => {
  let selectedTitle = state.resultTypes.pickUp
    ? 'selectedPickUp'
    : 'selectedDropOff';

  return update(state, {
    selectedAddress: {
      [selectedTitle]: {
        $set: action.payload
      }
    },
    resultTypes: {
      pickUp: { $set: false },
      dropOff: { $set: false }
    }
  });
};
const handleGetDistanceMatrix = (state, action) =>
  update(state, {
    distanceMatrix: {
      $set: action.payload
    }
  });

const handleGetFare = (state, action) =>
  update(state, {
    fare: {
      $set: action.payload
    }
  });

const handleBookCar = (state, action) =>
  update(state, {
    booking: {
      $set: action.payload
    }
  });

const handleToggleSearchResult = (state, action) => {
  if (action.payload === 'pickUp') {
    return update(state, {
      resultTypes: {
        pickUp: {
          $set: true
        },
        dropOff: {
          $set: false
        }
      },
      predictions: {
        $set: {}
      }
    });
  }
  if (action.payload === 'dropOff') {
    return update(state, {
      resultTypes: {
        pickUp: {
          $set: false
        },
        dropOff: {
          $set: true
        }
      },
      predictions: {
        $set: {}
      }
    });
  }
};

const handleGetNearbyDrivers = (state, action) =>
  update(state, {
    nearByDrivers: {
      $set: action.payload
    }
  });

const handleBookingConfirmed = (state, action) =>
  update(state, {
    booking: {
      $set: action.payload
    }
  });

const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_INPUT: handleGetInputData,
  TOGGLE_SEARCH_RESULT: handleToggleSearchResult,
  GET_ADDRESS_PREDECTIONS: handleGetAddressPredictions,
  GET_SELECTED_ADDRESS: handleGetSelectedAddress,
  GET_DISTANCE_MATRIX: handleGetDistanceMatrix,
  GET_FARE: handleGetFare,
  BOOK_CAR: handleBookCar,
  GET_NEARBY_DRIVERS: handleGetNearbyDrivers,
  BOOKING_CONFIRMED: handleBookingConfirmed
};
const initialState = {
  region: {},
  inputData: {},
  resultTypes: {},
  selectedAddress: {}
};

export function HomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
