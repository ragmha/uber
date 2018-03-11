import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = {
  fareContainer: {
    width: width,
    height: 60,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fareText: {
    fontSize: 20,
    textAlign: 'center'
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 20
  }
};

export default styles;
