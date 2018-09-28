import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, ActivityIndicator, Keyboard, TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import startMainTabs from '../MainTabs/startMainTab';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import axios from 'axios';

class AuthScreen extends Component {

    state = {
        switchView: 'SignIn',
        registerDataName: '',
        registerDataEmail: '',
        registerDataPass: '',
        loginDataEmail: '',
        loginDataPass: '',
        forgetPassCode: ''
    }

    componentDidMount() {
        this.props.getDevicesFromStorage();
        this.props.checkAuthState();
    }

    signInHandler = () => {
        const url = 'http://139.59.4.81:8080/user/login';
        console.log("signInHandler");
        this.props.onAuth(this.state.loginDataEmail,this.state.loginDataPass,url);
    }

    passForgotHandler = () => {
       startMainTabs();
    }

    singUpHandler = () => {
        const url = 'http://139.59.4.81:8080/user/register';
        this.props.registerUser(this.state.registerDataName,this.state.registerDataEmail,this.state.registerDataPass,url);
    }


    changeTab = (tabName) => {
      console.log(tabName);
      this.setState({switchView: tabName});
    }

    swithAuthView = () => {
        if(this.state.switchView == 'SignIn') {
            return (
              <View style={styles.infoContainer}>
                  <TextInput style={styles.input}
                      placeholder="Enter email"
                      placeholderTextColor='rgba(255,255,255,0.8)'
                      keyboardType='email-address'
                      returnKeyType='next' onChangeText={(text) => this.setState({loginDataEmail: text})}
                      autoCorrect={false} value={this.state.loginDataEmail}
                      onSubmitEditing={()=> this.refs.txtPassword.focus()}
                  />
                  <TextInput style={styles.input}
                      placeholder="Enter password"
                      placeholderTextColor='rgba(255,255,255,0.8)'
                      returnKeyType='go'
                      secureTextEntry onChangeText={(text) => this.setState({loginDataPass: text})}
                      autoCorrect={false}  value={this.state.loginDataPass}
                      ref={"txtPassword"}
                  />
                  { (!this.props.loading) && <TouchableOpacity style={styles.buttonContainer} onPress={this.signInHandler}>
                      <Text style={styles.buttonText}>SIGN IN</Text>
                  </TouchableOpacity>}
                  {this.props.loading && <ActivityIndicator size="large" color="#0000ff" />}
                  <View style={styles.badgeContainer}>
                     <TouchableOpacity onPress={() => this.changeTab('forgetPass')}>
                      <Text style={styles.badgeText}>Forgot Password?</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => this.changeTab('SignUp')}>
                       <Text style={styles.badgeText}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            );
        } else if(this.state.switchView == 'SignUp') {
            return (
              <View style={styles.infoContainer2}>
              <TextInput style={styles.input}
                  placeholder="Enter username"
                  placeholderTextColor='rgba(255,255,255,0.8)'
                  keyboardType='email-address'
                  returnKeyType='next' onChangeText={(text) => this.setState({registerDataName: text})}
                  autoCorrect={false}  value={this.state.registerDataName}
                  onSubmitEditing={()=> this.refs.txtPassword.focus()}
              />
                  <TextInput style={styles.input}
                      placeholder="Enter email"
                      placeholderTextColor='rgba(255,255,255,0.8)'
                      keyboardType='email-address'
                      returnKeyType='next' onChangeText={(text) => this.setState({registerDataEmail: text})}
                      autoCorrect={false}  value={this.state.registerDataEmail}
                      onSubmitEditing={()=> this.refs.txtPassword.focus()}
                  />
                  <TextInput style={styles.input}
                      placeholder="Enter password"
                      placeholderTextColor='rgba(255,255,255,0.8)'
                      returnKeyType='go'
                      secureTextEntry onChangeText={(text) => this.setState({registerDataPass: text})}
                      autoCorrect={false}  value={this.state.registerDataPass}
                      ref={"txtPassword"}
                  />
                  { (!this.props.loading) && <TouchableOpacity style={styles.buttonContainer} onPress={this.singUpHandler}>
                      <Text style={styles.buttonText}>SIGN UP</Text>
                  </TouchableOpacity>}
                  {this.props.loading && <ActivityIndicator size="large" color="#0000ff" />}
                  <View style={styles.badgeContainer}>
                     <TouchableOpacity onPress={() => this.changeTab('SignIn')}>
                       <Text style={styles.badgeText}>Sign In</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            );
        }  else if(this.state.switchView == 'forgetPass') {
            return (
              <View style={styles.infoContainer}>
                  <TextInput style={styles.input}
                      placeholder="Enter email"
                      placeholderTextColor='rgba(255,255,255,0.8)'
                      returnKeyType='go'
                      secureTextEntry onChangeText={(text) => this.setState({forgetPassCode: text})}
                      autoCorrect={false} value={this.state.forgetPassCode}
                      ref={"txtPassword"}
                  />
                  <TouchableOpacity style={styles.buttonContainer} onPress={this.passForgotHandler}>
                      <Text style={styles.buttonText}>SEND CODE</Text>
                  </TouchableOpacity>
                  <View style={styles.badgeContainer}>
                     <TouchableOpacity onPress={() => this.changeTab('SignIn')}>
                      <Text style={styles.badgeText}>Sign In</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => this.changeTab('SignUp')}>
                       <Text style={styles.badgeText}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            );
        }
    }

    render() {
        if(this.props.token) {
            console.log("render authenticated");
            startMainTabs();
        }
        return (
          <View style={styles.container}>
              <StatusBar barStyle="light-content" />
              <KeyboardAvoidingView behavior='padding' style={styles.container}>
                  <TouchableWithoutFeedback style={styles.container}
                          onPress={Keyboard.dismiss}>
                      <View style={styles.logoContainer}>
                          <View style={styles.logoContainer}>
                              <Image style={styles.logo}
                                  source={require('../../images/logo.png')}>
                              </Image>
                              <Text style={styles.title}>Account Information</Text>
                          </View>
                          {this.swithAuthView()}
                      </View>
                  </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(32, 53, 70)',
        flexDirection: 'column',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 25,
        flex: 1
    },
    logo: {
        width: 300,
        height: 56,
    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 250,
        padding: 20,
        // backgroundColor: 'red'
    },
    infoContainer2: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 310,
        padding: 20,
        // backgroundColor: 'red'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#f7c744',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color :'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 18
    },
    badgeText: {
        textAlign: 'center',
        color :'#f7c744',
        fontWeight: 'bold',
        fontSize: 10,
        padding: 15
    },
    badgeContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
    }
})

const mapStateToProps = state => {
    return {
        errorServer: state.auth.error,
        loading: state.auth.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,url) => dispatch(actions.auth(email,password,url)),
        checkAuthState: () => dispatch( actions.authCheckState() ),
        registerUser: (name,email,password,url) => dispatch(actions.authRegister(name,email,password,url)),
        getDevicesFromStorage: () => dispatch( actions.getDevicesFromStorage() )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(AuthScreen);
