/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Text, Button  } from 'native-base';

export default class App extends Component {

    state = {
        email: '',
        password: ''
    }

    loginHandler = () => {

    }

    render() {
        return (
            <Container>
                <Header />
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Username" />
                        </Item>
                        <Item>
                            <Input placeholder="Password" />
                        </Item>
                        <Item last>
                            <Input placeholder="Repeat Password" />
                        </Item>
                        <Button full block onPress={this.loginHandler}><Text> Sign Up </Text></Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
