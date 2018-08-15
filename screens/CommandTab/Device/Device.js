import React, { Component } from 'react';
import {
    StyleSheet, View
} from 'react-native'
import { connect } from 'react-redux';
import TV from '../../../Component/TV/TV';
import Door from '../../../Component/Door/Door';
import Lamp from '../../../Component/Lamp/Lamp';
import Temperature from '../../../Component/Temperature/Temperature';

class Device extends Component {


  ComponentDidMount() {

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
              return (<Lamp deviceName={device.deviceName} imageIndex={device.imageIndex} code={device.code} clientCode={device.clientCode} deviceCode={device.deviceCode} />);
              break;
          case 1:
              return (<Door deviceName={device.deviceName} imageIndex={device.imageIndex} code={device.code} clientCode={device.clientCode} deviceCode={device.deviceCode} />);
              break;
          default:
              return null;
      }
  }

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
