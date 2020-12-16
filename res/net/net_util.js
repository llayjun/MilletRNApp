"use strict"

import React from 'react';

// 网络请求封装
class NetUtil extends React.Component {

    //post请求
    /**
    *url :请求地址
    *data:参数
    *callback:回调函数
    */
    static postFrom(url, data, callback, token) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorization': token
            },
            body: data
        };
        console.log('postFrom------' + JSON.stringify(fetchOptions))
        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((json) => {
                console.log('postFromResult------' + JSON.stringify(json))
                callback(json);
            }).done();
    }

    /**
     *url :请求地址
     *data:参数(Json对象)
     *callback:回调函数
     */
    static postJson(url, data, callback, token) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                //json形式
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(data)
        };
        console.log('postJson------' + JSON.stringify(fetchOptions))
        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((json) => {
                console.log('postJsonResult------' + JSON.stringify(json))
                callback(json);
            }).done();
    }
    
    //get请求
    /**
    *url :请求地址
    *callback:回调函数
    */
    static get(url, callback, token) {
        var fetchOptions = {
            method: 'GET',
            headers: {
                'authorization': token
            }
        }
        console.log('get------' + JSON.stringify(fetchOptions))
        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((json) => {
                console.log('getResult------' + JSON.stringify(json))
                callback(json);
            }).done();
    }

}

module.exports = NetUtil;