import React, {Component} from 'react';
import { Text, View, Image, SafeAreaView, StyleSheet, StatusBar, ScrollView, TextInput, FlatList, TouchableHighlight, TouchableWithoutFeedback, Alert } from 'react-native';
import {statusBarHeight, width} from '../../util/apdater_util';
import Icons from 'react-native-vector-icons/Entypo';
import Eicons from 'react-native-vector-icons/EvilIcons';
import Swiper from 'react-native-swiper';
import NetUtil from '../../net/net_util';
import Storage from '../../util/storage_util';
import {BASE_URL, TEST_IMG, TokenKey} from '../../const/const';
import * as RootNavigation from '../../../App';
import MyHeader from '../../widget/my_header';

class TaskDetailPage extends Component {

    constructor(props) {
        super(props)
        const index = this.props.route.params.merchantTaskId
        this.state = {
            taskDetail: null,
            merchantTaskId: index
        }
    }
    
    componentDidMount() {
        this.getTaskDetail(this.state.merchantTaskId)
    }

    getTaskDetail(merchantTaskId) {
        let data = {'merchantTaskId': merchantTaskId}
        Storage.load({key: TokenKey}).then((value) => {
          NetUtil.postJson(BASE_URL + 'api/app/task/getMerchantTaskDetail', data, (info) => {
            if(info.code == 0) {
              this.setState({taskDetail: info.data})
            }
          }, value)
        })
        
    }

    render() {
        
        return (
            <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
                <StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'} />
                <View style={{marginTop: statusBarHeight}}></View>
                <MyHeader
                    leftOnPress ={() => {
                        this.props.navigation.pop();
                    }}
                >任务详情</MyHeader>
                <View style={{flex: 1, paddingBottom: 20}}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
                            <Image style={{width: 60, height: 60, borderRadius: 10}} source={{uri: this.state.taskDetail?.merchantLogo}}></Image>
                            <View style={{flex: 1, marginStart: 10, alignSelf: 'center', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 18}}>{this.state.taskDetail?.merchantTaskName??''}</Text>
                                <Text style={{fontSize: 13, color: 'red'}}>总费用：{this.state.taskDetail?.merchantTaskUnitPrice??'0'}</Text>
                            </View>
                            <Text style={{fontSize: 13}}>{this.state.taskDetail?.taskLocation}</Text>
                        </View>

                    <View style={styles.line}></View>
                    <View style={{flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center'}}>
                        <Icons name='location' size={15} color="gray" style={{padding: 5}}></Icons>
                        <Text style={{color: 'gray', fontSize: 15}}>{this.state.taskDetail?.taskLocation}</Text>
                    </View>
                    <View style={styles.line}></View>
                    <Text style={styles.base_title}>任务描述</Text>
                    <Text style={{fontSize: 13, color: 'gray', marginHorizontal: 20, marginVertical: 5}}>{this.state.taskDetail?.merchantTaskDesc}</Text>
                    <FlatList
                        style={{backgroundColor: 'white'}}
                        numColumns ={3} // 一行2个
                        data={this.state.taskDetail?.taskPictureList}
                        renderItem={({item, index}) => (
                            <TouchableWithoutFeedback onPress={() => {
                                RootNavigation.navigate('ZoomView', {
                                    imageUrlList: this.state.taskDetail?.taskPictureList.map((item) => {
                                      return item.picture
                                    }),
                                    index, index 
                                  })
                            }}>
                                <Image style={{width: width / 3 - 10, height: width / 3 - 10, borderRadius: 10, margin: 5}} source={{uri: item.picture}}></Image>
                            </TouchableWithoutFeedback>
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

export default module = TaskDetailPage;