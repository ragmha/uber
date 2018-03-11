import React from 'react';
import { Text } from 'react-native';
import { View, Button } from 'native-base';

import { FontAwesome } from '@expo/vector-icons';

import { BarIndicator } from 'react-native-indicators';

import styles from './styles';

const FindDriver = ({ selectedAddress }) => {
  const { selectedPickUp, selectedDropOff } = selectedAddress || {};

  return (
    <View style={styles.findDriverContainer}>
      <View style={styles.content}>
        <Text style={styles.headerText}>Processing your request..</Text>
        <BarIndicator color="yellow" size={80} />
        <FontAwesome style={styles.locationIcon} name="map-marker" />
        <View style={styles.dropoff}>
          <Text style={styles.text}>{selectedDropOff.name}</Text>
        </View>
        <FontAwesome style={styles.toArrow} name="long-arrow-up" />
        <View style={styles.pickup}>
          <Text style={styles.text}>{selectedPickUp.name}</Text>
        </View>

        <View>
          <Text style={styles.termsText}>
            By booking you confirm that you accept our Terms and Condition
          </Text>
          <Button style={styles.cancelBtn}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default FindDriver;
