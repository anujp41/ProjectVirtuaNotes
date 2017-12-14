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
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA-YgQ-NJu-1QRg08kpT3soU1D8c2Lb3Us",
  authDomain: "virtuanotes.firebaseapp.com",
  databaseURL: "https://virtuanotes.firebaseio.com",
  projectId: "virtuanotes",
  storageBucket: "virtuanotes.appspot.com",
  messagingSenderId: "806111620814"
}

firebase.initializeApp(config);

class Anatomy extends Component {

  constructor() {
    super()
    this.state = {
      latitude: null,
      longitude: null,
      timestamp: null,
      error: null
    }
    this.getCoords = this.getCoords.bind(this);
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

  getCoords(event) {
    console.log('this is event ', event.nativeEvent.coordinate);
    const toWrite = event.nativeEvent.coordinate;
    firebase.database().ref('location').push({
      latitude: toWrite.latitude,
      longitude: toWrite.longitude
    })
  }

  render() {
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
          onPress={event => this.getCoords(event)}
        >
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

export default Anatomy;
