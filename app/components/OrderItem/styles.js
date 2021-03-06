import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
    margin: 5,
    elevation: 3,
    borderRadius: 3
  },
  item: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 2
  },
  right: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 3
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    fontSize: 25,
    margin: 5,
    color: '#FFD740'
  },
  buttonText: {
    marginRight: 10,
    fontWeight: 'bold'
  },
  orderId: {
    alignSelf: 'flex-start',
    fontSize: 10
  },
  text: {
    alignSelf: 'flex-end',
    marginRight: 3
  },
  btnCheckOut: {
    borderRadius: 30,
    borderColor: 'transparent',
    elevation: 0
  },
  viewText1: {
    flex: 0,
    flexDirection: 'row',
    margin: 20,
  },
  buttonSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontWeight: 'bold',
    borderRadius: 5,
    textAlign: 'center',
    padding: 8,
    marginRight: 4
  }
});

export default styles;
