/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './res/page/login/login_page';
import RegisterPage from './res/page/register/register_page';
import ZoomViewPage from './res/widget/zoom_view';
import MyTabs from './res/page/main/main';
import WorkPage from './res/page/main/work_page';
import FindPage from './res/page/main/find_page';
import MerchantDetailPage from './res/page/merchant_detail/merchant_detail';
import TaskDetailPage from './res/page/task_detail/task_detail';
import Storage from './res/util/storage_util';
import {BASE_URL, TokenKey} from './res/const/const';
import SplashScreen from 'react-native-splash-screen'

const navigationRef = React.createRef();

// 全局跳转
export function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

const Stack = createStackNavigator();

// 初始化操作
class App extends Component {

  state = {initName: 'Login'}

  componentDidMount() {
    setTimeout(()=>{
      SplashScreen.hide()
    }, 3000, )
    
  }

  render() {
    return(
      <NavigationContainer ref={navigationRef} >
        <Stack.Navigator initialRouteName={'Login'} headerMode={'none'} >
          {/* 登录 */}
          <Stack.Screen name="Login" component={LoginPage} />
          {/* 注册 */}
          <Stack.Screen name="Register" component={RegisterPage} />
          {/* 主页 */}
          <Stack.Screen name="Main" component={MyTabs} />
          {/* 查看图片 */}
          <Stack.Screen name="ZoomView" component={ZoomViewPage} />
          {/* 更多企业 */}
          <Stack.Screen name="WorkPage" component={WorkPage} />
          {/* 企业详情 */}
          <Stack.Screen name="MerchantDetailPage" component={MerchantDetailPage} />
          {/* 更多任务 */}
          <Stack.Screen name="FindPage" component={FindPage} />
          {/* 任务详情 */}
          <Stack.Screen name="TaskDetailPage" component={TaskDetailPage} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

}

export default App;
