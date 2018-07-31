import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
// import startMainTabs from '../MainTabs/startMainTab';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/devices';
import DeviceBrief from '../../../Component/DeviceBrief/DeviceBrief';
import Task from '../../../Component/Task/Task';
import deviceImageOptions from '../../../images/DeviceImageOptions';

class DeviceTasks extends Component {

    addTask = () => {
      this.props.navigator.push({
        screen: "AwesomeProject.AddTaskScreen",
        title: this.props.currentDevice
      })
    }

    render() {
      let showDevices;let tasks;
      if(this.props.devices.length > 0) {
        console.log("array");
        showDevices = this.props.devices.map((device) => {
          if(device.name == this.props.currentDevice) {
           return (<DeviceBrief image={deviceImageOptions[device.imageIndex]} key={device.name} name={device.name} />);
          }
        });
        tasks  = this.props.devices.map((device) => {
          if(device.name == this.props.currentDevice) {
            return device.tasks.map((task) =>{
              console.log("Task name");console.log(task.name);
                 return (<TouchableOpacity style={styles.taskContainer} key={task.taskName}><Task name={task.name} command={task.command} /></TouchableOpacity>)
            })
          }
        });
      } else {
        showDevices = <View style={styles.titleContainer}><Text style={styles.title}>No Device Added</Text></View>
      }
        return (
            <View style={styles.container}>
              {showDevices}
              {tasks}
              <TouchableOpacity style={styles.buttonContainer} onPress={this.addTask}>
                 <Text style={styles.buttonText}>Add Task</Text>
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

const mapStateToProps = state => {
    return {
        devices: state.nodes.devices,
        currentDevice: state.nodes.currentDevice
    };
};


export default connect(mapStateToProps,null)(DeviceTasks);
