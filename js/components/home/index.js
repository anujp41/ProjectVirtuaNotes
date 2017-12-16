import React, { Component } from "react";
import { Image, View, StatusBar } from "react-native";
import { connect } from 'react-redux';
import { getMarkersThunk } from '../../../store';

import { Container, Button, H3, Text, Header, Title, Body, Left, Right } from "native-base";

import styles from "./styles";

const launchscreenBg = require("../../../img/launchscreen-bg.png");
const launchscreenLogo = require("../../../img/logo-kitchen-sink.png");

class Home extends Component {

	componentDidMount() {
		this.props.getMarkers();
	}

	render() {
		return (
			<Container>
				<StatusBar barStyle="light-content" />
				<Image source={launchscreenBg} style={styles.imageContainer}>
					<View style={styles.logoContainer}>
						<Image source={launchscreenLogo} style={styles.logo} />
					</View>
					<View
						style={{
							alignItems: "center",
							marginBottom: 50,
							backgroundColor: "transparent",
						}}
					>
						<H3 style={styles.text}>App to showcase</H3>
						<View style={{ marginTop: 8 }} />
						<H3 style={styles.text}>NativeBase components</H3>
						<View style={{ marginTop: 8 }} />
					</View>
					<View style={{ marginBottom: 80 }}>
						<Button
							style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
							onPress={() => this.props.navigation.navigate("DrawerOpen")}
						>
							<Text>Start marking your map!</Text>
						</Button>
					</View>
				</Image>
			</Container>
		);
	}
}

// export default Home;

const mapDispatchToProps = dispatch => {
	return {
		getMarkers: () => {
			const action = getMarkersThunk();
			dispatch(action);
		}
	}
}

const HomeContainer = connect(null, mapDispatchToProps)(Home);
export default HomeContainer;


