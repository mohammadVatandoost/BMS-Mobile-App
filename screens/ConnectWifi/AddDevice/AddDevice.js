import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, FlatList
} from 'react-native'
import startMainTabs from '../../MainTabs/startMainTab';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/devices';
import deviceImageOptions from '../../../images/DeviceImageOptions';

class AddDevice extends Component {

    state = {
        ip: '',
        port: '',
        name: '',imageIndex: 0
    }

    addDevice = () => {
      console.log("addDevice AddDevice");
        this.props.addDeviceIpPort(this.state.ip,this.state.port,this.state.name,this.state.imageIndex);
        startMainTabs();
    }

    chooseImage = (index) => {
      console.log(index);
      this.setState({imageIndex: index});
    }

    selected = (index) => {
     if(index == this.state.imageIndex) {
       return  { borderColor: '#f7c744',borderWidth: 2, margin: 2 };
     }
    }

    render() {
       let list;
        list = <FlatList horizontal={true} data={deviceImageOptions} extraData={this.state.imageIndex} renderItem={({item,index})=> {
          console.log('this.state.imageIndex');console.log(this.state.imageIndex);
            if(index == this.state.imageIndex) {
              console.log('selected');console.log(this.state.imageIndex);
              return (<TouchableOpacity style={styles.selected} key={item} onPress={() => this.chooseImage(index)}><Image style={styles.image} source={item}></Image></TouchableOpacity>);
            }
            return (<TouchableOpacity key={item} onPress={() => this.chooseImage(index)}><Image style={styles.image} source={item}></Image></TouchableOpacity>);
          }}> </FlatList>

        return (
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Enter devie info</Text>
              </View>
              <View style={styles.infoContainer}>
                  {list}
                  <TextInput style={styles.input} value={this.state.name} onChangeText={(text)=> this.setState({name: text})}
                    placeholder="Enter name"
                    placeholderTextColor='rgba(255,255,255,0.8)'
                    keyboardType='email-address'
                    returnKeyType='next'
                    autoCorrect={false}
                    onSubmitEditing={()=> this.refs.txtIp.focus()}
                  />
                  <TextInput style={styles.input} value={this.state.ip} onChangeText={(text)=> this.setState({ip: text})}
                      placeholder="Enter Ip"
                      placeholderTextColor='rgba(255,255,255,0.8)'
                      keyboardType='email-address'
                      returnKeyType='next'
                      autoCorrect={false}
                      onSubmitEditing={()=> this.refs.txtPort.focus()}  ref={"txtIp"}
                  />
                  <TextInput style={styles.input} value={this.state.port} onChangeText={(text)=> this.setState({port: text})}
                      placeholder="Enter Port"
                      placeholderTextColor='rgba(255,255,255,0.8)'
                      returnKeyType='go'
                      autoCorrect={false} ref={"txtPort"}
                  />
                  <TouchableOpacity style={styles.buttonContainer} onPress={this.addDevice}>
                     <Text style={styles.buttonText}>Add Devices</Text>
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
    image: {
      width: 60, height: 60,margin: 3
    },
    selected: { borderColor: '#f7c744',borderWidth: 2, margin: 2 },
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

const mapDispatchToProps = dispatch => {
    return {
        addDeviceIpPort: (ip,port,name,imageIndex) => dispatch( actions.addDevice(ip,port,name,imageIndex) )
    };
};

export default connect(null,mapDispatchToProps)(AddDevice);
