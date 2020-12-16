import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icons from 'react-native-vector-icons/Entypo';

class MyHeader extends Component {

    // 属性申明
    static propTypes = {
        leftTxt: PropTypes.string,
        leftTxtStyle: PropTypes.any, // 左边文字
        leftImageView: PropTypes.string, // 左边图片
        middleTxtStyle: PropTypes.any, // 中间文字
        rightTxt: PropTypes.string,
        rightTxtSytle: PropTypes.any, // 右边文字
        rightImageView: PropTypes.element, // 右边图片
        leftOnPress: PropTypes.func,
        rightOnPress: PropTypes.func,
        bgStyle: PropTypes.any, // 背景
        showLine: PropTypes.bool, // 底部线
    }

    // 默认
    static defaultProps = {
        leftTxt: '',
        leftTxtStyle: {color: '#000000', fontSize: 15, padding: 8},
        leftImageView: 'chevron-thin-left',
        middleTxtStyle: {color: '#000000', fontSize: 20},
        rightTxt: '',
        rightTxtStyle: {color: '#000000', fontSize: 15, padding: 8},
        rightImageView: null,
        bgStyle: {color: '#000000'},
        showLine: false,
    }

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <View style={[styles.bg, this.props.bgStyle]} >
                    <View style={{flex: 1}}>
                        {this.props.leftImageView != null ? 
                        <Icons name={this.props.leftImageView} size={20} color="#000000" style={{padding: 5}} onPress={this.props.leftOnPress}></Icons> :
                        <Text style={[this.props.leftTxtStyle]} onPress={this.props.leftOnPress}>{this.props.leftTxt}</Text>
                        }
                    </View>
                    <Text style={[styles.flex2, styles.txt, this.props.middleTxtStyle]}>{this.props.children}</Text>
                    <View style={{flex: 1}}>
                        {this.props.rightImageView != null ? 
                        <Icons name={this.props.rightImageView} size={20} color="#000000" style={{padding: 5}} onPress={this.props.rightOnPress}></Icons> :
                        <Text style={[this.props.rightTxtStyle]} onPress={this.props.rightOnPress}>{this.props.rightTxt}</Text>                    }
                    </View>
                </View>
                {this.props.showLine? <View style={{height: 1, backgroundColor: '#d3d7d4'}}></View>: null}
            </View>
        );
    }


}

const styles = StyleSheet.create({
    bg: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
    },
    flex: {
        flex: 1
    },
    flex2: {
        flex: 2,
    },
    txt: {
        textAlign: 'center',
    }
})

export default module = MyHeader;