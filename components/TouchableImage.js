import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    ListView
} from 'react-native';

import { inject, observer } from 'mobx-react/native';

import styles from './Styles';

@inject('store') @observer
class TouchableImage extends Component {
    state = {
        width: null,
    }

    onPress(event) {
        const { width } = this.state,
              { store } = this.props,
              X = event.nativeEvent.locationX;

        if (X < width*.3) {
            store.prevImage();
        }else if (X > width*.6) {
            store.nextImage();
        }
    }

    onImageLayout(event) {
        this.setState({
            width: event.nativeEvent.layout.width
        });
    }

    get caption() {
        let { caption, image } = this.props;
        return image.title || image.description || caption;
    }

    render() {
        const { image, store, height } = this.props,
              uri = image.link.replace('http://', 'https://');

        return (
            <TouchableHighlight onPress={this.onPress.bind(this)}
                                style={styles.fullscreen}>
                <Image source={{uri: uri}}
                       style={[styles.backgroundImage,
                               styles[store.orientation.toLowerCase()],
                               {height: height || null}]}
                       onLayout={this.onImageLayout.bind(this)}>
                     <Text style={[styles.imageLabel]}>{this.caption}</Text>
                </Image>
            </TouchableHighlight>
        );
    }
}

export default TouchableImage;
