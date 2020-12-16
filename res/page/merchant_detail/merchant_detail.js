import React, {Component} from 'react';
import { Text, View, Image, SafeAreaView, StyleSheet, StatusBar, ScrollView, TextInput, FlatList, TouchableHighlight, TouchableWithoutFeedback, Alert } from 'react-native';
import {statusBarHeight} from '../../util/apdater_util';
import Icons from 'react-native-vector-icons/Entypo';
import Swiper from 'react-native-swiper';
import NetUtil from '../../net/net_util';
import Storage from '../../util/storage_util';
import {BASE_URL, TokenKey, TEST_IMG} from '../../const/const';
import * as RootNavigation from '../../../App';
import MyHeader from '../../widget/my_header';

const BasicItem = ({title, content}) => {
    return (
      <View style={{backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 5, flexDirection: 'row', alignItems: 'flex-start'}}>
        <Text style={{fontSize: 14, color: 'gray', paddingEnd: 10}}>{title}</Text>
        <Text style={{fontSize: 14, color: 'black'}}>{content}</Text>
      </View>
    );
}; 
  
const TaskItem = ({title, location, time, money, callBack}) => {
    return (
      <TouchableWithoutFeedback onPress={callBack}>
        <View style={{backgroundColor: '#F8F8F8', marginHorizontal: 20, marginVertical: 5, padding: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{fontSize: 15, color: 'black', fontWeight: '900'}}>{title}</Text>
              <Text style={{fontSize: 13, color: 'gray'}}>{location}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{fontSize: 14, color: 'gray', fontWeight: '900'}}>发布时间：{time}</Text>
              <Text style={{fontSize: 11, color: 'red'}}>{money}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
};

class MerchantDetailPage extends Component {

    constructor(props) {
        super(props)
        const index = this.props.route.params.merchantId
        this.state = {
            merchantDetail: null,
            merchantId: index
        }
    }
    
    componentDidMount() {
        // 轮播图
        this.getMerchantDetail(this.state.merchantId)
    }

    getMerchantDetail(mercantId) {
        let data = {'merchantId': mercantId}
        Storage.load({key: TokenKey}).then((value) => {
          NetUtil.postJson(BASE_URL + 'api/app/merchant/getMerchantDetail', data, (info) => {
            if(info.code == 0) {
              this.setState({merchantDetail: info.data})
            }
          }, value)
        })
        
    }

    render() {
         /* banner */
         const bannerEle = [];
         this.state.merchantDetail?.merchantPicList.forEach((item, index) => {
           bannerEle.push(
             <TouchableWithoutFeedback style={{flex: 1}} key={index} onPress={() => {
               RootNavigation.navigate('ZoomView', {
                 imageUrlList: this.state.merchantDetail?.merchantPicList.map((item) => {
                   return item.picture
                 }),
                 index, index 
               })
             }}>
               <Image style={{flex: 1, borderRadius: 10}} source={{uri: item.picture}} keyExtractor={item => item.id}></Image>
             </TouchableWithoutFeedback>
           )
         })

        return (
            <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
                <StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'} />
                <View style={{marginTop: statusBarHeight}}></View>
                <MyHeader
                    leftOnPress ={() => {
                        this.props.navigation.pop();
                    }}
                >企业详情</MyHeader>
                <View style={{flex: 1, paddingBottom: 20}}>
                    
                    <FlatList
                        ListHeaderComponent={
                            <>
                            <View>
                                <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
                                    <Image style={{width: 60, height: 60, borderRadius: 10}} source={{uri: this.state.merchantDetail?.merchantLogo}}></Image>
                                    <View style={{flex: 1, marginStart: 10, alignSelf: 'center', justifyContent: 'space-between'}}>
                                      <Text style={{fontSize: 18}}>{this.state.merchantDetail?.merchantName}</Text>
                                      <Text style={{fontSize: 13}}>{this.state.merchantDetail?.city} | {this.state.merchantDetail?.scale} | {this.state.merchantDetail?.nature}</Text>
                                    </View>
                                    <View>
                                      <Text style={{backgroundColor: 'green', color: 'white', padding: 4, borderRadius: 5, fontSize: 11, alignContent: 'center'}}>已认证</Text>
                                    </View>
                                </View>

                                <View style={styles.line}></View>
                                <View style={{flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center'}}>
                                    <Icons name='location' size={15} color="gray" style={{padding: 5}}></Icons>
                                    <Text style={{color: 'gray', fontSize: 15}}>苏州</Text>
                                </View>
                                <View style={styles.line}></View>

                                {/* 轮播图 */}
                                <View style={{padding: 20, height: 200}}>
                                    <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}
                                        dot={<View style={{ backgroundColor: 'gray', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                                        activeDot={<View style={{ backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />} 
                                        paginationStyle={{
                                            bottom: 8,
                                        }} >{bannerEle}</Swiper>
                                </View>

                                <Text style={styles.base_title}>基本信息</Text>
                                <BasicItem title={'名       称'} content={this.state.merchantDetail?.merchantName}></BasicItem>
                                <BasicItem title={'规       模'} content={this.state.merchantDetail?.scale}></BasicItem>
                                <BasicItem title={'性       质'} content={this.state.merchantDetail?.nature}></BasicItem>
                                <BasicItem title={'成立时间'} content={this.state.merchantDetail?.establishTime}></BasicItem>
                                <BasicItem title={'注册资金'} content={this.state.merchantDetail?.funds}></BasicItem>
                                <BasicItem title={'经营范围'} content={this.state.merchantDetail?.merchantRange}></BasicItem>
                                <Text style={styles.base_title}>任务列表（{this.state.merchantDetail?.merchantTaskList?.length}）</Text>
                            </View>
                            </>
                        }
                        style={{backgroundColor: 'white'}}
                        data={this.state.merchantDetail?.merchantTaskList}
                        renderItem={({item}) => (
                            <TaskItem title={item.merchantTaskName} location={item.taskLocation} time={item.createdTime} money={item.merchantTaskUnitPrice} callBack={() => {
                              RootNavigation.navigate('TaskDetailPage', {
                                merchantTaskId: item.id
                              })
                            }}></TaskItem>
                        )}
                        keyExtractor={item => item.id}
                        >
                    </FlatList>
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
    line: {
        backgroundColor: '#F4F4F4',
        height: 1,
        marginHorizontal: 20
    },
    base_title : {
        fontSize: 17,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 10,
    },
})

export default module = MerchantDetailPage;