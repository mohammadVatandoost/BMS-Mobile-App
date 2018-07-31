import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import startMainTabs from '../MainTabs/startMainTab';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/devices';
import DeviceBrief from '../../Component/DeviceBrief/DeviceBrief';
import deviceImageOptions from '../../images/DeviceImageOptions';

class DefineTask extends Component {

    addTask = (deviceName) => {
      this.props.currentDevice(deviceName);
      this.props.navigator.push({
        screen: "AwesomeProject.DeviceTasksScreen",
        title: deviceName
      })
    }

    render() {
      let showDevices;
      console.log(this.props.devices);
      if(this.props.devices.length > 0) {
        console.log("array");
        showDevices = this.props.devices.map((device) => {
          return (<TouchableOpacity style={styles.container2} key={device.name} onPress={() => this.addTask(device.name)}><DeviceBrief image={deviceImageOptions[device.imageIndex]} name={device.name} /></TouchableOpacity>);
        });
      } else {
        console.log("nothing");
        showDevices = <View style={styles.titleContainer}><Text style={styles.title}>No Device Added</Text></View>
      }
        return (
            <View style={styles.container}>
              {showDevices}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(32, 53, 70)',
        flexDirection: 'column',
        flex: 1,
    },
    titleContainer: {
      alignItems: 'center',
      marginTop: 25,
      marginBottom: 20,
      flex: 1
    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
   container2: {
     height: 100, flex: 1,
   }

});

const mapStateToProps = state => {
    return {
        devices: state.nodes.devices
    };
};

const mapDispatchToProps = dispatch => {
    return {
        currentDevice: (name) => dispatch( actions.currentDevice(name) )
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(DefineTask);
