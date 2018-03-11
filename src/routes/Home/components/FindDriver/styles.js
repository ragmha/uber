import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const styles = {
  findDriverContainer: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabText: {
    fontSize: 12
  },
  subTabText: {
    fontSize: 8
  },
  spinner: {
    marginBottom: 50
  },
  btn: {
    marginTop: 20
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginBottom: 15,
    marginTop: 100
  },
  locationIcon: {
    color: 'red',
    fontSize: 50,
    marginTop: 25
  },
  content: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickup: {
    width: width * 0.4,
    borderRadius: 50,
    height: 60,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  toArrow: {
    color: 'orange',
    fontSize: 40,
    marginTop: 10,
    marginBottom: 10
  },
  dropoff: {
    width: width * 0.4,
    borderRadius: 50,
    height: 60,
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelBtnWrapper: {
    marginTop: 50,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelBtn: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'transparent'
  },
  cancelBtnText: {
    color: '#fff'
  },
  text: {
    fontSize: 20
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  termsText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 40,
    marginBottom: 45
  }
};

export default styles;
