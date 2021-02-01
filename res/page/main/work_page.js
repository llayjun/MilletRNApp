import React, {Component} from 'react';
import { Text, View, Image, StatusBar, FlatList, TouchableWithoutFeedback } from 'react-native';
import {statusBarHeight,width} from '../../util/apdater_util';
import MyHeader from '../../widget/my_header';
import Storage from '../../util/storage_util';
import {BASE_URL, TokenKey} from '../../const/const';
import NetUtil from '../../net/net_util';
import * as RootNavigation from '../../../App';
import Toast, {DURATION} from 'react-native-easy-toast';

const MiddleItem = ({image, title, num, callBack}) => {
    return (
      <TouchableWithoutFeedback onPress={callBack}>
        <View style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 15, backgroundColor: '#F8F8F8', borderRadius: 5, width: width / 2 - 10, margin: 5}}>
          <View style={{borderRadius: 5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 5}}>
            <Image source={{uri: image}} style={{width: 40, height: 40, borderRadius: 55}}/>
          </View>
          <Text style={{fontSize: 13, color: 'black', marginTop: 5}}>{title}</Text>
          <Text style={{fontSize: 11, color: 'gray'}}>累计{num}个任务</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }; 

class WorkPage extends Component {

    state = {
        currentPage: 1,
        refreshing: true,
        reMerchant: [],
        pages: 1
    }

    //下拉刷新,更改状态，重新获取数据
    _onRefresh() {
    　　this.setState({
        　　currentPage: 1,
        　  refreshing: true,
            reMerchant: [], 
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
            this.toast.show('已加载全部', 1000);
        }
    }

    getReTask() {
        let data = {'pageNum': this.state.currentPage, 'pageSize': 10}
        Storage.load({key: TokenKey}).then((value) => {
          NetUtil.postJson(BASE_URL + 'api/app/merchant/getMerchantListPage', data, (info) => {
            if(info.code == 0) {
              this.setState({
                  refreshing: false,
                  reMerchant: this.state.currentPage == 1?info.data.records: [...this.state.reMerchant, ...info.data.records],
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
                <MyHeader leftImageView={null}>企业</MyHeader>
                <FlatList
                    numColumns ={2} // 一行2个
                    onEndReachedThreshold = {0.1} //当距离内容比例不足内容0.1比例时触发onEndReached
                    onRefresh = {this._onRefresh.bind(this)} //刷新操作
                    onEndReached = {this._endReached.bind(this)} //上拉加载数据
                    refreshing = {this.state.refreshing} //等待加载出现加载的符号是否显示
                    data={this.state.reMerchant}
                    height={'100%'}
                    renderItem={({item}) => (
                        <MiddleItem title={item.merchantName} num={item.merchantTaskNum} image={item.merchantLogo} callBack={() => {
                          RootNavigation.navigate('MerchantDetailPage', {
                            merchantId: item.id
                          })
                        }}/>
                    )}
                    keyExtractor={item => item.id}
                  >
                </FlatList>
                <Toast ref={(toast) => this.toast = toast}/>
            </View>
        );
    }
}

export default module = WorkPage;