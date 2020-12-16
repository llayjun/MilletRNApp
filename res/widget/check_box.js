import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
    Image,
    TouchableHighlight
}
    from 'react-native'
const checkedImage=require('../img/cb_enabled.png');
const checkImage=require('../img/cb_disabled.png');

import PropTypes from 'prop-types';


export default class CheckBox extends PureComponent {

    static propTypes = {
        chekOnPress: PropTypes.func, // 点击事件
    }

    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.isChecked || false
        };
    }
 
    getChecked() {
        return this.state.isChecked;
    }
 
    setChecked(isChecked) {
        this.setState({
            isChecked: isChecked
        });
    }
 
    checkClick() {
        this.setState({
            isChecked: !this.state.isChecked,
        });
        this.props.chekOnPress(this.state.isChecked)
    }
 
    render() {
        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={() => this.checkClick()}>
                <Image source={this.state.isChecked?checkedImage:checkImage} style={styles.checkImage}/>
            </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({
    checkImage: {
        marginLeft: 5,
        height: 15,
        width: 15
    }
});