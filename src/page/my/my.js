import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
  } from 'react-native';

class MyPage extends Component {

    render() {

        return (
            <View style={styles.container}>
               <Text>MyPage</Text>
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

  module.exports = MyPage;
