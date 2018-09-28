import React, { Component } from 'react';
import {StyleSheet, Modal, Text, TouchableOpacity, View, Picker} from 'react-native'
import Task from '../Task/Task';
import CheckBox from 'react-native-check-box';

class CommandSetting extends Component {

    state = {
        modalVisible: false,year: '1397', month: '06', day: '10',hour: '12', minute: '20',
        isDateTimeChecked: false,isServerChecked: false, inAfterTime: false
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    sendData = () => {
        this.props.setDateTime(this.state.inAfterTime, this.state.month, this.state.day, this.state.hour, this.state.minute);
        this.setModalVisible(false);
    };

    render() {
        // let daysnumber = 31 ;
        // let daysPickerItem;
        // if(parseInt(this.state.month) > 6) {daysnumber = 30 ;}
        // for(let i=0;i<daysnumber;i++) {
        //     let temp;
        //     if(i<10) {temp = '0'+i; } else {temp = i;}
        //     daysPickerItem +=  <Picker.Item label={temp} value={temp} /> ;
        // }
        let date = '';
        if(this.state.inAfterTime) {
            date =  this.state.month + '/' + this.state.day ;
        } else { date =   this.state.day ; }
        return (
            <View style={{marginTop: 22, alignItems: 'center'}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Select Date</Text>
                        <View style={styles.rowContainer}>
                            { !this.state.inAfterTime && <Picker
                                selectedValue={this.state.month}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({month: itemValue})}>
                                <Picker.Item label="00" value="00" /><Picker.Item label="01" value="01" /><Picker.Item label="02" value="02" />
                                <Picker.Item label="03" value="03" /><Picker.Item label="04" value="04" />
                                <Picker.Item label="05" value="05" /><Picker.Item label="06" value="06" />
                                <Picker.Item label="07" value="07" /><Picker.Item label="08" value="08" />
                                <Picker.Item label="09" value="09" /><Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" /><Picker.Item label="12" value="12" />
                            </Picker> }
                            <Picker
                                selectedValue={this.state.day}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({day: itemValue})}>
                                <Picker.Item label="00" value="00" /><Picker.Item label="01" value="01" /><Picker.Item label="02" value="02" />
                                <Picker.Item label="03" value="03" /><Picker.Item label="04" value="04" />
                                <Picker.Item label="05" value="05" /><Picker.Item label="06" value="06" />
                                <Picker.Item label="07" value="07" /><Picker.Item label="08" value="08" />
                                <Picker.Item label="09" value="09" /><Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" /><Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" /><Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" /><Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" /><Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" /><Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" /><Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" /><Picker.Item label="24" value="24" />
                                <Picker.Item label="25" value="25" /><Picker.Item label="26" value="26" />
                                <Picker.Item label="27" value="27" /><Picker.Item label="28" value="28" />
                                <Picker.Item label="29" value="29" /><Picker.Item label="30" value="30" />
                            </Picker>
                        </View>
                        <Text style={styles.title}>Select Time</Text>
                        <View style={styles.rowContainer}>
                            <Picker
                                selectedValue={this.state.hour}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({hour: itemValue})}>
                                <Picker.Item label="00" value="00" /><Picker.Item label="01" value="01" /><Picker.Item label="02" value="02" />
                                <Picker.Item label="03" value="03" /><Picker.Item label="04" value="04" />
                                <Picker.Item label="05" value="05" /><Picker.Item label="06" value="06" />
                                <Picker.Item label="07" value="07" /><Picker.Item label="08" value="08" />
                                <Picker.Item label="09" value="09" /><Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" /><Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" /><Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" /><Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" /><Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" /><Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" /><Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" /><Picker.Item label="24" value="24" />
                            </Picker>
                            <Text style={{margin: 5, color: '#FFF',marginTop: 20}}>:</Text>
                            <Picker
                                selectedValue={this.state.minute}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({minute: itemValue})}>
                                <Picker.Item label="01" value="01" /><Picker.Item label="02" value="02" />
                                <Picker.Item label="03" value="03" /><Picker.Item label="04" value="04" />
                                <Picker.Item label="05" value="05" /><Picker.Item label="06" value="06" />
                                <Picker.Item label="07" value="07" /><Picker.Item label="08" value="08" />
                                <Picker.Item label="09" value="09" /><Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" /><Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" /><Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" /><Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" /><Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" /><Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" /><Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" /><Picker.Item label="24" value="24" />
                                <Picker.Item label="25" value="25" /><Picker.Item label="26" value="26" />
                                <Picker.Item label="27" value="27" /><Picker.Item label="28" value="28" />
                                <Picker.Item label="29" value="29" /><Picker.Item label="30" value="30" />
                                <Picker.Item label="31" value="31" /><Picker.Item label="32" value="32" />
                                <Picker.Item label="33" value="33" /><Picker.Item label="34" value="34" />
                                <Picker.Item label="35" value="35" /><Picker.Item label="36" value="36" />
                                <Picker.Item label="37" value="37" /><Picker.Item label="38" value="38" />
                                <Picker.Item label="39" value="39" /><Picker.Item label="40" value="40" />
                                <Picker.Item label="41" value="41" /><Picker.Item label="42" value="42" />
                                <Picker.Item label="43" value="43" /><Picker.Item label="44" value="44" />
                                <Picker.Item label="45" value="45" /><Picker.Item label="46" value="46" />
                                <Picker.Item label="47" value="47" /><Picker.Item label="48" value="48" />
                                <Picker.Item label="49" value="49" /><Picker.Item label="50" value="50" />
                                <Picker.Item label="51" value="51" /><Picker.Item label="52" value="52" />
                                <Picker.Item label="53" value="53" /><Picker.Item label="54" value="54" />
                                <Picker.Item label="55" value="55" /><Picker.Item label="56" value="56" />
                                <Picker.Item label="57" value="57" /><Picker.Item label="58" value="58" />
                                <Picker.Item label="59" value="59" /><Picker.Item label="60" value="60" />
                            </Picker>
                        </View>
                        <View style={styles.rowContainer}>
                            <CheckBox style={{flex: 1, padding: 10}} leftTextStyle={{ color: '#FFF'}} checkBoxColor='#FFF'
                                      onClick={ () => { this.setState({inAfterTime:!this.state.inAfterTime});} }
                                      isChecked={this.state.inAfterTime} leftText={"AfterTime"}
                            />
                            <CheckBox style={{flex: 1, padding: 10}} leftTextStyle={{ color: '#FFF'}} checkBoxColor='#FFF'
                                      onClick={ () => { this.setState({inAfterTime:!this.state.inAfterTime});} }
                                      isChecked={!this.state.inAfterTime} leftText={"In Time"}
                            />
                        </View>
                        <TouchableOpacity style={styles.taskContainer} onPress={() => {this.sendData();}}><Task name={'Set'} /></TouchableOpacity>
                    </View>
                </Modal>
                <View style={styles.rowContainer}>
                    <CheckBox style={{flex: 1, padding: 10}} leftTextStyle={{ color: '#FFF'}} checkBoxColor='#FFF'
                              onClick={ () => { this.setState({isDateTimeChecked:!this.state.isDateTimeChecked}); this.props.setCheckDateTime(!this.state.isDateTimeChecked);} }
                              isChecked={this.state.isDateTimeChecked} leftText={"Date&Time"}
                    />
                    <CheckBox style={{flex: 1, padding: 10}} leftTextStyle={{ color: '#FFF'}} checkBoxColor='#FFF'
                              onClick={ () => { this.setState({isServerChecked:!this.state.isServerChecked}); this.props.setCheckServer(!this.state.isServerChecked);} }
                              isChecked={this.state.isServerChecked} leftText={"send to Server"}
                    />
                </View>
                { this.state.isDateTimeChecked && <Text style={styles.title}>{date} , {this.state.hour} : {this.state.minute}</Text>}
                { this.state.isDateTimeChecked && <TouchableOpacity style={styles.taskContainer} onPress={() => {this.setModalVisible(true);}}><View style={styles.container2}><Text style={styles.text}>set Date and Time</Text></View></TouchableOpacity>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(32, 53, 70)',
        flexDirection: 'column',
        flex: 1, alignItems: 'center'
    },
    container2: {
        backgroundColor: '#f7c744',alignItems: 'center',paddingHorizontal: 10,paddingVertical: 10,width: 150,
    },
    text: {
        color :'rgb(32, 53, 70)',textAlign: 'center',fontSize: 15,
    },
    picker: {height: 50, width: 100, margin: 5, color: '#FFF'},
    rowContainer: {
        flexDirection: 'row', justifyContent: 'space-around'
    },
    taskContainer: {
        margin: 5,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 25,
        flex: 1
    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    buttonsView: {
        flexDirection: 'row',padding: 10, alignItems: 'center',justifyContent: 'center'
    },
    buttons: {
        width: 110, height: 40, marginLeft: 15, marginRight: 15
    },
    buttonContainer: {
        backgroundColor: '#f7c744',
        paddingVertical: 15,
        margin: 20
    },
    buttonText: {
        textAlign: 'center',
        color :'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default CommandSetting;
