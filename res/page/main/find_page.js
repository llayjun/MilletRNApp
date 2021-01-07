import React, {Component} from 'react';
import { Text, View, Image, StatusBar, FlatList, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import {statusBarHeight} from '../../util/apdater_util';
import MyHeader from '../../widget/my_header';
import Storage from '../../util/storage_util';
import {BASE_URL, TokenKey} from '../../const/const';
import NetUtil from '../../net/net_util';
import * as RootNavigation from '../../../App';

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

class FindPage extends Component {

    state = {
        currentPage: 1,
        refreshing: true,
        reTaskList: [],
        pages: 1
    }

    //下拉刷新,更改状态，重新获取数据
    _onRefresh() {
    　　this.setState({
        　　currentPage: 1,
        　  refreshing: true,
            reTaskList: [], 
    　　},()=>{
    　　　　this.getReTask();　　　　
    　　});
    }

    _endReached() {
        let that = this;
        // 判断首屏满屏的情况
        if(that.state.pages > this.state.currentPage){
            that.state.currentPage++;
            this.getReTask();
        }else{
            //若总数未满一屏，进去就提示
            ToastAndroid.show('已加载全部', 1000);
        }
    }

    getReTask() {
        let data = {'pageNum': this.state.currentPage, 'pageSize': 10}
        Storage.load({key: TokenKey}).then((value) => {
          NetUtil.postJson(BASE_URL + 'api/app/task/getMerchantTaskListPage', data, (info) => {
            if(info.code == 0) {
              this.setState({
                  refreshing: false,
                  reTaskList: this.state.currentPage == 1?info.data.records: [...this.state.reTaskList, ...info.data.records],
                  pages: info.data.pages
                })
            }
          }, value)
        })
    }

    componentDidMount() {
        this.getReTask()
    }

    render() {
        return (
            <View style={{backgroundColor: 'white', height: '100%'}}>
                <StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'} />
                <View style={{marginTop: statusBarHeight}}></View>
                <MyHeader leftImageView={null}>任务</MyHeader>
                <FlatList
                    onEndReachedThreshold = {0.1} //当距离内容比例不足内容0.1比例时触发onEndReached
                    onRefresh = {this._onRefresh.bind(this)} //刷新操作
                    onEndReached = {this._endReached.bind(this)} //上拉加载数据
                    refreshing = {this.state.refreshing} //等待加载出现加载的符号是否显示
                    data={this.state.reTaskList}
                    height={'100%'}
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
            </View>
        );
    }
}

export default module = FindPage;