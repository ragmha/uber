// @flow

import React from 'react';
import { Header, Left, Body, Right, Button } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Text, Image } from 'react-native';

import styles from './styles';

const logo = require('../../assets/logo.png');

const HeaderComponent = () => (
  <Header style={styles.header} iosBarStyle="light-content">
    <Left>
      <Button transparent>
        <FontAwesome name="bars" style={styles.icon} />
      </Button>
    </Left>
    <Body>
      {logo ? (
        <Image resizeMode="contain" style={styles.logo} source={logo} />
      ) : (
        <Text style={styles.headerText}>Driver on the way</Text>
      )}
    </Body>
    <Right>
      <Button transparent />
    </Right>
  </Header>
);

export default HeaderComponent;
