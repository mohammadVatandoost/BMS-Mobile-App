import React, { Component } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity,TextInput
} from 'react-native'
import config from '../../Config';

class AuthAdmin extends Component {

    state = {
        password: ''
    }

    ComponentDidMount() {
    }

    enter =() => {
        if(this.state.password === config.adminPass) {
            this.setState({password: ''});
            this.props.navigator.push({
                screen: "AwesomeProject.AddedDevices",
                title: "Add Device"
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                           placeholder="Enter password"
                           placeholderTextColor='rgba(255,255,255,0.8)'
                           returnKeyType='go'
                           secureTextEntry onChangeText={(text) => this.setState({password: text})}
                           autoCorrect={false}  value={this.state.password}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this.enter}>
                    <Text style={styles.buttonText}>Enter</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(32, 53, 70)',
        flexDirection: 'column',
        flex: 1, alignItems: 'center',justifyContent: 'center'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 20, marginHorizontal: 10,
        paddingHorizontal: 10,width: 250
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
        paddingVertical: 10,
        margin: 20, width: 100
    },
    buttonText: {
        textAlign: 'center',
        color :'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 18
    }
});



export default AuthAdmin;
