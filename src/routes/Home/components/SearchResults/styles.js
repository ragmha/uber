import { Dimensions } from 'react-native';
var width = Dimensions.get('window').width; //full width
const styles = {
  searchResultsWrapper: {
    top: 190,
    position: 'absolute',
    width: width,
    height: 2000,
    backgroundColor: '#fff'
  },
  primaryText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000'
  },
  secondaryText: {
    fontStyle: 'italic',
    fontSize: 14,
    marginTop: 5,
    color: '#7D7D7D'
  },
  leftContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderLeftColor: '#7D7D7D',
    marginBottom: 5,
    marginRight: -5
  },
  leftIcon: {
    fontSize: 28,
    color: 'red'
  },
  distance: {
    fontSize: 15
  }
};

export default styles;
