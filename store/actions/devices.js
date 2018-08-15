import * as actionTypes from './actionTypes';
import { AsyncStorage } from "react-native";

export const addDevice = (deviceName,code,clientCode,deviceCode,imageIndex) => {
  console.log('addDevice actions');
    return {
       type: actionTypes.ADD_DEVICE,
       deviceName: deviceName,
       code: code,
       clientCode: clientCode,
       deviceCode: deviceCode,
       imageIndex: imageIndex
    }
}

export const currentDevice = (deviceName) => {
    return {
       type: actionTypes.CURRENT_DEVICE,
       deviceName: deviceName
    }
}

export const addTask = (deviceName,taskName,command) => {
    return {
       type: actionTypes.ADD_TASK,
       command: command,
       taskName: taskName,
       deviceName: deviceName
    }
}

export const getDevicesFromStorage = () => {
    return dispatch => {
        AsyncStorage.getItem('devices')
            .catch((err) => reject())
            .then((devices)=> {
                console.log("getDevicesFromStorage");
            console.log(devices);
                if (!devices) {
                    dispatch(sendDevicesToReducers([]));
                } else {
                    dispatch(sendDevicesToReducers(JSON.parse(devices)));
                }
            });
    };

}

export const sendDevicesToReducers = (devices) => {
    console.log("sendDevicesToReducers");console.log(devices);
    return {
        type: actionTypes.GET_DEVICES_FROM_STORAGE,
        devices: devices
    }
}

export const storeDeviceToStorage = (devices) => {
    return dispatch => {
        AsyncStorage.setItem('devices', JSON.stringify(devices));
        console.log("storeDeviceToStorage");console.log(devices);
        dispatch(sendDevicesToReducers(devices));
    };
}

export const deleteDevice = (deviceName) => {
    return {
        type: actionTypes.DELETE_DEVICE,
        deviceName: deviceName
    }
}

export const editDevice = (device) => {
    return {
        type: actionTypes.EDIT_DEVICE,
        device: device
    }
}