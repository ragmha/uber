// @flow
import React from 'react';
import { Text } from 'react-native';
import { View } from 'native-base';
import styles from './styles';

const Fare = ({ fare }: any) => (
  <View style={styles.fareContainer}>
    <Text>
      <Text style={styles.fareText}>FARE: €</Text>
      <Text style={styles.amount}>{fare}</Text>
    </Text>
  </View>
);

export default Fare;
