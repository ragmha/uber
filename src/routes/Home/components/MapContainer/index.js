import React from 'react';
import { View } from 'native-base';
import { MapView } from 'expo';

import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';

import styles from './styles';

const MapContainer = ({
  region,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  resultTypes,
  predictions,
  getSelectedAddress,
  selectedAddress,
  carMarker,
  nearByDrivers
}) => {
  const { selectedPickUp, selectedDropOff } = selectedAddress || {};
  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
      >
        {selectedPickUp && (
          <MapView.Marker
            coordinate={{
              latitude: selectedPickUp.geometry.location.lat,
              longitude: selectedPickUp.geometry.location.lng
            }}
            pinColor={'green'}
          />
        )}

        {selectedDropOff && (
          <MapView.Marker
            coordinate={{
              latitude: selectedDropOff.geometry.location.lat,
              longitude: selectedDropOff.geometry.location.lng
            }}
            pinColor={'purple'}
          />
        )}

        {nearByDrivers &&
          nearByDrivers.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: marker.coordinate.coordinates[1],
                longitude: marker.coordinate.coordinates[0]
              }}
              image={carMarker}
            />
          ))}
      </MapView>
      <SearchBox
        getInputData={getInputData}
        toggleSearchResultModal={toggleSearchResultModal}
        getAddressPredictions={getAddressPredictions}
        selectedAddress={selectedAddress}
      />
      {(resultTypes.pickUp || resultTypes.dropOff) && (
        <SearchResults
          predictions={predictions}
          getSelectedAddress={getSelectedAddress}
        />
      )}
    </View>
  );
};
export default MapContainer;
