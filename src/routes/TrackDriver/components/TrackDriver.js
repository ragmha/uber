import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Container } from 'native-base';
import MapTrack from './MapTrack';
import DriverFound from './DriverFound';
import DriverFooter from './DriverFooter';
import DriverOnTheWay from './DriverOnTheWay';

import HeaderComponent from '../../../components/HeaderComponent';
import FooterComponent from '../../../components/FooterComponent';

const carMarker = require('../../../assets/car.png');

class TrackDriver extends Component {
  componentDidMount() {
    this.props.getCurrentLocation();
    this.props.getDriverInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.driverLocation &&
      nextProps.driverLocation !== this.props.driverLocation
    ) {
      this.props.getDistanceFromDriver();
    }
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <HeaderComponent />
          {this.props.region && (
            <MapTrack
              region={this.props.region}
              selectedAddress={this.props.selectedAddress}
              driverLocation={this.props.driverLocation}
              showCarMaker={this.props.showCarMaker}
              carMarker={carMarker}
            />
          )}
          {this.props.distanceFromDriver.rows && (
            <DriverOnTheWay
              driverInfo={this.props.driverInfo}
              distanceFromDriver={this.props.distanceFromDriver}
            />
          )}

          <DriverFooter driverInfo={this.props.driverInfo} />

          {this.props.showDriverFound && (
            <DriverFound
              driverInfo={this.props.driverInfo}
              getDriverLocation={this.props.getDriverLocation}
            />
          )}
        </View>
      </Container>
    );
  }
}

export default TrackDriver;
