import React, { Component } from 'react';
import { Text } from 'react-native';
import { View, InputGroup, Input } from 'native-base';
import { Octicons } from '@expo/vector-icons';

import styles from './styles';
import { getInputData } from '../../modules/home';

const SearchBox = ({
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  selectedAddress
}) => {
  const { selectedPickUp, selectedDropOff } = selectedAddress;
  handleInput = (key, val) => {
    getInputData({
      key,
      value: val
    });
    getAddressPredictions();
  };

  return (
    <View style={styles.searchBox}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>PICK UP</Text>
        <InputGroup>
          <Octicons
            style={styles.icon}
            name="primitive-dot"
            size={20}
            color="red"
          />
          <Input
            key={'pickUp'}
            value={selectedPickUp && selectedPickUp.name}
            style={styles.inputSearch}
            placeholder="FROM"
            onChangeText={handleInput.bind(this, 'pickUp')}
            onFocus={() => toggleSearchResultModal('pickUp')}
          />
        </InputGroup>
      </View>
      <View style={styles.secondInputWrapper}>
        <Text style={styles.label}>DROP OFF</Text>
        <InputGroup>
          <Octicons
            style={styles.icon}
            name="primitive-dot"
            size={20}
            color="green"
          />
          <Input
            key={'dropOff'}
            value={selectedDropOff && selectedDropOff.name}
            style={styles.inputSearch}
            placeholder="TO"
            onChangeText={handleInput.bind(this, 'dropOff')}
            onFocus={() => toggleSearchResultModal('dropOff')}
          />
        </InputGroup>
      </View>
    </View>
  );
};

export default SearchBox;
