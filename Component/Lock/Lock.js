import React, { Component } from 'react';
import {
    StyleSheet, View, Text,
    TouchableOpacity, ToastAndroid
} from 'react-native'
import UDP from 'react-native-udp';
import base64 from 'base64-js';
import DeviceBrief from '../../Component/DeviceBrief/DeviceBrief';
import Task from '../../Component/Task/Task';
import deviceImageOptions from '../../images/DeviceImageOptions';
import Config from '../../Config';

class Lock extends Component {


    ComponentDidMount() {

    }

    sendMessage = (command) => {
        console.log("sendMessage");
        let udpSocket = UDP.createSocket('udp4');
        let PORT = Config.port; // 4211
        let HOST = Config.ip; // 192.168.1.13
        let message = this.props.code+this.props.clientCode+this.props.deviceCode+command;
        let messageBuffer = this.toByteArray(message);
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

    toByteArray = (obj) => {
        let uint = new Uint8Array(obj.length);
        for (let i = 0, l = obj.length; i < l; i++){
            uint[i] = obj.charCodeAt(i);
        }
        return new Uint8Array(uint);
    }

    render() {
        return (
            <View style={styles.container}>
                <DeviceBrief image={deviceImageOptions[this.props.imageIndex]} name={this.props.deviceName} />
                <View style={styles.rowContainer}>
                    <TouchableOpacity style={styles.taskContainer} onPress={() => this.sendMessage('Lock')}><Task name={'Lock'} /></TouchableOpacity>
                    <TouchableOpacity style={styles.taskContainer} onPress={() => this.sendMessage('Unlock')}><Task name={'Unlock'} /></TouchableOpacity>
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

export default Lock;
