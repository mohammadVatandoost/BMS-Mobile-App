import axios from 'axios';
import { AsyncStorage } from "react-native"
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('userData');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password,url) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };

        axios.post(url, authData)
            .then((response) => {
                // console.log("token");
                // console.log(response.headers['x-auth']);
                    AsyncStorage.setItem('token', response.headers['x-auth']);
                    dispatch(authSuccess(response.headers['x-auth']));
            })
            .catch(err => {
                console.log("error");
                console.log(err);
                dispatch(authFail('دوباره امتحان کنید'));
            });
    };
};

export const authRegister = (name,email,password,url) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            name: name,
            email: email,
            password: password
        };

        axios.post(url, authData)
            .then((response) => {
                AsyncStorage.setItem('token', response.headers['x-auth']);
                dispatch(authSuccess(response.headers['x-auth']));
            })
            .catch(err => {
                dispatch(authFail('try again'));
            });
    };
};


export const authGoogle = (response) => {
    return dispatch => {
        if(response.data != 404)
        {
            // console.log("authGoogle");console.log(response);
            AsyncStorage.setItem('token', response.data.token);
            dispatch(authSuccess(response.data.token));
        } else {
            console.log("Erorr");
            dispatch(authFail('ایمیل یا رمز خود را اشتباه وارد کرده اید'));
        }
    };
};

export const authCheckState = () => {
    return dispatch => {
        AsyncStorage.getItem('token')
            .catch((err) => reject())
            .then((tokenFromStorage)=> {
                if (!tokenFromStorage) {
                    dispatch(logout());
                } else {
                    dispatch(authSuccess(tokenFromStorage));
                }
            });
    };
};