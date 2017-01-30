import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import DiceActions from '../actions/dice';
import DiceStore from '../stores/dice';
import Reflux from 'reflux';

const {height, width} = Dimensions.get('window');

export default class Roll extends Component {
  constructor() {
    super();
    this.roll = this.roll.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  onStatusChange(status) {
    if (status.timeup) {
      this.setState({ timeup: status.timeup });
    }
  }

  componentDidMount() {
    this.unsubscribe = DiceStore.listen(this.onStatusChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  roll() {
    if (!this.state || !this.state.timeup || this.state.timeup === 'Time Up') {
      DiceActions.roll();
      return;
    }
  }

  render() {
    return (
      <View style={[styles.container, !this.state || !this.state.timeup || this.state.timeup === 'Time Up' ? null : styles.inactive]}>
        <Text style={styles.roll} onPress={this.roll}>
          Roll
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: '#12a',
    width: (width - 40),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
    
  },
  roll: {
    height: 60,
    color: '#eee',
    textAlign: 'center',
    margin: 3,
    padding: 10,
    fontSize: 30,

  },
  inactive :{
    backgroundColor: '#34c',
  }
});

AppRegistry.registerComponent('dirtydice', () => Roll);
