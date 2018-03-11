import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import MapContainer from './MapContainer';

import HeaderComponent from '../../../components/HeaderComponent';
import FooterComponent from '../../../components/FooterComponent';

import Fare from './Fare';
import Fab from './Fab';
import FindDriver from './FindDriver';

const carMarker = require('../../../assets/car.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  }
});
class Home extends Component {
  componentDidMount() {
    var self = this;
    this.props.getCurrentLocation();
    setTimeout(() => self.props.getNearByDrivers(), 2000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.booking.status === 'confirmed') {
      Actions.trackDriver({ type: 'reset' });
    }
    // this.props.getCurrentLocation();
  }

  render() {
    // const region = {
    //   latitude: 60.16999932,
    //   longitude: 24.941829566,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421
    // };

    return (
      <Container>
        {this.props.booking.status !== 'pending' ? (
          <View style={{ flex: 1 }}>
            <HeaderComponent />
            {this.props.region.latitude && (
              <MapContainer
                region={this.props.region}
                getInputData={this.props.getInputData}
                toggleSearchResultModal={this.props.toggleSearchResultModal}
                getAddressPredictions={this.props.getAddressPredictions}
                resultTypes={this.props.resultTypes}
                predictions={this.props.predictions}
                getSelectedAddress={this.props.getSelectedAddress}
                selectedAddress={this.props.selectedAddress}
                carMarker={carMarker}
                nearByDrivers={this.props.nearByDrivers}
              />
            )}
            <Fab onPressAction={() => this.props.bookCar()} />
            {this.props.fare && <Fare fare={this.props.fare} />}
          </View>
        ) : (
          <FindDriver selectedAddress={this.props.selectedAddress} />
        )}
      </Container>
    );
  }
}

export default Home;
