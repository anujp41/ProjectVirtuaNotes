"use strict";

import React, { Component } from "react";
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
  Body
} from "native-base";
import { View } from 'react-native';
import MapView from 'react-native-maps';
import styles from "./styles";
import NHSpinner from '../spinner';
import firebase from '../../../firebase';
import { connect } from 'react-redux';
import { addMarkerThunk } from '../../../store';
import FormModal from './modal';

class Anatomy extends Component {

  constructor() {
    super()
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      isModalVisible: false
    }
    this.writeToDb = this.writeToDb.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.setState({
      latitude: null,
      longitude: null
    })
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => this.setState({error: error}),
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 5000}
    )
  }

  writeToDb(event) {
    const location = event.nativeEvent.coordinate;
    this.props.addMarker(location);
  }

  showModal() {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  render() {
    const markers = this.props.markers;
    const isModalVisible = this.state.isModalVisible;
    console.log('array ', markers)
    if (this.state.latitude) {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Choose your spots!</Title>
          </Body>
          <Right />

        </Header>

        <MapView
          showsMyLocationButton={true}
          style={{ flex: 1 }}
          showsUserLocation={true}
          toolbarEnabled={true}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          onPress = {this.showModal}
        >
        {markers.map(marker => (
          <MapView.Marker
            key={marker.latitude}
            coordinate={marker}
          />
        ))}
        </MapView>

        <Footer>
          <FooterTab>
            <Button active full
              onPress={this.getCurrentLocation}>
              <Text>Beam Me Home!</Text>
            </Button>
          </FooterTab>
        </Footer>


        <View>
          <FormModal isModalVisible={this.state.isModalVisible} showModal={this.showModal}/>
        </View>

      </Container>
    )}
    else {
      return (
        < NHSpinner />
      )
    };
  }
}

const mapStateToProps = state => {
  return {
    markers: state.markers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMarker: marker => {
      const action = addMarkerThunk(marker)
      dispatch(action);
    }
  }
}

const AnatomyContainer = connect(mapStateToProps, mapDispatchToProps)(Anatomy);
export default AnatomyContainer;
