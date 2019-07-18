import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#f2f2f2',
    padding: 8,
  },
  txt: {
    fontSize: 45,
    textAlign: 'center',
    color: '#161a72',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ed21ba',
    fontSize: 20,
    padding: 10,
    marginBottom: 5,
  },
  btn: {
    width: 120,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ed21ba',
    backgroundColor: '#ed21ba',
    color: '#5a09a0',
    fontSize: 25,
    padding: 10,
    marginBottom: 5,
  },
})
