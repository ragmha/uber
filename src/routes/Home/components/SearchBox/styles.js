import { Dimensions } from 'react-native';
var width = Dimensions.get('window').width; //full width
const styles = {
  searchBox: {
    top: 0,
    position: 'absolute',
    width: width
  },
  inputWrapper: {
    marginLeft: 14,
    marginRight: 10,
    marginTop: 15,
    paddingBottom: -10,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
    opacity: 0.9,
    borderRadius: 12
  },
  secondInputWrapper: {
    marginLeft: 15,
    marginRight: 10,
    marginTop: 0,
    paddingBottom: -10,
    backgroundColor: '#F9F9F9',
    opacity: 0.9,
    borderRadius: 12
  },
  inputSearch: {
    fontSize: 16
  },
  icon: {
    marginLeft: 10,
    marginRight: -5
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 12,
    marginTop: 12,
    marginBottom: -2
  }
};

export default styles;
