import React, {Component} from 'react';
import { Text, View, Image, SafeAreaView, StyleSheet, StatusBar, ScrollView, TextInput, FlatList, TouchableHighlight, TouchableWithoutFeedback, Alert } from 'react-native';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import {statusBarHeight} from '../../util/apdater_util';
import Icons from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import NetUtil from '../../net/net_util';
import Storage from '../../util/storage_util';
import {BASE_URL, TokenKey, TEST_IMG} from '../../const/const';
import * as RootNavigation from '../../../App';
import CardView from 'react-native-cardview'

const topList = [
    {
      id: '1',
      title: '实名信息',
      icon: require('../../img/ic_my_top_1.png'),
    },
    {
      id: '2',
      title: '我的协议',
      icon: require('../../img/ic_my_top_2.png'),
    },
    {
      id: '3',
      title: '个人简历',
      icon: require('../../img/ic_my_top_3.png'),
    },
    {
        id: '4',
        title: '收款方式',
        icon: require('../../img/ic_my_top_4.png'),
      },
];

const middleList = [
    {
      id: '1',
      title: '已申请',
      icon: require('../../img/ic_apply_1.png'),
    },
    {
      id: '2',
      title: '申请通过',
      icon: require('../../img/ic_apply_2.png'),
    },
    {
      id: '3',
      title: '进行中',
      icon: require('../../img/ic_apply_3.png'),
    },
    {
        id: '4',
        title: '已完成',
        icon: require('../../img/ic_apply_4.png'),
    },
    {
        id: '4',
        title: '已结算',
        icon: require('../../img/ic_apply_5.png'),
    },
];

const bottomList = [
    {
      id: '1',
      title: '客服咨询',
      icon: require('../../img/ic_help_1.png'),
    },
    {
      id: '2',
      title: '投诉建议',
      icon: require('../../img/ic_help_2.png'),
    },
    {
      id: '3',
      title: '关于我们',
      icon: require('../../img/ic_help_3.png'),
    },
    {
      id: '4',
      title: '退出',
      icon: require('../../img/ic_help_3.png'),
    },
];

const TopItem = ({title, icon, callBack}) => {
    return (
      <TouchableWithoutFeedback onPress={callBack}>
        <View style={{justifyContent: 'center', alignItems: 'center', padding: 10}}>
          <Image source={icon} style={{width: 28, height: 28, marginTop: 15, resizeMode: 'contain'}} />
          <Text style={{fontSize: 13, color: 'gray', marginTop: 10, fontWeight: '900'}}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

class MinePage extends Component {

    render() {
        /* 顶部信息 */
        const topEle=[];
        topList.forEach((item, index) => {
           topEle.push(<TopItem title={item.title} icon={item.icon} keyExtractor={item => item.id} key={index}/>)
        });
        /* 中间信息 */
        const middleEle=[];
        middleList.forEach((item, index) => {
            middleEle.push(<TopItem title={item.title} icon={item.icon} keyExtractor={item => item.id} key={index}/>)
        });
        /* 底部信息 */
        const bottomEle=[];
        bottomList.forEach((item, index) => {
            bottomEle.push(<TopItem title={item.title} icon={item.icon} keyExtractor={item => item.id} key={index} callBack={() => {
              if(index == 3) {
                Alert.alert('提示', '退出登录', [
                  {text: '取消',},
                  {text: '确定', onPress: () => {
                    Storage.remove({key: TokenKey}).then(() => {
                      this.props.navigation.popToTop()
                    })
                  }
                  },
                ], { cancelable: true,})
              }
            }}/>)
        });
        return (
            <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
                <StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'} />
                <ImageBackground style={styles.topImage} source={{uri: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2588111137,2818876915&fm=26&gp=0.jpg'}}>
                    <View>
                        {/* 顶部切换角色和设置 */}
                        <View style={[styles.rowDirection, {paddingStart: 10, paddingEnd: 10, marginTop: 10}]}>
                            <Icons name='exchange-alt' size={15} color="white" style={{padding: 5}}></Icons>
                            <Text style={{color: 'white', fontSize: 15}}>切换角色</Text>
                            <Text style={{flex: 1}}></Text>
                            <AntDesign name='setting' size={17} color="white" style={{padding: 5}}></AntDesign>
                        </View>
                        {/* 头像 */}
                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20, marginHorizontal: 20}} width={'100%'}>
                            <Image style={{width: 80, height: 80, borderRadius: 200}} source={{uri: TEST_IMG}}></Image>
                            <View style={{marginHorizontal: 20, justifyContent: 'center'}}>
                                <Text style={{color: 'white', fontSize: 20}}>蓝吧新人</Text>
                                <Text style={{color: 'white', fontSize: 14}}>查看并编辑个人资料</Text>
                            </View>
                        </View>
                        {/* card */}
                        <CardView
                            style={{margin: 20}}
                            height={100}
                            cardElevation={2}
                            cardMaxElevation={2}
                            cornerRadius={5}>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>{topEle}</View>     
                        </CardView>
                    </View>
                </ImageBackground>
                {/* 我的任务 */}
                <View style={{marginTop: 80, marginHorizontal: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={styles.title}>我的任务</Text>
                        <Text style={{fontSize: 13, color: 'gray'}}> | 赶紧去做任务赚钱</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>{middleEle}</View>   
                </View>
                <View style={{backgroundColor: '#F8F8F8', height: 10}}></View>
                {/* 帮助中心 */}
                <View style={{marginTop: 20, marginHorizontal: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={styles.title}>帮助中心</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>{bottomEle}</View>   
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      justifyContent: "center",
    },
    topImage: {
      width: '100%',
      height: 230,
      paddingTop: statusBarHeight,
    },
    rowDirection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    flex1: {
      flex: 1,
    },
    wrapper: {
    },
    title: {
        fontSize: 18,
    },
})

export default module = MinePage;