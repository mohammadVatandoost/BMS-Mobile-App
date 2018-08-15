import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
// import startMainTabs from '../MainTabs/startMainTab';
import { connect } from 'react-redux';


class DeviceTasks extends Component {

    render() {
        let showCommandText;
        console.log('command props');console.log(this.props.command);
        console.log('name props');console.log(this.props.name);
        // if(this.props.command !== null){showCommandText = <Text style={styles.text}>{this.props.command}</Text>}
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.name}</Text>
                {/*{showCommandText}*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7c744',alignItems: 'center',paddingHorizontal: 10,paddingVertical: 10,width: 100,
    },
    text: {
      color :'rgb(32, 53, 70)',textAlign: 'center',fontSize: 15,
    },
});

const mapStateToProps = state => {
    return {
        devices: state.nodes.devices,
        currentDevice: state.nodes.currentDevice
    };
};


export default connect(mapStateToProps,null)(DeviceTasks);
