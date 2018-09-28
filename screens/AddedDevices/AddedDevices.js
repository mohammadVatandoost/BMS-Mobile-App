import React, { Component } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, Picker, ToastAndroid, Modal
} from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/devices';
import DeviceDetail from '../../Component/DeviceDetail/DeviceDetail';
import deviceImageOptions from '../../images/DeviceImageOptions';
import Task from '../../Component/Task/Task';
import UDP from 'react-native-udp';
import Config from '../../Config';
import Commands from '../../Commands';
import publicIP from 'react-native-public-ip';

let udpSocket;let sendStatus = false;

class AddedDevices extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,year: '1397', month: '06', day: '10',hour: '12', minute: '20', ipLastPart: '',
        }
        udpSocket = UDP.createSocket('udp4');
        udpSocket.bind(Config.port, function(err) {
            if (err) throw err;
            // console.log('udpSocket bound to ' + JSON.stringify(udpSocket.address()));
        });
        udpSocket.on('message', function(data, rinfo) {
            let str = String.fromCharCode.apply(null, new Uint8Array(data));
            // console.log('a received echo ' + str + ' ' + JSON.stringify(rinfo));
            sendStatus = true;
            if(str === 'T') {ToastAndroid.show('Your command send successfully', ToastAndroid.LONG);}
            if(str === 'F') {ToastAndroid.show('Your command is not acceptable', ToastAndroid.LONG);}
        })
        publicIP().then(ip => {
          // console.log("constructor local IP************");
          // console.log(ip);console.log(ip.split('.'));
          let temp = ip.split('.');
          // console.log(temp[3]);
          // console.log("integer");console.log(parseInt(temp[3]));
          // console.log("charCodeAt");console.log(String.fromCharCode(parseInt(temp[3])));
          this.setState({ipLastPart: String.fromCharCode(parseInt(temp[3])) });
          //=> '47.122.71.234'
      });
    }

    componentDidMount() {
       this.props.getDevicesFromStorage();
    }

    componentWillUnmount() {
        udpSocket.close();
    }

    onChange =(e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    addDevice = () => {
      // console.log("addDevice");
      this.props.navigator.push({
        screen: "AwesomeProject.AddDevice",
        title: "New device info"
      })
    }

    deleteDevice = (deviceName) => {
        this.props.deleteDevice(deviceName);
    }

    toByteArray = (obj) => {
        let uint = new Uint8Array(obj.length);
        for (let i = 0, l = obj.length; i < l; i++){
            uint[i] = obj.charCodeAt(i);
        }
        return new Uint8Array(uint);
    };

    removeAll = () => {
        let PORT = Config.port; // 4211
        let HOST = Config.ip; // 192.168.1.13
        let message = '20'+this.state.ipLastPart+Commands.removeAll ;
        let messageBuffer = this.toByteArray(message);
        sendStatus = false;
        setTimeout(() => {
            if(!this.state.sendSuccessful) {ToastAndroid.show('Your command does not send,Check your connection please', ToastAndroid.LONG);}
        }, Config.timeOut);
        udpSocket.send(messageBuffer, 0, messageBuffer.length, PORT, HOST, function(err) {
            if (err) { throw err;}
            // console.log('UDP message sent to ' + HOST +':'+ PORT);
        });
        this.props.removeAllDevices();
    }

    setTime = () => {
        let PORT = Config.port; // 4211
        let HOST = Config.ip; // 192.168.1.13
        let message = '20'+this.state.ipLastPart+Commands.setTimeCode+this.state.year+this.state.month+this.state.day+this.state.hour+this.state.minute ;
        let messageBuffer = this.toByteArray(message);
        sendStatus = false;
        setTimeout(() => {
            if(!this.state.sendSuccessful) {ToastAndroid.show('Your command does not send,Check your connection please', ToastAndroid.LONG);}
        }, Config.timeOut);
        udpSocket.send(messageBuffer, 0, messageBuffer.length, PORT, HOST, function(err) {
            if (err) { throw err;}
            // console.log('UDP message sent to ' + HOST +':'+ PORT);
        });
        this.setState({modalVisible: false});
    }

    render() {
        let showDevices; let showRemove = false;
        // console.log("connectWifi");
        // console.log(this.props.devices);
        if(this.props.devices.length > 0) {
          // console.log("array");
          showRemove = true;
          showDevices = this.props.devices.map((device) => {
            return (<DeviceDetail image={deviceImageOptions[device.imageIndex]} deleteDevice={this.deleteDevice}
                                  key={device.deviceName} name={device.deviceName}
                                  clientCode={device.clientCode} deviceCode={device.deviceCode}  />);
          });
        } else {
          // console.log("nothing");
          showDevices = <View style={styles.titleContainer}><Text style={styles.title}>No Device Added</Text></View>
        }
        // console.log("OK");
        return (
            <View style={styles.container}>
              {showDevices}
              <View style={styles.rowContainer}>
                <TouchableOpacity style={styles.taskContainer} onPress={this.addDevice}><Task name={'Add Device'} /></TouchableOpacity>
                { showRemove && <TouchableOpacity style={styles.taskContainer} onPress={this.removeAll}><Task name={'Remove All'} /></TouchableOpacity> }
                <TouchableOpacity style={styles.taskContainer} onPress={()=> {this.setState({modalVisible: true}) }}><Task name={'Set Time'} /></TouchableOpacity>
              </View>
              <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Select Date</Text>
                        <View style={styles.rowContainer}>
                            <Picker
                                selectedValue={this.state.year}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({year: itemValue})}>
                                <Picker.Item label="01" value="01" /><Picker.Item label="02" value="02" />
                                <Picker.Item label="03" value="03" /><Picker.Item label="04" value="04" />
                                <Picker.Item label="05" value="05" /><Picker.Item label="06" value="06" />
                                <Picker.Item label="07" value="07" /><Picker.Item label="08" value="08" />
                                <Picker.Item label="09" value="09" /><Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" /><Picker.Item label="12" value="12" />
                            </Picker>
                            <Picker
                                selectedValue={this.state.month}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({month: itemValue})}>
                                <Picker.Item label="01" value="01" /><Picker.Item label="02" value="02" />
                                <Picker.Item label="03" value="03" /><Picker.Item label="04" value="04" />
                                <Picker.Item label="05" value="05" /><Picker.Item label="06" value="06" />
                                <Picker.Item label="07" value="07" /><Picker.Item label="08" value="08" />
                                <Picker.Item label="09" value="09" /><Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" /><Picker.Item label="12" value="12" />
                            </Picker> 
                            <Picker
                                selectedValue={this.state.day}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({day: itemValue})}>
                                <Picker.Item label="01" value="01" /><Picker.Item label="02" value="02" />
                                <Picker.Item label="03" value="03" /><Picker.Item label="04" value="04" />
                                <Picker.Item label="05" value="05" /><Picker.Item label="06" value="06" />
                                <Picker.Item label="07" value="07" /><Picker.Item label="08" value="08" />
                                <Picker.Item label="09" value="09" /><Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" /><Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" /><Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" /><Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" /><Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" /><Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" /><Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" /><Picker.Item label="24" value="24" />
                                <Picker.Item label="25" value="25" /><Picker.Item label="26" value="26" />
                                <Picker.Item label="27" value="27" /><Picker.Item label="28" value="28" />
                                <Picker.Item label="29" value="29" /><Picker.Item label="30" value="30" />
                            </Picker>
                        </View>
                        <Text style={styles.title}>Select Time</Text>
                        <View style={styles.rowContainer}>
                            <Picker
                                selectedValue={this.state.hour}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({hour: itemValue})}>
                                <Picker.Item label="01" value="01" /><Picker.Item label="02" value="02" />
                                <Picker.Item label="03" value="03" /><Picker.Item label="04" value="04" />
                                <Picker.Item label="05" value="05" /><Picker.Item label="06" value="06" />
                                <Picker.Item label="07" value="07" /><Picker.Item label="08" value="08" />
                                <Picker.Item label="09" value="09" /><Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" /><Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" /><Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" /><Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" /><Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" /><Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" /><Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" /><Picker.Item label="24" value="24" />
                            </Picker>
                            <Text style={{margin: 5, color: '#FFF',marginTop: 20}}>:</Text>
                            <Picker
                                selectedValue={this.state.minute}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({minute: itemValue})}>
                                <Picker.Item label="01" value="01" /><Picker.Item label="02" value="02" />
                                <Picker.Item label="03" value="03" /><Picker.Item label="04" value="04" />
                                <Picker.Item label="05" value="05" /><Picker.Item label="06" value="06" />
                                <Picker.Item label="07" value="07" /><Picker.Item label="08" value="08" />
                                <Picker.Item label="09" value="09" /><Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" /><Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" /><Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" /><Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" /><Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" /><Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" /><Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" /><Picker.Item label="24" value="24" />
                                <Picker.Item label="25" value="25" /><Picker.Item label="26" value="26" />
                                <Picker.Item label="27" value="27" /><Picker.Item label="28" value="28" />
                                <Picker.Item label="29" value="29" /><Picker.Item label="30" value="30" />
                                <Picker.Item label="31" value="31" /><Picker.Item label="32" value="32" />
                                <Picker.Item label="33" value="33" /><Picker.Item label="34" value="34" />
                                <Picker.Item label="35" value="35" /><Picker.Item label="36" value="36" />
                                <Picker.Item label="37" value="37" /><Picker.Item label="38" value="38" />
                                <Picker.Item label="39" value="39" /><Picker.Item label="40" value="40" />
                                <Picker.Item label="41" value="41" /><Picker.Item label="42" value="42" />
                                <Picker.Item label="43" value="43" /><Picker.Item label="44" value="44" />
                                <Picker.Item label="45" value="45" /><Picker.Item label="46" value="46" />
                                <Picker.Item label="47" value="47" /><Picker.Item label="48" value="48" />
                                <Picker.Item label="49" value="49" /><Picker.Item label="50" value="50" />
                                <Picker.Item label="51" value="51" /><Picker.Item label="52" value="52" />
                                <Picker.Item label="53" value="53" /><Picker.Item label="54" value="54" />
                                <Picker.Item label="55" value="55" /><Picker.Item label="56" value="56" />
                                <Picker.Item label="57" value="57" /><Picker.Item label="58" value="58" />
                                <Picker.Item label="59" value="59" /><Picker.Item label="60" value="60" />
                            </Picker>
                        </View>
                        <TouchableOpacity style={styles.taskContainer} onPress={this.setTime}><Task name={'Set Time'} /></TouchableOpacity>
                    </View>
                </Modal>
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
    container2: {
        backgroundColor: '#f7c744',alignItems: 'center',paddingHorizontal: 10,paddingVertical: 10,width: 150,
    },
    text: {
        color :'rgb(32, 53, 70)',textAlign: 'center',fontSize: 15,
    },
    picker: {height: 50, width: 100, margin: 5, color: '#FFF'},
    rowContainer: {
        flexDirection: 'row', justifyContent: 'space-around'
    },
    titleContainer: {
      alignItems: 'center',
      marginTop: 35,
      flex: 1
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
        getDevicesFromStorage: () => dispatch( actions.getDevicesFromStorage() ),
        deleteDevice: (deviceName) => dispatch(actions.deleteDevice(deviceName)),
        removeAllDevices: () => dispatch(actions.removeAllDevice())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(AddedDevices);
