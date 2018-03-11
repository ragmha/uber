// @flow

import React from 'react';
import { Text } from 'react-native';
import { View, Button } from 'native-base';

import { Entypo } from '@expo/vector-icons';

import styles from './styles';

const Fab = ({ onPressAction }: () => void) => (
  <Button style={styles.fabContainer} onPress={onPressAction}>
    <Entypo name="hand" size={45} color="white" />
  </Button>
);

export default Fab;
