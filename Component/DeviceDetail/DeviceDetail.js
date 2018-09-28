/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text, Image,
  StyleSheet, TouchableOpacity
} from 'react-native';

export default class DeviceDetail extends Component {


  render() {
    return (
     <View style={styles.container}>
       <Image style={styles.image} source={this.props.image} />
       <View style={styles.container2}>
          <View style={styles.container4}>
            <Text style={styles.name}>{this.props.name}</Text>
            <TouchableOpacity onPress={() => this.props.deleteDevice(this.props.name)}><Text style={styles.badgeText}>delete</Text></TouchableOpacity>
          </View>
          <View style={styles.container3}>
            <Text style={styles.detail}>{this.props.clientCode}</Text>
            <Text style={styles.detail}>{this.props.deviceCode}</Text>
          </View>
       </View>
      </View>
    );
  }
}

{/*<TouchableOpacity onPress={() => this.editDevice()}><Text style={styles.editText}>Edit</Text></TouchableOpacity>*/}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    padding: 5,flexDirection: 'row',
  },
  container2: {
    flexDirection: 'column',
  },
  container3: {
    flexDirection: 'row',
  },
  container4: {
    flexDirection: 'row'
  },
  image: {
    width: 50, height: 50
  },
  name: {
    fontSize: 25,textAlign: 'center',marginLeft: 10,
    color: '#FFF',
  },
  badgeText: {
      textAlign: 'center',
      color :'#F1F1F1',
      fontWeight: 'bold',
      fontSize: 15,
      marginTop: 5,
      marginLeft: 50
  },
  editText: {
    textAlign: 'center',
    color :'#F1F1F1',
    fontWeight: 'bold',
    fontSize: 15,
    paddingHorizontal: 10,
    marginLeft: 110,
    marginTop: 5
  },
  detail: {
    fontSize: 15,color: '#FFF',marginLeft: 10,textAlign: 'center',
  }
});
