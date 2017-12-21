import React, { Component } from "react";
import { Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Label, Item, Input } from 'native-base';
import Modal from 'react-native-modal';
import styles from "./styles";

export default class FormModal extends Component {

    constructor(props) {
        super(props);
        this._renderButton = this._renderButton.bind(this);
        this._renderCancelButton = this._renderCancelButton.bind(this)
        this._renderModalContent = this._renderModalContent.bind(this);
    }

    _renderButton = (text) => (
        <TouchableOpacity onPress={this.props.addMarker}>
          <View style={styles.button}>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
      );

      _renderCancelButton = (text) => (
        <TouchableOpacity onPress={this.props.showModal}>
          <View style={styles.button}>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
      );
    
    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Item fixedlabel>
                <Input style={styles.input} placeholder="Your next remainder" onChangeText={updatedText => this.props.updateRemainder(updatedText)} />
            </Item>
          {this._renderButton('Submit') }
          {this._renderCancelButton('Cancel') }
        </View>
      );

    render() {
        const isModalVisible = this.props.isModalVisible
        console.log('modal props ', this.props)
        return (
            <View>
            <TouchableWithoutFeedback onPress={this.props.showModal}>
            <Modal
                isVisible={isModalVisible}
                animationIn={'zoomInDown'}
                animationOut={'zoomOutUp'}
                >
                    {this._renderModalContent()}
            </Modal>
            </TouchableWithoutFeedback>
            </View>
        )
    }
}