import React from 'react';
import { View } from 'native-base';
import { MapView } from 'expo';

import styles from './styles';

const MapTrack = ({
  region,
  driverLocation,
  showCarMaker,
  selectedAddress,
  carMarker
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

        {showCarMaker && (
          <MapView.Marker
            coordinate={{
              latitude: driverLocation.coordinate.coordinates[1],
              longitude: driverLocation.coordinate.coordinates[0]
            }}
            image={carMarker}
          />
        )}
      </MapView>
    </View>
  );
};
export default MapTrack;
