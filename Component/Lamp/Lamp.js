import React, { Component } from 'react';
import {
    StyleSheet, View,
    TouchableOpacity,
} from 'react-native'
import DeviceBrief from '../../Component/DeviceBrief/DeviceBrief';
import Task from '../../Component/Task/Task';
import deviceImageOptions from '../../images/DeviceImageOptions';
import commands from '../../Commands';
import CommandSetting from '../CommandSetting/CommandSetting';

class Lamp extends Component {

    render() {
        return (
            <View style={styles.container}>
                <DeviceBrief image={deviceImageOptions[this.props.imageIndex]} name={this.props.deviceName} />
                <View style={styles.rowContainer}>
                  <TouchableOpacity style={styles.taskContainer} onPress={() => this.props.sendMessage(commands.on,commands.doCode,this.props.clientCode,this.props.deviceCode)}><Task name={'turn On'} /></TouchableOpacity>
                  <TouchableOpacity style={styles.taskContainer} onPress={() => this.props.sendMessage(commands.off,commands.doCode,this.props.clientCode,this.props.deviceCode)}><Task name={'turn off'} /></TouchableOpacity>
                </View>
                <CommandSetting setCheckDateTime={this.props.setCheckDateTime} setCheckServer={this.props.setCheckServer} setDateTime={this.props.setDateTime} />
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

export default Lamp;
