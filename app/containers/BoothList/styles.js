import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)'
  },
  btnBooth: {
    alignSelf: 'center',
    width: '70%',
    backgroundColor: '#FF6F00',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 20
  },
  btnModal: {
    alignSelf: 'center',
    borderRadius: 20,
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    marginTop: 10
  },
  content: {
    marginTop: 20,
    marginHorizontal: 10
  },
  searchHeader: {
    marginTop: -30,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 50
  },
  bodySection: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5
  },
  profileSection: {
    flex: 2
  },
  nameSection: {
    marginLeft: 2,
    flex: 8
  },
  profilePic: {
    height: 200,
    width
  },
  name: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold'
  },
  job: {
    color: '#333',
    fontSize: 14,
    opacity: 0.8
  },
  summary: {
    color: '#333',
    paddingTop: 10
  },
  footerSection: {
    width: '100%',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginRight: 20
  },
  seeMoreLine: {
    height: 1,
    opacity: 0.1,
    backgroundColor: 'black'
  },
  footerButton: {
    borderRadius: 10,
    height: 35,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemNameSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  }
});

export default styles;
