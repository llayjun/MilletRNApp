import React, {Component} from 'react';
import { Alert, Button, TextInput, Text, View, StyleSheet, StatusBar, ToastAndroid } from 'react-native';
import CheckBox from '../../widget/check_box';
import MyButton from '../../widget/my_button';
import {statusBarHeight} from '../../util/apdater_util';
import NetUtil from '../../net/net_util';
import Storage from '../../util/storage_util';
import {BASE_URL, TokenKey} from '../../const/const';
import * as RootNavigation from '../../../App';

class LoginPage extends Component {

    state = {username: '', password: '', toggleCheckBox: false, disabled: true};

    constructor(props) {
        super(props);
    } 

    // 判断登录跳转
    async jump() {
        try {
            const tokenValue = await Storage.load({key: TokenKey})
            if(tokenValue != '' && tokenValue != null) {
                RootNavigation.navigate('Main')
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    // 登录
    login(callback) {
        let data = {'mobile': this.state.username, 'passWord': this.state.password};
        NetUtil.postJson(BASE_URL + 'api/app/users/userLogin', data, callback, '');
    }

    render() {
        this.jump()
        return (
            <View style={{backgroundColor: 'white'}}>
                <StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'} />
                <View style={{marginTop: statusBarHeight}}></View>
                <Text onPress={() => {this.props.navigation.push('Register')}} style={{fontSize: 18, textAlign: 'right', paddingRight: 20, paddingTop: 10} }>注册</Text>
                <View style={styles.rootView}>
                    <Text style={{color: 'black', fontSize: 25}}>手机快捷登录</Text>
                    <Text style={{color: 'gray', fontSize: 15, marginTop: 10}}>未注册过的手机号将自动创建账号</Text>
                    <TextInput
                        style={[styles.inputView, {marginTop: 20}]}
                        placeholder="请输入账号"
                        value={this.state.username}
                        onChangeText={text => this.setState({username: text})}
                        defaultValue={this.state.username}
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
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                        <CheckBox
                            isChecked = {false}
                            chekOnPress={(flag) => {
                                this.setState({disabled: flag})
                            }}
                        />
                        <Text style={{marginStart: 10, fontSize: 12}}>我已阅读并同意《蓝吧社区隐私政策》及《蓝吧社区用户服务协议》</Text>
                    </View>
                    <MyButton 
                            underlayColor='gray'
                            underlayTxtColor='#FFFFFF'
                            txtStyle={{color: '#FFFFFF', fontSize: 15, textAlign: 'center'}}
                            style={{
                                height: 40, 
                                padding: 0, 
                                backgroundColor: this.state.disabled == false? '#7bbfea': 'gray',
                                borderRadius: 4, 
                                marginTop: 40
                            }}
                            disabled={this.state.disabled}
                            onPress={() => {
                                if (this.state.username === '') {
                                    ToastAndroid.show('请输入账号', 10000)
                                    return
                                }
                                if (this.state.password === '') {
                                    ToastAndroid.show('请输入密码', 10000)
                                    return
                                }
                                this.login((info) => {
                                    if(info.code == 0) {
                                        ToastAndroid.show(info.msg, 10000)
                                        // 存储用户Token
                                        Storage.save({
                                            key: TokenKey,
                                            data: info.data.authorization,
                                        })
                                        RootNavigation.navigate('Main')
                                        return
                                    } else {
                                        ToastAndroid.show(info.msg, 10000)
                                        return
                                    }
                                })
                            }}>立即登录</MyButton>
                    {/* < */}
                    {/* <Button title={'登录'} onPress={() => this.props.navigation.push('Main')}></Button> */}
                </View>
            </View>
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

export default module = LoginPage;