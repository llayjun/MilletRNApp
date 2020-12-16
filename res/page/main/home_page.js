import React, {Component} from 'react';
import { Text, View, Image, SafeAreaView, StyleSheet, StatusBar, ScrollView, TextInput, FlatList, TouchableHighlight, TouchableWithoutFeedback, Alert } from 'react-native';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import {statusBarHeight} from '../../util/apdater_util';
import Icons from 'react-native-vector-icons/Entypo';
import Eicons from 'react-native-vector-icons/EvilIcons';
import Swiper from 'react-native-swiper';
import NetUtil from '../../net/net_util';
import Storage from '../../util/storage_util';
import {BASE_URL, TokenKey} from '../../const/const';
import * as RootNavigation from '../../../App';

const topList = [
  {
    id: '1',
    title: '优质任务',
    subTitle: '各种高质量任务',
    icon: require('../../img/ic_top_1.png'),
  },
  {
    id: '2',
    title: '高薪兼职',
    subTitle: '有着丰厚报酬',
    icon: require('../../img/ic_top_2.png'),
  },
  {
    id: '3',
    title: '企业任务',
    subTitle: '合作企业发布任务',
    icon: require('../../img/ic_top_3.png'),
  },
];

const TopItem = ({title, subContent, icon, callBack}) => {
  return (
    <TouchableWithoutFeedback onPress={callBack}>
      <View style={{justifyContent: 'center', alignItems: 'center', padding: 10}} onPress={callBack}>
        <Image source={icon} style={{width: 30, height: 30, marginTop: 15}}/>
        <Text style={{fontSize: 14, color: 'black', marginTop: 5, fontWeight: '900'}}>{title}</Text>
        <Text style={{fontSize: 11, color: 'gray'}}>{subContent}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const MiddleItem = ({image, title, num, callBack}) => {
  return (
    <TouchableWithoutFeedback onPress={callBack}>
      <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 15, backgroundColor: '#F8F8F8', borderRadius: 5, width: 120, margin: 5}} onPress={callBack}>
      <View style={{borderRadius: 5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 5}}>
        <Image source={{uri: image}} style={{width: 40, height: 40, borderRadius: 55}}/>
      </View>
      <Text style={{fontSize: 13, color: 'black', marginTop: 5}}>{title}</Text>
      <Text style={{fontSize: 11, color: 'gray'}}>累计{num}个任务</Text>
    </View>
    </TouchableWithoutFeedback>
  );
}; 

const BottomItem = ({image, title, content, merchantName, money, callBack}) => {
  return (
    <TouchableWithoutFeedback onPress={callBack}>
      <View style={{alignItems: 'flex-start', padding: 5, backgroundColor: '#ffffff', borderRadius: 10, width: '100%', padding: 5, flexDirection: 'row'}}>
        <Image source={{uri: image}} style={{width: 60, height: 60, margin: 5, borderRadius: 5}}/>
        <View style={{paddingStart: 10, paddingEnd: 10, flex: 1}}>
          <Text style={{fontSize: 14, color: 'black', marginTop: 5}}>{title}</Text>
          <View style={{borderRadius: 5, backgroundColor: '#F8F8F8', padding: 5, marginTop: 8}}>
            <Text style={{fontSize: 12, color: 'gray',}} numberOfLines={2}>{content}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <Text style={{fontSize: 14, color: 'black', flex: 1}}>{merchantName}</Text>
            <Text style={{fontSize: 11, color: 'red'}}>￥{money}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}; 

class HomePage extends Component {

    constructor(props) {
      super(props);
    } 

    state = {
      // 轮播图
      bannerList: [],
      // 推荐企业
      reMercahntList: [],
      // 推荐任务
      reTaskList: [],
    }

    componentDidMount() {
      // 轮播图
      this.getBanner()
      this.getReMerchant()
      this.getReTask()
    }

    getBanner() {
      Storage.load({key: TokenKey}).then((value) => {
        NetUtil.get(BASE_URL + 'api/app/banner/getBannerList', (info) => {
          if(info.code == 0) {
            this.setState({bannerList: info.data})
          }
        }, value)
      })
      
    }

    getReMerchant() {
      Storage.load({key: TokenKey}).then((value) => {
        NetUtil.get(BASE_URL + 'api/app/merchant/getMerchantList', (info) => {
          if(info.code == 0) {
            this.setState({reMercahntList: info.data})
          }
        }, value)
      })
      
    }

    getReTask() {
      Storage.load({key: TokenKey}).then((value) => {
        NetUtil.get(BASE_URL + 'api/app/task/getMerchantTaskList', (info) => {
          if(info.code == 0) {
            this.setState({reTaskList: info.data})
          }
        }, value)
      })
    }

    render() {
        /* banner */
        const bannerEle = [];
        this.state.bannerList.forEach((item, index) => {
          bannerEle.push(
            <TouchableWithoutFeedback style={{flex: 1}} onPress={() => {
              RootNavigation.navigate('ZoomView', {
                imageUrlList: this.state.bannerList.map((item) => {
                  return item.imageUrl
                }),
                index, index 
              })
            }} key={index}>
              <Image style={{flex: 1, borderRadius: 10}} source={{uri: item.imageUrl}} keyExtractor={item => item.id}></Image>
            </TouchableWithoutFeedback>
          )
        })
        /* 顶部任务 */
        const topEle=[];
        topList.forEach((item, index) => {
          topEle.push(<TopItem title={item.title} subContent={item.subTitle} icon={item.icon} keyExtractor={item => item.id} key={index} callBack={() => {
            if(index == 1) {
              RootNavigation.navigate('WorkPage')
            } else {
              RootNavigation.navigate('FindPage')
            }
          }} key={index}/>)
        });
        return (
            <SafeAreaView style={{backgroundColor: 'white'}}>
                <StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'} />
                <FlatList
                  ListHeaderComponent={
                    <>
                      <ImageBackground style={styles.topImage} source={{uri: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=314202116,1401007204&fm=26&gp=0.jpg'}}>
                        {/* 顶部搜索 */}
                        <View style={[styles.rowDirection, {paddingStart: 10, paddingEnd: 10, marginTop: 10}]}>
                          <Icons name='location' size={15} color="white" style={{padding: 5}}></Icons>
                          <Text style={{color: 'white', fontSize: 15}}>苏州</Text>
                          <View style={[styles.flex1, styles.rowDirection, {justifyContent: 'flex-start', height: 30, marginStart: 20, marginEnd: 20, backgroundColor: 'white', borderRadius: 15}]}>
                            <Eicons name='search' size={15} color="gray" style={{padding: 5}}></Eicons>
                            <Text style={{color: 'gray', fontSize: 12}}>搜索职位名称</Text>
                          </View>
                          <Text style={{color: 'white', fontSize: 15}}>我的文章</Text>
                        </View>
                        {/* 轮播图 */}
                        <View style={{padding: 20, flex: 1}}>
                          <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}
                              dot={<View style={{ backgroundColor: 'gray', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                              activeDot={<View style={{ backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />} 
                              paginationStyle={{
                                bottom: -18,
                              }} 
                              >{bannerEle}</Swiper>
                        </View>
                      </ImageBackground>
                      {/* 顶部 */}
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>{topEle}</View>
                      {/* 推荐企业 */}
                      <View style={{flexDirection: 'row', padding: 10, backgroundColor: 'white'}}>
                        <Text style={{color: 'black', fontSize: 18, fontWeight: '800', flex: 1}}>推荐企业</Text>
                        <Text style={{color: 'black', fontSize: 12}} onPress={() => {
                          RootNavigation.navigate('WorkPage')
                        }}>{'查看更多>'}</Text>
                      </View>
                      <FlatList
                        style={{marginStart: 5, marginEnd: 5, backgroundColor: 'white'}}
                        horizontal={true}
                        showsHorizontalScrollIndicator = {false}
                        data={this.state.reMercahntList}
                        renderItem={({item}) => (
                          <MiddleItem title={item.merchantName} num={item.merchantTaskNum} image={item.merchantLogo} callBack={() => {
                            RootNavigation.navigate('MerchantDetailPage', {
                              merchantId: item.id
                            })
                          }}/>
                        )}
                        keyExtractor={item => item.id}
                      ></FlatList>
                      {/* 推荐任务 */}
                      <View style={{flexDirection: 'row', padding: 10, backgroundColor: 'white'}}>
                        <Text style={{color: 'black', fontSize: 18, fontWeight: '800', flex: 1}}>推荐任务</Text>
                        <Text style={{color: 'black', fontSize: 12}} onPress={() => {
                          RootNavigation.navigate('FindPage')
                        }}>{'查看更多>'}</Text>
                      </View>
                    </>
                  }
                  style={{backgroundColor: 'white'}}
                  data={this.state.reTaskList}
                  renderItem={({item}) => (
                    <BottomItem title={item.merchantTaskName} image={item.merchantLogo} merchantName={item.merchantName} content={item.merchantTaskDesc} money={item.merchantTaskUnitPrice} callBack={() => {
                      RootNavigation.navigate('TaskDetailPage', {
                        merchantTaskId: item.id
                      })
                    }}/>
                  )}
                  ItemSeparatorComponent={() => {
                    return <View height={6} style={{backgroundColor: '#F8F8F8'}}></View>
                  }}
                  keyExtractor={item => item.id}
                  >
                </FlatList>
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
})

export default module = HomePage;