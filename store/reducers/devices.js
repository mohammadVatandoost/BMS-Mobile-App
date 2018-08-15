import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { AsyncStorage } from "react-native";
// userId: null,
const initialState = {
    devices: [],
    currentDevice: ''
};
// deviceName,code,clientCode,deviceCode,imageIndex
const addDevice = (state, action) => {
  console.log('addDevice reducers');
   let temp = state.devices;
   temp.push({deviceName: action.deviceName, code: action.code, clientCode: action.clientCode, deviceCode: action.deviceCode,imageIndex: action.imageIndex,tasks: []});
   return updateObject(state, {devices: temp});
}

const currentDevice = (state, action) => {
   return updateObject(state, {currentDevice: action.deviceName});
}

const addTask = (state, action) => {
   let temp = state.devices;
   for(let i=0;i<temp.length;i++) {
     if(temp[i].name == action.name) { temp[i].tasks.push({command:action.command, name: action.taskName});   }
   }
   return updateObject(state, {devices: temp});
}

const getDevicesFromStorage = (state, action) => {
    console.log("getDevicesFromStorage");console.log(action.devices);
    return updateObject(state, {devices: action.devices});
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_DEVICE: return addDevice(state, action);
        case actionTypes.CURRENT_DEVICE: return currentDevice(state, action);
        case actionTypes.ADD_TASK: return addTask(state, action);
        case actionTypes.GET_DEVICES_FROM_STORAGE: return getDevicesFromStorage(state, action);
        default:
            return state;
    }
};

export default reducer;
