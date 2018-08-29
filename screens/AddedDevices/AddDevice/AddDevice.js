import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList
} from 'react-native'
import startMainTabs from '../../MainTabs/startMainTab';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/devices';
import deviceImageOptions from '../../../images/DeviceImageOptions';


class AddDevice extends Component {

    state = {
        deviceCode: '',
        clientCode: '', deviceName: '',
        code: '', imageIndex: 0,
    }

    addDevice = () => {
      console.log("addDevice AddDevice");
        this.props.addDeviceData(this.state.deviceName, this.state.code, this.state.clientCode, this.state.deviceCode, this.state.imageIndex);
        // this.props.storeDevice(this.props.devices);
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
              return (<TouchableOpacity style={styles.selected} key={item} onPress={() => this.chooseImage(index)}><Image style={styles.image} source={item} /></TouchableOpacity>);
            }
            return (<TouchableOpacity key={item} onPress={() => this.chooseImage(index)}><Image style={styles.image} source={item} /></TouchableOpacity>);
          }}> </FlatList>

        return (
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Enter devie info</Text>
              </View>
              <View style={styles.infoContainer}>
                  {list}
                  <TextInput style={styles.input} value={this.state.deviceName} onChangeText={(text)=> this.setState({deviceName: text})}
                             placeholder="Enter deviceName"
                             placeholderTextColor='rgba(255,255,255,0.8)'
                             returnKeyType='next'
                             autoCorrect={false}
                             onSubmitEditing={()=> this.refs.txtCode.focus()}
                  />
                  <View style={styles.rowContainer}>
                  <View style={styles.colContainer}>
                    <Text style={styles.textHeader5}>Code</Text>
                    <TextInput style={styles.smallInput} value={this.state.code} onChangeText={(text)=> this.setState({code: text})}
                     placeholderTextColor='rgba(255,255,255,0.8)'
                     returnKeyType='next'
                     autoCorrect={false} ref={"txtCode"}
                     onSubmitEditing={()=> this.refs.txtClientCode.focus()}
                    />
                  </View>
                  <View style={styles.colContainer}>
                    <Text style={styles.textHeader5}>client</Text>
                    <TextInput style={styles.smallInput} value={this.state.clientCode} onChangeText={(text)=> this.setState({clientCode: text})}
                      placeholderTextColor='rgba(255,255,255,0.8)'
                      returnKeyType='next'
                      autoCorrect={false}
                      onSubmitEditing={()=> this.refs.txtDeviceCode.focus()}  ref={"txtClientCode"}
                    />
                  </View>
                  <View style={styles.colContainer}>
                    <Text style={styles.textHeader5}>device</Text>
                    <TextInput style={styles.smallInput} value={this.state.deviceCode} onChangeText={(text)=> this.setState({deviceCode: text})}
                      placeholderTextColor='rgba(255,255,255,0.8)'
                      returnKeyType='go'
                      autoCorrect={false} ref={"txtDeviceCode"}
                    />
                  </View>
                  </View>
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
    rowContainer: {
        flexDirection: 'row', justifyContent: 'space-around'
    },
    colContainer: {
        flexDirection: 'column', justifyContent: 'space-around'
    },
    textHeader: {
        fontSize: 17, color: 'rgb(255, 255, 255)', textAlign: 'center', margin: 10
    },
    textHeader5: {
        fontSize: 12, color: 'rgb(255, 255, 255)', textAlign: 'center', margin: 5
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
    smallInput: {
        height: 40, width: 100,
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
        devices: state.nodes.devices
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addDeviceData: (deviceName,code,clientCode,deviceCode,imageIndex) => dispatch( actions.addDevice(deviceName,code,clientCode,deviceCode,imageIndex) ),
        storeDevice: (devices) => dispatch(actions.storeDeviceToStorage(devices))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(AddDevice);
