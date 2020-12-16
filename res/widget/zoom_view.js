import React, {Component} from 'react';

import {Modal, Button, View, StatusBar, SafeAreaView, ToastAndroid} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import * as RootNavigation from '../../App';
import Icons from 'react-native-vector-icons/Entypo';

class ZoomViewPage extends Component {

    constructor(props) {
        super(props);
    } 

    render() {
        const index = this.props.route.params.index
        const imageUrlList = this.props.route.params.imageUrlList
        const imageList = []
        imageUrlList.forEach(element => {
            imageList.push({'url': element})
        });
        return (
            <Modal visible={true} transparent={true} statusBarTranslucent={true} hardwareAccelerated={true} onRequestClose={() => {
                this.props.navigation.goBack()
            }}>
                <ImageViewer imageUrls={imageList} index={index} />
            </Modal>
        )
    }

}

export default moudle = ZoomViewPage;