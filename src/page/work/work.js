import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert
  } from 'react-native';

import NetUtil from '../../net/net_util';


class WorkPage extends Component {

  // class中使用state
  state = {message: ""};

  get(callback) {
    NetUtil.get('https://api.apishop.net/common/air/getCityPM25Detail', function(ret) {
      // Alert.alert('提示', ret['desc']);
      callback(ret['desc']);
    });
  }

  render() {

      return (
          <View style={styles.container}>
              <Text>{this.state.message == ""? "WorkPage": this.state.message}</Text>
              <Button title={'点击请求'} onPress={() => {
                this.get((desc) => {
                  this.setState({message: desc});
                });
              }}></Button>
          </View>
      );
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      alignItems: "center",
      justifyContent: "center"
    },
    tabIcon:{
      width:23,
      height:23,
    }
  });

  module.exports = WorkPage;
