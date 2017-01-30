import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Slider
} from 'react-native';
import DiceActions from '../actions/dice';
import Reflux from 'reflux';
import DiceStore from '../stores/dice';

const {height, width} = Dimensions.get('window');


export default class Seconds extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  onStatusChange(status) {
    if (status.timeup) {
      this.setState({ timeup: status.timeup });
    }
  }

  componentWillMount() {
    DiceActions.getSeconds();
    this.setState({seconds: 5});
    const foo = Reflux.listenTo(DiceStore, this.onStatusChange);
  }


  componentDidMount() {
    this.unsubscribe = DiceStore.listen(this.onStatusChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


  handleChange(e) {
    DiceActions.setSeconds(e);
    this.setState({seconds: e})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Seconds: {this.state.seconds}</Text>
        <Slider onSlidingComplete={this.handleChange} 
          maximumValue={360}
          minimumValue={5}
          step={5} 
          disabled={this.state && (this.state.timeup === 'Time Up' || !this.state.timeup) ? false : true}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: width,
  },
  label :{
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('dirtydice', () => Seconds);
