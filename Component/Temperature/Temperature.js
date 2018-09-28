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

class Temperature extends Component {

    state = {
        Temperature: 0,
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
            if (err) { throw err;console.log(err);}
            console.log('UDP message sent to ' + HOST +':'+ PORT);
            udpSocket.close();
        });
        console.log("udpSocket");
    }

    render() {
        return (
            <View style={styles.container}>
                <DeviceBrief image={deviceImageOptions[this.props.imageIndex]} name={this.props.deviceName} />
                <Text style={styles.textHeader}>Temperature : {this.state.Temperature}</Text>
                <TouchableOpacity style={styles.taskContainer} onPress={() => this.sendMessage('get')}><Task name={'get temperature'} /></TouchableOpacity>
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

export default Temperature;
