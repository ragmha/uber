import React from 'react';
import { Text } from 'react-native';
import { View, List, ListItem, Left, Body } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';
import { getSelectedAddress } from '../../modules/home';

const SearchResults = ({ predictions, getSelectedAddress }) => {
  handleSelectedAddress = placeID => getSelectedAddress(placeID);
  return (
    <View style={styles.searchResultsWrapper}>
      <List
        dataArray={predictions}
        renderRow={item => (
          <View>
            <ListItem
              onPress={() => handleSelectedAddress(item.place_id)}
              button
              avatar
            >
              <Left style={styles.leftContainer}>
                <MaterialIcons style={styles.leftIcon} name="location-on" />
              </Left>
              <Body>
                <Text style={styles.primaryText}>
                  {item.structured_formatting.main_text}
                </Text>
                <Text style={styles.secondaryText}>
                  {item.structured_formatting.secondary_text}
                </Text>
              </Body>
            </ListItem>
          </View>
        )}
      />
    </View>
  );
};

export default SearchResults;
