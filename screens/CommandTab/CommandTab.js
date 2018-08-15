import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import UDP from 'react-native-udp';
import base64 from 'base64-js';
import { connect } from 'react-redux';
import DeviceBrief from '../../Component/DeviceBrief/DeviceBrief';
import * as actions from '../../store/actions/index';
import deviceImageOptions from '../../images/DeviceImageOptions';

class CommandTab extends Component {

    state = {
      message: [],
    }

    componentDidMount() {
        // this.props.getDevicesFromStorage();
    }

    onChange = (text,key) => {
      let temp = this.state.message;
      temp[key] = text;
      this.setState({message: temp});
    }

    // only works for 8-bit chars
    toByteArray = (obj) => {
        let uint = new Uint8Array(obj.length);
        for (let i = 0, l = obj.length; i < l; i++){
            uint[i] = obj.charCodeAt(i);
        }
        return new Uint8Array(uint);
    }

    sendMessage = (ip,port,key) => {
      console.log("sendMessage");
      let udpSocket = UDP.createSocket('udp4');
      // let PORT = this.state.port;
      // let HOST = this.state.ip;
      let PORT = parseInt(port, 10);; // 4211
      let HOST = ip; // 192.168.1.13
      let messageBuffer = this.toByteArray(this.state.message[key]);
      console.log("messageBuffer");
      console.log(messageBuffer);
        // this.setState({message: "sending"})
        udpSocket.send(messageBuffer, 0, messageBuffer.length, PORT, HOST, function(err) {
            if (err) { throw err;console.log(err);}
            console.log('UDP message sent to ' + HOST +':'+ PORT);
            udpSocket.close();
        });
          console.log("udpSocket");
    }

    goToTaskPage = (deviceName) => {
      this.props.currentDevice(deviceName);
      this.props.navigator.push({
        screen: "AwesomeProject.DeviceScreen",
        title: deviceName
      })
    }

    render() {
      let showDevices;
      console.log(this.props.devices);
      if(this.props.devices.length > 0) {
        console.log("array");
        showDevices = this.props.devices.map((device) => {
          return ( <TouchableOpacity style={styles.container2} key={device.deviceName} onPress={() => this.goToTaskPage(device.deviceName)}><DeviceBrief image={deviceImageOptions[device.imageIndex]} name={device.deviceName}/></TouchableOpacity>);
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
    container2: {
      height: 100, flex:1
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 250,
        padding: 20,
        // backgroundColor: 'red'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10
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
        currentDevice: (name) => dispatch( actions.currentDevice(name) ),
        getDevicesFromStorage: () => dispatch( actions.getDevicesFromStorage() )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(CommandTab);
