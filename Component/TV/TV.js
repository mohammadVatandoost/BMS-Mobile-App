import React, { Component } from 'react';
import {
    StyleSheet, View, Text, Slider,
    TouchableOpacity, ToastAndroid
} from 'react-native'
import UDP from 'react-native-udp';
import base64 from 'base64-js';
import DeviceBrief from '../../Component/DeviceBrief/DeviceBrief';
import Task from '../../Component/Task/Task';
import deviceImageOptions from '../../images/DeviceImageOptions';
import Config from '../../Config';

class TV extends Component {
     state = {
         SliderValue: 50,
     }

    ComponentDidMount() {

    }

    sendMessage = (message) => {
        console.log("sendMessage");
        let udpSocket = UDP.createSocket('udp4');
        let PORT = 8888; // 4211
        let HOST = '192.168.50.20'; // 192.168.1.13
        let messageBuffer = this.toByteArray(this.props.code+this.props.clientCode+this.props.deviceCode+message);
        console.log("messageBuffer");
        console.log(messageBuffer);
        // this.setState({message: "sending"})
        udpSocket.send(messageBuffer, 0, messageBuffer.length, PORT, HOST, function(err) {
            if (err) { throw err;console.log(err);ToastAndroid.show('Cannot Send', ToastAndroid.SHORT, ToastAndroid.CENTER);}
            console.log('UDP message sent to ' + HOST +':'+ PORT);
            ToastAndroid.show('your command done', ToastAndroid.SHORT, ToastAndroid.CENTER);
            udpSocket.close();
        });
        console.log("udpSocket");
    }

    toByteArray = (obj) => {
        let uint = new Uint8Array(obj.length);
        for (let i = 0, l = obj.length; i < l; i++){
            uint[i] = obj.charCodeAt(i);
        }
        return new Uint8Array(uint);
    }

    onSliderValueChange= (ChangedValue) => {
        this.setState({ SliderValue: ChangedValue });
        this.sendMessage('volume'+ChangedValue)
    }

    render() {
        return (

            <View style={styles.container}>
               <DeviceBrief image={deviceImageOptions[this.props.imageIndex]} name={this.props.deviceName} />
               <View style={styles.rowContainer}>
                 <TouchableOpacity style={styles.taskContainer} onPress={() => this.sendMessage('On')}><Task name={'turn On'} /></TouchableOpacity>
                 <TouchableOpacity style={styles.taskContainer} onPress={() => this.sendMessage('Off')}><Task name={'turn off'} /></TouchableOpacity>
               </View>
               <Text style={styles.textHeader}>Volume </Text>
               <Slider
                 step = { 1 }
                 minimumValue = { 0 }
                 maximumValue = { 100 } value={this.state.SliderValue}
                 minimumTrackTintColor = "#009688"
                 onValueChange={(ChangedValue) => this.onSliderValueChange(ChangedValue)}
                 style = {{ width: '100%' }}
               />
               <Text style={styles.textHeader}>Change Channel </Text>
               <View style={styles.rowContainer}>
                  <TouchableOpacity style={styles.taskContainer} onPress={() => this.sendMessage('up')}><Task name={'<'} /></TouchableOpacity>
                  <TouchableOpacity style={styles.taskContainer} onPress={() => this.sendMessage('down')}><Task name={'>'} /></TouchableOpacity>
               </View>
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
    rowContainer: {
        flexDirection: 'row', justifyContent: 'space-around'
    },
    textHeader: {
        fontSize: 17, color: 'rgb(255, 255, 255)', textAlign: 'center', margin: 10
    }
});



export default (TV);
