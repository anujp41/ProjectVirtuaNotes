import React, { Component } from "react";
import { TouchableOpacity, TouchableHighlight } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H3,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Toast
} from "native-base";
import { connect } from 'react-redux';
import styles from './styles';
import { removeMarkerThunk } from '../../../store';

class ToastNB extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showToast: false
        };
    }

  render() {
    return (
        <Container>
            <Content padder>
                <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.removeMarker(this.props.marker)}>
                <Text style={styles.buttonText}>Remove marker?</Text>
                </TouchableOpacity>
          </Content>
        </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        removeMarker: markerKey => {
            const action = removeMarkerThunk(markerKey);
            dispatch(action);
        }
    }
}

const ToastNBContainer = connect(null, mapDispatchToProps)(ToastNB);
export default ToastNBContainer;