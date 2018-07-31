import * as actionTypes from './actionTypes';

export const addDevice = (ip,port,name,imageIndex) => {
  console.log('addDevice actions');
    return {
       type: actionTypes.ADD_DEVICE,
       ip: ip,
       port: port,
       name: name,
       imageIndex: imageIndex
    }
}

export const currentDevice = (name) => {
    return {
       type: actionTypes.CURRENT_DEVICE,
       name: name
    }
}

export const addTask = (name,taskName,command) => {
    return {
       type: actionTypes.ADD_TASK,
       command: command,
       taskName: taskName,
       name: name
    }
}
