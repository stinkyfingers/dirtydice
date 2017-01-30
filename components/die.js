import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import DiceStore from '../stores/dice';
import Reflux from 'reflux';

const {height, width} = Dimensions.get('window');


String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

export default class Die extends Component {
  constructor() {
    super();
    // this.store = Reflux.initStore(DiceStore);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.opacity = this.opacity.bind(this);

    this.opacityValue = new Animated.Value(0);
  }

  onStatusChange(status) {
    if (status.action && status.part) {
      this.setState({ action: status.action, part: status.part });
      this.opacity(1);
    }
    if (status.timeup) {
      this.setState({ timeup: status.timeup });
      if (status.timeup === 'Time Up'){
        this.opacity(0);
      }
    }
  }


  componentDidMount() {
    this.unsubscribe = DiceStore.listen(this.onStatusChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  opacity(amount) {
    Animated.timing(
      this.opacityValue,
      {
        toValue: amount,
        duration: 2000,
        easing: Easing.linear
      }).start();
  }

  renderDice() {
    const opacity = this.opacityValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, .5, 1]
    });
 
    return (<View style={styles.dice}>
        <Animated.Text style={[styles.die, {opacity}]}>{this.state.action.name.capitalize()}</Animated.Text>
        <Animated.Text style={[styles.die, {opacity}]}>{this.state.part.name.capitalize()}</Animated.Text>
      </View>
      );
  }

  renderTimer() {
    const timeup = this.state.timeup !== '0' ? this.state.timeup : '';
    return(
      <Text style={styles.timer}>{timeup}</Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {this.state && this.state.action && this.state.part ? this.renderDice() : null}
        </View>
        {this.state && this.state.timeup ? this.renderTimer() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: 20,
    minHeight: 100,
    shadowColor: '#444',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
    backgroundColor: '#000'
  },
  container:{
  },
  dice : {
    width: width,
    marginTop: 20,
    marginBottom: 20,
  },
  die: {
    textAlign: 'center',
    fontSize: 40,
    color: '#eee'
  },
  timer: {
    color: '#e44',
    fontSize: 30,
    textAlign: 'center',
  }
});

AppRegistry.registerComponent('dirtydice', () => Die);
