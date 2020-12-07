/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomePage from './src/page/home/home';
import WorkPage from './src/page/work/work';
import FindPage from './src/page/find/find';
import MyPage from './src/page/my/my';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === '首页') {
            iconName = focused ? <Image source={require('./src/res/select-home.png')} style={{width: 20, height: 20}}></Image> : <Image source={require('./src/res/gray-home.png')} style={{width: 20, height: 20}}></Image>;
          } else if (route.name === '工作') {
            iconName = focused ? <Image source={require('./src/res/work-select.png')} style={{width: 20, height: 20}}></Image> : <Image source={require('./src/res/work-normal.png')} style={{width: 20, height: 20}}></Image>;
          } else if (route.name === '发现') {
            iconName = focused ? <Image source={require('./src/res/resource-select.png')} style={{width: 20, height: 20}}></Image> : <Image source={require('./src/res/resource-normal.png')} style={{width: 20, height: 20}}></Image>;
          } else if (route.name === '我的') {
            iconName = focused ? <Image source={require('./src/res/mine-select.png')} style={{width: 20, height: 20}}></Image> : <Image source={require('./src/res/mine-normal.png')} style={{width: 20, height: 20}}></Image>;
          }  

          return iconName;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="首页" component={HomePage} headerMode="none"/>
      <Tab.Screen name="工作" component={WorkPage} />
      <Tab.Screen name="发现" component={FindPage} />
      <Tab.Screen name="我的" component={MyPage} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main" headerMode="none">
          <Stack.Screen name="Main" component={MyTabs}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    
  );
}

export default App;
