/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';
import Die from './die';
import Roll from './roll';
import Seconds from './seconds';

const {height, width} = Dimensions.get('window');


export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.img} source={require('../media/logo-black.png')} />
        <Seconds />
        <Roll />
        <Die />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    alignSelf: 'center'
  },
  img: {
    width: width,
    height: width/3
  }
});

AppRegistry.registerComponent('dirtydice', () => Main);
