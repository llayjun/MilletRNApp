import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
  } from 'react-native';

class WorkPage extends Component {

    render() {

        return (
            <View style={styles.container}>
               <Text>WorkPage</Text>
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
