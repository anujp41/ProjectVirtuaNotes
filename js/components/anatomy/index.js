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
      remainder: null,
      error: null,
      isModalVisible: false
    }
    this.addToDb = this.addToDb.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.showModal = this.showModal.bind(this);
    this.updateRemainder = this.updateRemainder.bind(this);
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

  addToDb() {
    const longitude = this.state.longitude;
    const latitude = this.state.latitude;
    const remainder = this.state.remainder;
    const addingToDb = {
      longitude,
      latitude,
      remainder
    };
    this.props.addMarker(addingToDb);
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  showModal(event) {
    const location = event.nativeEvent.coordinate;
    location !== undefined 
    ?
      this.setState({
        isModalVisible: !this.state.isModalVisible,
        latitude: location.latitude || null,
        longitude: location.longitude || null
      })
    :
      this.setState({
        isModalVisible: !this.state.isModalVisible
      });
  }

  updateRemainder(remainder) {
    this.setState({
      remainder
    })
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  render() {
    const markers = this.props.markers;
    const isModalVisible = this.state.isModalVisible;
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
            title={marker.remainder}
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
          <FormModal isModalVisible={this.state.isModalVisible} showModal={this.showModal} updateRemainder={this.updateRemainder} addToDb={this.addToDb}/>
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
      const action = addMarkerThunk(marker);
      dispatch(action);
    }
  }
}

const AnatomyContainer = connect(mapStateToProps, mapDispatchToProps)(Anatomy);
export default AnatomyContainer;