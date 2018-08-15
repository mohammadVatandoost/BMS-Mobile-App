export {
    auth, authGoogle,
    logout,
    authRegister,
    authCheckState
} from './auth';

export { addDevice, addTask, currentDevice, getDevicesFromStorage, sendDevicesToReducers, storeDeviceToStorage } from './devices'