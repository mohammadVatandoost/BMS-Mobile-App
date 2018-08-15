/* @flow weak */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet, Image
} from 'react-native';
class DeviceBrief extends Component {
  render() {
    return (
      <View style={styles.container}>
       <Image style={styles.image} source={this.props.image}></Image>
       <Text style={styles.name}>{this.props.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    margin: 5,
    padding: 5,
    flexDirection: 'row',
  },
  image: {
    width: 50, height: 50
  },
  name: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 10
  }
});

export default DeviceBrief;
