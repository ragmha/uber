import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import Home from '../components/Home';
import {
  getCurrentLocation,
  getInputData,
  getAddressPredictions,
  getSelectedAddress,
  toggleSearchResultModal,
  bookCar,
  getNearByDrivers
} from '../modules/home';

const mapStateToProps = state => ({
  region: state.home.region,
  inputData: state.home.inputData || {},
  resultTypes: state.home.resultTypes || {},
  predictions: state.home.predictions || [],
  selectedAddress: state.home.selectedAddress || {},
  fare: state.home.fare,
  booking: state.home.booking || {},
  nearByDrivers: state.home.nearByDrivers || []
});

const mapDispatchToProps = {
  getCurrentLocation,
  getInputData,
  getAddressPredictions,
  getSelectedAddress,
  toggleSearchResultModal,
  bookCar,
  getNearByDrivers
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
