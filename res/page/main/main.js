import React, { Component } from 'react';

import {BackHandler, Platform, ToastAndroid} from 'react-native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Alert, Image} from 'react-native';


import HomeScreen from './home_page';
import WorkScreen from './work_page';
import FindScreen from './find_page';
import MineScreen from './mine_page';

const Tab = createBottomTabNavigator();

class MyTabs extends Component {

        render() {
            return (
                <Tab.Navigator
                    // 图标切换
                    screenOptions={({route}) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let image;
                            if(route.name === 'Home') {
                                if (focused) {
                                    image = <Image source={require('../../img/select-home.png')} style={{width: 23, height: 23}}></Image>
                                } else {
                                    image = <Image source={require('../../img/gray-home.png')} style={{width: 23, height: 23}}></Image>
                                }
                            } else if(route.name === 'Work'){
                                if (focused) {
                                    image = <Image source={require('../../img/work-select.png')} style={{width: 23, height: 23}}></Image>
                                } else {
                                    image = <Image source={require('../../img/work-normal.png')} style={{width: 23, height: 23}}></Image>
                                }
                            } else if(route.name === 'Find'){
                                if (focused) {
                                    image = <Image source={require('../../img/resource-select.png')} style={{width: 23, height: 23}}></Image>
                                } else {
                                    image = <Image source={require('../../img/resource-normal.png')} style={{width: 23, height: 23}}></Image>
                                }
                            } else if(route.name === 'Mine'){
                                if (focused) {
                                    image = <Image source={require('../../img/mine-select.png')} style={{width: 23, height: 23}}></Image>
                                } else {
                                    image = <Image source={require('../../img/mine-normal.png')} style={{width: 23, height: 23}}></Image>
                                }
                            }
                            return image;
                        }
                    })}
    
                    // 底部文字切换颜色
                    tabBarOptions={{
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray',
                    }}
                    
                >
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Work" component={WorkScreen} />
                    <Tab.Screen name="Find" component={FindScreen} />
                    <Tab.Screen name="Mine" component={MineScreen} />
                </Tab.Navigator>
            );
        }

        componentDidMount() {
            if (Platform.OS === 'android'){
              BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
            }
          }
        
         componentWillUnmount() {
            if (Platform.OS === 'android') {
              BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
            }
          }
        
          onBackAndroid = () => {
            //禁用返回键
            if(this.props.navigation.isFocused()) {//判断   该页面是否处于聚焦状态
                if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                  //最近2秒内按过back键，可以退出应用。
                  // return false;
                  BackHandler.exitApp();//直接退出APP
                }else{
                  this.lastBackPressed = Date.now();
                  ToastAndroid.show('再按一次退出应用', 1000);//提示
                  return true;
                }
            }
        }

}

export default module = MyTabs;

