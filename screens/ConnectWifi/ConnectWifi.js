import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import UDP from 'react-native-udp';
import base64 from 'base64-js';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/devices';
import DeviceDetail from '../../Component/DeviceDetail/DeviceDetail';
import deviceImageOptions from '../../images/DeviceImageOptions';
import { AsyncStorage } from "react-native";
class ConnectWifi extends Component {

    state = {
        ip: '',
        port: '',
        message: '',
        debug: ''
    }

    componentDidMount() {
        // this.props.getDevicesFromStorage();
        this.saveDevices(this.props.devices);
    }

    saveDevices= async (devices) => {
        try {
            console.log("save Devices");
            console.log(devices);
            await AsyncStorage.setItem('devices', JSON.stringify(devices));
            console.log("save Devices");
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    };

    onChange =(e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    addDevice = () => {
      console.log("addDevice");
      // Navigation.startSingleScreenApp({
      //     screen: {
      //       screen: "AwesomeProject.AddDevice",
      //     }
      // });
      this.props.navigator.push({
        screen: "AwesomeProject.AddDevice",
        title: "New device info"
      })
    }

    editDevice = () => {}

    deleteDevice = () => {}

    render() {
        let showDevices;
        console.log("connectWifi");
        console.log(this.props.devices);
        if(this.props.devices.length > 0) {
          console.log("array");
          showDevices = this.props.devices.map((device) => {
            return (<DeviceDetail image={deviceImageOptions[device.imageIndex]} editDevice={this.editDevice}
                                  deleteDevice={this.deleteDevice} key={device.deviceName} name={device.deviceName}
                                  code={device.code} clientCode={device.clientCode} deviceCode={device.deviceCode}  />);
          });
        } else {
          console.log("nothing");
          showDevices = <View style={styles.titleContainer}><Text style={styles.title}>No Device Added</Text></View>
        }
        return (
            <View style={styles.container}>
              {showDevices}
              <TouchableOpacity style={styles.buttonContainer} onPress={this.addDevice}>
                <Text style={styles.buttonText}>Add Devices</Text>
              </TouchableOpacity>
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
      marginTop: 35,
      flex: 1
    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    buttonsView: {
        flexDirection: 'row',padding: 10, alignItems: 'center',justifyContent: 'center'
    },
    buttons: {
        width: 110, height: 40, marginLeft: 15, marginRight: 15
    },
    buttonContainer: {
        backgroundColor: '#f7c744',
        paddingVertical: 15,
        margin: 20
    },
    buttonText: {
        textAlign: 'center',
        color :'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 18
    }
});

const mapStateToProps = state => {
    return {
        devices: state.nodes.devices
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDevicesFromStorage: () => dispatch( actions.getDevicesFromStorage() )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ConnectWifi);
