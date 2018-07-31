import React, {Component} from 'react';
import axios from 'axios';
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import startMainTabs from '../MainTabs/startMainTab';
import Login from '../../Component/Login/Login';

class AuthScreen extends Component {

    state = {
        switchView: 'SignIn',
        registerData: {
            name: '',
            email: '',
            pass: ''
        },
        loginData: {
            email: '',
            pass: ''
        }
    }
    signInHandler = () => {
       startMainTabs();
    }

    passForgotHandler = () => {
       startMainTabs();
    }

    singUpHandler = () => {
        startMainTabs();
        // let url;
        // axios.post(url,{name: this.state.registerData.name, email: this.state.registerData.email, pass: this.state.registerData.pass})
        //     .then(() => {})
        //     .catch(() => {});
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
                      returnKeyType='next'
                      autoCorrect={false}
                      onSubmitEditing={()=> this.refs.txtPassword.focus()}
                  />
                  <TextInput style={styles.input}
                      placeholder="Enter password"
                      placeholderTextColor='rgba(255,255,255,0.8)'
                      returnKeyType='go'
                      secureTextEntry
                      autoCorrect={false}
                      ref={"txtPassword"}
                  />
                  <TouchableOpacity style={styles.buttonContainer} onPress={this.signInHandler}>
                      <Text style={styles.buttonText}>SIGN IN</Text>
                  </TouchableOpacity>
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
                  returnKeyType='next'
                  autoCorrect={false}
                  onSubmitEditing={()=> this.refs.txtPassword.focus()}
              />
                  <TextInput style={styles.input}
                      placeholder="Enter email"
                      placeholderTextColor='rgba(255,255,255,0.8)'
                      keyboardType='email-address'
                      returnKeyType='next'
                      autoCorrect={false}
                      onSubmitEditing={()=> this.refs.txtPassword.focus()}
                  />
                  <TextInput style={styles.input}
                      placeholder="Enter password"
                      placeholderTextColor='rgba(255,255,255,0.8)'
                      returnKeyType='go'
                      secureTextEntry
                      autoCorrect={false}
                      ref={"txtPassword"}
                  />
                  <TouchableOpacity style={styles.buttonContainer} onPress={this.singUpHandler}>
                      <Text style={styles.buttonText}>SIGN UP</Text>
                  </TouchableOpacity>
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
                      secureTextEntry
                      autoCorrect={false}
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
        width: 128,
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

export default AuthScreen;
