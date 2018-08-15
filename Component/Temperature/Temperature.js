import React, { Component } from 'react';
import {
    StyleSheet, View, Text,
    TouchableOpacity,
} from 'react-native'
import UDP from 'react-native-udp';
import base64 from 'base64-js';
import DeviceBrief from '../../Component/DeviceBrief/DeviceBrief';
import Task from '../../Component/Task/Task';
import deviceImageOptions from '../../images/DeviceImageOptions';

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
                <Text>Temperature : {this.state.Temperature}</Text>
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
    taskContainer: {
        margin: 5,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 25,
        flex: 1
    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10
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

export default Temperature;
