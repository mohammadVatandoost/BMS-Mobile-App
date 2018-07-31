import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';
import Auth from './screens/Auth/Auth';
import ConnectWifi from './screens/ConnectWifi/ConnectWifi';
import CommandTab from './screens/CommandTab/CommandTab';
import Device from './screens/CommandTab/Device/Device';
import DefineTask from './screens/DefineTask/DefineTask';
import DeviceTasks from './screens/DefineTask/DeviceTasks/DeviceTasks';
import AddTask from './screens/DefineTask/DeviceTasks/AddTask/AddTask';
import AddDevice from './screens/ConnectWifi/AddDevice/AddDevice';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from 'react-redux';
import devicesReducer from './store/reducers/devices';

const rootReducer = combineReducers({
    nodes: devicesReducer
});
const store = createStore(rootReducer);
// register Screens
Navigation.registerComponent('AwesomeProject.AuthScreen',() => Auth);
Navigation.registerComponent('AwesomeProject.ConnectWifiScreen',() => ConnectWifi, store, Provider);
Navigation.registerComponent('AwesomeProject.CommandTabScreen',() => CommandTab, store, Provider);
Navigation.registerComponent('AwesomeProject.DefineTaskScreen',() => DefineTask, store, Provider);
Navigation.registerComponent('AwesomeProject.DeviceTasksScreen',() => DeviceTasks, store, Provider);
Navigation.registerComponent('AwesomeProject.DeviceScreen',() => Device, store, Provider);
Navigation.registerComponent('AwesomeProject.AddTaskScreen',() => AddTask, store, Provider);
Navigation.registerComponent('AwesomeProject.AddDevice',() => AddDevice, store, Provider);
// start app
Navigation.startSingleScreenApp({
    screen: {
      screen: "AwesomeProject.AuthScreen",
      navigatorStyle: {
		    navBarHidden: true
	    }
    }
});
