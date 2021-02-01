import React, {Component} from 'react';
import { Alert, Button, TextInput, Text, View, StyleSheet, StatusBar, TouchableOpacity, Keyboard} from 'react-native';
import MyButton from '../../widget/my_button';
import MyHeader from '../../widget/my_header';
import {statusBarHeight} from '../../util/apdater_util';
import * as RootNavigation from '../../../App';
import NetUtil from '../../net/net_util';
import {BASE_URL, TokenKey} from '../../const/const';
import Storage from '../../util/storage_util';
import Toast, {DURATION} from 'react-native-easy-toast';

class RegisterPage extends Component {

    state = {username: '', phonenum: '', password: '',};

    // 注册
    register(callback) {
        let data = {'mobile': this.state.username, 'name': this.state.phonenum, 'passWord': this.state.password};
        NetUtil.postJson(BASE_URL + 'api/app/users/register', data, callback, '');
    }

      render() {
        return (
            <TouchableOpacity onPress={() => {
                Keyboard.dismiss()
            }} activeOpacity={1} style={{flex: 1}}>
                <View style={{backgroundColor: 'white'}}>
                <StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'} />
                <View style={{marginTop: statusBarHeight}}></View>
                <MyHeader
                    leftOnPress ={() => {
                        this.props.navigation.pop();
                    }}
                >注册账号</MyHeader>
                <View style={styles.rootView}>
                    <TextInput
                        style={[styles.inputView, {marginTop: 20}]}
                        placeholder="请输入姓名"
                        value={this.state.username}
                        onChangeText={text => this.setState({username: text})}
                        defaultValue={this.state.username}
                        underlineColorAndroid='#e2e2e2'
                    />
                    <TextInput
                        style={[styles.inputView, {marginTop: 10}]}
                        placeholder="请输入手机号"
                        value={this.state.phonenum}
                        onChangeText={text => this.setState({phonenum: text})}
                        defaultValue={this.state.phonenum}
                        underlineColorAndroid='#e2e2e2'
                    />
                    <TextInput
                        style={[styles.inputView, {marginTop: 10}]}
                        placeholder="请输入密码"
                        value={this.state.password}
                        onChangeText={text => this.setState({password: text})}
                        defaultValue={this.state.password}
                        underlineColorAndroid='#e2e2e2'
                    />
                    <MyButton 
                            underlayColor='gray'
                            underlayTxtColor='#FFFFFF'
                            txtStyle={{color: '#FFFFFF', fontSize: 15, textAlign: 'center'}}
                            style={{height: 40, padding: 0, backgroundColor: '#7bbfea', borderRadius: 4, marginTop: 40}}
                            onPress={() => {
                                if (this.state.username === '') {
                                    this.toast.show('请输入姓名', 10000)
                                    return
                                }
                                if (this.state.phonenum === '') {
                                    this.toast.show('请输入手机号', 10000)
                                    return
                                }
                                if (this.state.password === '') {
                                    this.toast.show('请输入密码', 10000)
                                    return
                                }
                                this.register((info) => {
                                    if(info.code == 0) {
                                        this.toast.show(info.msg, 10000)
                                        this.props.navigation.popToTop()
                                        return
                                    } else {
                                        this.toast.show(info.msg, 10000)
                                        return
                                    }
                                })
                            }}>注册</MyButton>
                </View>
                <Toast ref={(toast) => this.toast = toast}/>
            </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    rootView: {
        height: '100%',
        backgroundColor: 'white', 
        paddingStart: 35, 
        paddingEnd: 35,
        paddingTop: 80,
    },
    inputView: {
        height: 60,
    },
});

export default module = RegisterPage;