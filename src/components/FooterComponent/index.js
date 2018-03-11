// @flow

import React from 'react';
import { Footer, FooterTab, Button } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from 'react-native';

import styles from './styles';

const logo = require('../../assets/logo.png');

const TABS = [
  {
    title: 'TaxiCar',
    subTitle: '',
    icon: 'car'
  },
  {
    title: 'TaxiShare',
    subTitle: '',
    icon: 'car'
  },
  {
    title: 'TaxiPremium',
    subTitle: '',
    icon: 'car'
  },
  {
    title: 'TaxiBike',
    subTitle: '',
    icon: 'car'
  }
];

const FooterComponent = () => (
  <Footer>
    <FooterTab style={styles.footerContainer} iosBarStyle="light-content">
      {TABS.map((tab, index) => (
        <Button key={index}>
          <FontAwesome
            size={20}
            name={tab.icon}
            style={{ color: index === 0 ? 'purple' : 'grey' }}
          />
          <Text
            style={{ fontSize: 12, color: index === 0 ? 'purple' : 'grey' }}
          >
            {tab.title}
          </Text>
          <Text style={styles.subText}>{tab.subTitle}</Text>
        </Button>
      ))}
    </FooterTab>
  </Footer>
);

export default FooterComponent;
