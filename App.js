import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';
import Auth from './screens/Auth/Auth';
import AddedDevices from './screens/AddedDevices/AddedDevices';
import CommandTab from './screens/CommandTab/CommandTab';
import Device from './screens/CommandTab/Device/Device';
import DefineTask from './screens/DefineTask/DefineTask';
import DeviceTasks from './screens/DefineTask/DeviceTasks/DeviceTasks';
import AddTask from './screens/DefineTask/DeviceTasks/AddTask/AddTask';
import AddDevice from './screens/AddedDevices/AddDevice/AddDevice';
import AuthAdmin from './screens/AuthAdmin/AuthAdmin';
import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import * as actions from './store/actions/index';
import devicesReducer from './store/reducers/devices';
import authReducer from './store/reducers/auth';

const composeEnhancers = compose;


const rootReducer = combineReducers({
    nodes: devicesReducer, auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));


Navigation.registerComponent('AwesomeProject.AuthScreen',() => Auth, store, Provider);
Navigation.registerComponent('AwesomeProject.AddedDevices',() => AddedDevices, store, Provider);
Navigation.registerComponent('AwesomeProject.AuthAdmin',() => AuthAdmin, store, Provider);
Navigation.registerComponent('AwesomeProject.CommandTabScreen',() => CommandTab, store, Provider);
Navigation.registerComponent('AwesomeProject.DefineTaskScreen',() => DefineTask, store, Provider);
Navigation.registerComponent('AwesomeProject.DeviceTasksScreen',() => DeviceTasks, store, Provider);
Navigation.registerComponent('AwesomeProject.DeviceScreen',() => Device, store, Provider);
Navigation.registerComponent('AwesomeProject.AddTaskScreen',() => AddTask, store, Provider);
Navigation.registerComponent('AwesomeProject.AddDevice',() => AddDevice, store, Provider);

Navigation.startSingleScreenApp({
    screen: {
      screen: "AwesomeProject.AuthScreen",
      navigatorStyle: {
		    navBarHidden: true
	    }
    }
});
