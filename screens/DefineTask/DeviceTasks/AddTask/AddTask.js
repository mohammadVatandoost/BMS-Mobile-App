import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
// import startMainTabs from '../MainTabs/startMainTab';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/devices';
import DeviceBrief from '../../../../Component/DeviceBrief/DeviceBrief';

class AddTask extends Component {

   state = {
      command: '',
      name: ''
   }

    addTask = () => {
        this.props.addTask(this.props.currentDevice,this.state.name,this.state.command);
        this.props.navigator.pop();
    }

    render() {

        return (
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Enter Task info</Text>
            </View>
            <View style={styles.infoContainer}>
                <TextInput style={styles.input} value={this.state.name} onChangeText={(text)=> this.setState({name: text})}
                  placeholder="Enter name"
                  placeholderTextColor='rgba(255,255,255,0.8)'
                  returnKeyType='next'
                  autoCorrect={false}
                  onSubmitEditing={()=> this.refs.txtCommand.focus()}
                />
                <TextInput style={styles.input} value={this.state.command} onChangeText={(text)=> this.setState({command: text})}
                    placeholder="Enter Command"
                    placeholderTextColor='rgba(255,255,255,0.8)'
                    returnKeyType='go'
                    autoCorrect={false} ref={"txtCommand"}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this.addTask}>
                   <Text style={styles.buttonText}>Add Task</Text>
                </TouchableOpacity>
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

const mapStateToProps = state => {
    return {
        devices: state.nodes.devices,
        currentDevice: state.nodes.currentDevice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addTask : (name,taskName,command) => dispatch( actions.addTask(name,taskName,command) )
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(AddTask);
