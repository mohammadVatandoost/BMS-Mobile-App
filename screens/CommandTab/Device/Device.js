import React, { Component } from 'react';
import {
    StyleSheet, View, ToastAndroid
} from 'react-native'
import { connect } from 'react-redux';
import UDP from 'react-native-udp';
import Config from '../../../Config';
import publicIP from 'react-native-public-ip';
import Commands from '../../../Commands';
import TV from '../../../Component/TV/TV';
import Door from '../../../Component/Door/Door';
import Lamp from '../../../Component/Lamp/Lamp';
import Temperature from '../../../Component/Temperature/Temperature';

let udpSocket;
let sendStatus = false;

class Device extends Component {

    constructor(props) {
        super(props);
        this.state = {sendSuccessful: false, month: '', day: '10', hour: '12', minute: '20', ipLastPart: '',
            checkDateTime: false, checkServer: false, inAfterTime: false };
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
        // console.log("constructor local IP************");
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

    ComponentDidMount() {
    }

    setsendSuccessful = () => {this.setState({sendSuccessful: true});};

    componentWillUnmount() {
        udpSocket.close();
    }
    setDateTime = (inAfterTime, month, day, hour, minute) => {
        this.setState({inAfterTime: inAfterTime, month: month, day: day, hour: hour, minute: minute});
    };

    setCheckDateTime = (checkState) => { this.setState({checkDateTime: checkState}) };
    setCheckServer = (checkState) => { this.setState({checkServer: checkState}) };

    buildCommandText = (command, commandCode, clientCode, deviceCode) => {
        let message = '';
        console.log("buildCommandText");
        console.log(command);console.log(commandCode);console.log(clientCode);console.log(deviceCode);
       if(commandCode === Commands.doCode) {
           if(this.state.checkDateTime) {
               if(!this.state.inAfterTime) {
                   message = "20"+this.state.ipLastPart+Commands.doInTimeCode + clientCode + deviceCode ;
                   message = message + this.state.month + this.state.day + this.state.hour + this.state.minute + command;
                   console.log("message doInTimeCode");
                   console.log(message);
                   return message;
               } else {
                   message = "20"+this.state.ipLastPart+Commands.doAfterTime + clientCode + deviceCode ;
                   message = message + this.state.day + this.state.hour + this.state.minute + command;
                   console.log("message doAfterTime");
                   console.log(message);
                   return message;
               }
           } else {
               message = "20"+this.state.ipLastPart+Commands.doCode + clientCode + deviceCode + command ;
               console.log("message doCode");
               console.log(message);
               return message;
           }
       } else if(commandCode === Commands.readCode) {
           message ="20"+this.state.ipLastPart+Commands.readCode + clientCode + deviceCode;
           console.log("message readCode");
           console.log(message);
           return message;
       }

        console.log("message last");
        console.log(message);
    };

    sendMessage = (command, commandCode, clientCode, deviceCode) => {
        console.log('state');console.log(this.state);
        // this.setState({sendSuccessful: false});
        sendStatus = false;
        let PORT = Config.port; // 4211
        let HOST = Config.ip; // 192.168.1.13
        let message = this.buildCommandText(command, commandCode, clientCode, deviceCode );
        console.log("message");
        console.log(message);
        let messageBuffer = this.toByteArray(message);
        // Toggle the state every second
        setTimeout(() => {
            if(!sendStatus) {ToastAndroid.show('Your command does not send,Check your connection please', ToastAndroid.LONG);}
        }, Config.timeOut);
        udpSocket.send(messageBuffer, 0, messageBuffer.length, PORT, HOST, function(err) {
            if (err) { throw err;}
            console.log('UDP message sent to ' + HOST +':'+ PORT);
        });
        console.log("udpSocket");
    }

  toByteArray = (obj) => {
        let uint = new Uint8Array(obj.length);
        for (let i = 0, l = obj.length; i < l; i++){
            uint[i] = obj.charCodeAt(i);
        }
        return new Uint8Array(uint);
    }

  chooseDevice = () => {
      let showDevice;
      showDevice = this.props.devices.map((device) => {
          if(device.deviceName == this.props.currentDevice) {
              // this.setState({ip: device.ip,port: device.port});
              return (this.whichDeviceKind(device));
          }
      });

      return showDevice;
  }

  whichDeviceKind = (device) => {
      switch(device.imageIndex) {
          case 0:
              return (<Lamp setCheckDateTime={this.setCheckDateTime} setCheckServer={this.setCheckServer} setDateTime={this.setDateTime} sendMessage={this.sendMessage} deviceName={device.deviceName} imageIndex={device.imageIndex} clientCode={device.clientCode} deviceCode={device.deviceCode} />);
              break;
          case 1:
              return (<Door setCheckDateTime={this.setCheckDateTime} setCheckServer={this.setCheckServer} setDateTime={this.setDateTime} sendMessage={this.sendMessage} deviceName={device.deviceName} imageIndex={device.imageIndex} clientCode={device.clientCode} deviceCode={device.deviceCode} />);
              break;
          case 7:
              return (<TV setCheckDateTime={this.setCheckDateTime} setCheckServer={this.setCheckServer} setDateTime={this.setDateTime} sendMessage={this.sendMessage}  deviceName={device.deviceName} imageIndex={device.imageIndex} clientCode={device.clientCode} deviceCode={device.deviceCode} />);
              break;
          case 8:
              return (<Temperature setCheckDateTime={this.setCheckDateTime} setCheckServer={this.setCheckServer} setDateTime={this.setDateTime} sendMessage={this.sendMessage}  deviceName={device.deviceName} imageIndex={device.imageIndex} clientCode={device.clientCode} deviceCode={device.deviceCode} />);
              break;
          default:
              return null;
      }
  };

    render() {


        return (
            <View style={styles.container}>
              {this.chooseDevice()}
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


export default connect(mapStateToProps,null)(Device);
