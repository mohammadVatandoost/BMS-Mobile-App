import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
// userId: null,
const initialState = {
    devices: [],
    currentDevice: ''
};

const addDevice = (state, action) => {
  console.log('addDevice reducers');
   let temp = state.devices;
   temp.push({ip: action.ip, port: action.port, name: action.name,imageIndex: action.imageIndex,tasks: []});
   return updateObject(state, {devices: temp});
}

const currentDevice = (state, action) => {
   return updateObject(state, {currentDevice: action.name});
}

const addTask = (state, action) => {
   let temp = state.devices;
   for(let i=0;i<temp.length;i++) {
     if(temp[i].name == action.name) { temp[i].tasks.push({command:action.command,name: action.taskName});   }
   }
   return updateObject(state, {devices: temp});
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_DEVICE: return addDevice(state, action);
        case actionTypes.CURRENT_DEVICE: return currentDevice(state, action);
        case actionTypes.ADD_TASK: return addTask(state, action);
        default:
            return state;
    }
};

export default reducer;
