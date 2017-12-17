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
import MapView from 'react-native-maps';
import styles from "./styles";
import NHSpinner from '../spinner';
import firebase from '../../../firebase';
import { connect } from 'react-redux';
import { addMarkerThunk } from '../../../store';

class Anatomy extends Component {

  constructor() {
    super()
    this.state = {
      latitude: null,
      longitude: null,
      timestamp: null,
      error: null,
      markerArray: null
    }
    this.writeToDb = this.writeToDb.bind(this);
  }

  componentDidMount() {
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
    console.log('to add ', location);
    this.props.addMarker(location);
    // firebase.database().ref('location').push({
    //   latitude: toWrite.latitude,
    //   longitude: toWrite.longitude
    // })
  }

  render() {
    const markers = this.props.markers;
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
          style={{ flex: 1 }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          toolbarEnabled={true}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          onPress={event => this.writeToDb(event)}
        >
        {markers.map(marker => (
          <MapView.Marker
            key={marker.latitude}
            coordinate={marker}
          />
        ))}
        </MapView>



        {/* <Footer>
          <FooterTab>
            <Button active full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer> */}
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
