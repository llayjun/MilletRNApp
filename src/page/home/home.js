import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    TextInput,
    FlatList,
    StatusBar,
  } from 'react-native';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';

import {unitWidth, width, statusBarHeight} from '../../util/apdater_util';
import Icon from 'react-native-vector-icons/EvilIcons';

import Swiper from 'react-native-swiper';

const topList = [
  {
    id: '1',
    title: '优质任务',
    subTitle: '各种高质量任务',
    icon: require('../../res/ic_top_1.png'),
  },
  {
    id: '2',
    title: '高薪兼职',
    subTitle: '有着丰厚报酬',
    icon: require('../../res/ic_top_2.png'),
  },
  {
    id: '3',
    title: '企业任务',
    subTitle: '合作企业发布任务',
    icon: require('../../res/ic_top_3.png'),
  },
];

const middleList = [
  {
    id: '1',
    title: '如意馄饨',
    num: 2,
    icon: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023806798,280362912&fm=26&gp=0.jpg',
  },
  {
    id: '2',
    title: '肯德基',
    num: 3,
    icon: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3065335715,4197701299&fm=26&gp=0.jpg',
  },
  {
    id: '3',
    title: '丰田汽车',
    num: 4,
    icon: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3947572783,1476163811&fm=26&gp=0.jpg',
  },
  {
    id: '4',
    title: '东北馄饨',
    num: 4,
    icon: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3947572783,1476163811&fm=26&gp=0.jpg',
  },
  {
    id: '5',
    title: '烧烤',
    num: 2,
    icon: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3947572783,1476163811&fm=26&gp=0.jpg',
  },
];

const bottomList = [
  {
    id: '1',
    title: '如意馄饨',
    money: 20,
    content: '如意馄饨好吃',
    icon: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023806798,280362912&fm=26&gp=0.jpg',
  },
  {
    id: '2',
    title: '肯德基',
    money: 20,
    content: '肯德基好吃',
    icon: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3065335715,4197701299&fm=26&gp=0.jpg',
  },
  {
    id: '3',
    title: '丰田汽车',
    money: 20,
    content: '丰田汽车好',
    icon: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3947572783,1476163811&fm=26&gp=0.jpg',
  },
  {
    id: '4',
    title: '东北馄饨',
    money: 20,
    content: '东北馄饨好吃',
    icon: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1248103273,3481633462&fm=26&gp=0.jpg',
  },
  {
    id: '5',
    title: '烧烤',
    money: 20,
    content: '烧烤好吃',
    icon: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2271338977,1611087163&fm=26&gp=0.jpg',
  },
];

const TopItem = ({title, subContent, icon}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', padding: 5, width: width/3}}>
      <Image source={icon} style={{width: 36, height: 36, marginTop: 5}}/>
      <Text style={{fontSize: 14, color: 'black', marginTop: 5}}>{title}</Text>
      <Text style={{fontSize: 12, color: 'gray'}}>{subContent}</Text>
    </View>
  );
};

const MiddleItem = ({image, title, num}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#B0C0C0', borderRadius: 10, width: 120, margin: 5}}>
      <Image source={{uri: image}} style={{width: 40, height: 40, marginTop: 5, borderRadius: 5}}/>
      <Text style={{fontSize: 13, color: 'black', marginTop: 5}}>{title}</Text>
      <Text style={{fontSize: 11, color: 'gray'}}>累计{num}个任务</Text>
    </View>
  );
}; 

const BottomItem = ({image, title, content, money}) => {
  return (
    <View style={{alignItems: 'flex-start', padding: 5, backgroundColor: '#ffffff', borderRadius: 10, width: width, padding: 5, flexDirection: 'row'}}>
      <Image source={{uri: image}} style={{width: 60, height: 60, margin: 5, borderRadius: 5}}/>
      <View style={{paddingStart: 10, paddingEnd: 10, flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 14, color: 'black', flex: 1}}>{title}</Text>
          <Text style={{fontSize: 11, color: 'red'}}>￥{money}</Text>
        </View>
        <Text style={{fontSize: 14, color: 'black', marginTop: 5}}>{content}</Text>
      </View>
    </View>
  );
}; 

class HomePage extends Component {

    render() {

        return (
          <SafeAreaView style={{backgroundColor: 'white'}}>
            <StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'} />
            <ScrollView style={styles.scrollview}>
              <View style={styles.container}>
                <ImageBackground style={styles.topImage} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607331551239&di=3a3fdfeb5090215fa02ace64ea0665b5&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201312%2F28%2F131628r555g0tdeg9eg150.jpg'}}>
                    <View style={styles.viewTopSearch}>
                      <Icon name={'location'} size={24} color={'white'} />
                      <Text style={[styles.topSearchText, {marginEnd: 20}]}>苏州</Text>
                      <TextInput style={[styles.topInput, {fontSize: 12}]}>请输入</TextInput>
                      <Text style={[styles.topSearchText, {marginStart: 20}]}>我的文章</Text>
                    </View>
                    <View style={{padding: 30, flex: 1}}>
                      <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}
                        dot={<View style={{ backgroundColor: 'gray', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                        activeDot={<View style={{ backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />} 
                        paginationStyle={{
                          bottom: -23,
                        }} 
                        >
                        <Image style={{flex: 1, borderRadius: 10}} source={{uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3824384690,1892076253&fm=26&gp=0.jpg'}}></Image>
                        <Image style={{flex: 1, borderRadius: 10}} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607330922240&di=3df0877fbd2fb3e3cab5a626a0202815&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201503%2F19%2F211608ztcq7higicydxhsy.jpg'}}></Image>
                        <Image style={{flex: 1, borderRadius: 10}} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607330922240&di=51548e4e7e577c9ea85cbd7607f8853b&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201109%2F19%2F1902510u0vu30uu03q0smt.jpg'}}></Image>
                        <Image style={{flex: 1, borderRadius: 10}} source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607330922240&di=3835de4a2ae8708602a0e4227ab02503&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201305%2F30%2F220025pxfkhykvkgkvuktq.jpg'}}></Image>
                      </Swiper>
                    </View>
                </ImageBackground>

                <FlatList
                  style={{backgroundColor: 'white'}}
                  horizontal={true}
                  data={topList}
                  renderItem={({item}) => (
                    <TopItem title={item.title} subContent={item.subTitle} icon={item.icon}/>
                  )}
                  keyExtractor={item => item.id}
                >
                    
                </FlatList>

                <Text style={{color: 'black', fontSize: 20, flex: 1, padding: 10, backgroundColor: 'white'}}>推荐企业</Text>
                
                <FlatList
                  style={{marginStart: 5, marginEnd: 5, backgroundColor: 'white'}}
                  horizontal={true}
                  showsHorizontalScrollIndicator = {false}
                  data={middleList}
                  renderItem={({item}) => (
                    <MiddleItem title={item.title} num={item.num} image={item.icon}/>
                  )}
                  keyExtractor={item => item.id}
                >
                    
                </FlatList>

                <Text style={{color: 'black', fontSize: 20, flex: 1, padding: 10, backgroundColor: 'white'}}>推荐任务</Text>
                <FlatList
                  style={{backgroundColor: 'white'}}
                  data={bottomList}
                  renderItem={({item}) => (
                    <BottomItem title={item.title} image={item.icon} content={item.content} money={item.money}/>
                  )}
                  keyExtractor={item => item.id}
                >
                    
                </FlatList>
              </View>
            </ScrollView>
          </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    scrollview: {
      backgroundColor: '#FFFFFF',
    },
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      justifyContent: "center",
    },
    topImage: {
      width: width,
      height: width/3*2,
      paddingTop: statusBarHeight,
    },
    viewTopSearch: {
      flexDirection: 'row',
      paddingLeft: 20,
      paddingEnd: 20,
      paddingTop: 10,
      alignItems: 'center'
    },
    topSearchText: {
      fontSize: 15,
      color: 'white'
    },
    topInput: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 20,
      paddingStart: 10, 
      paddingEnd: 10,
      height: 35,
    },
    topSearchImage: {
      width: 20,
      height: 20,
    },
    wrapper: {
    },
  });

  module.exports = HomePage;
