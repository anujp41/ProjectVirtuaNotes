import React, { Component } from "react";
import { Image, View, TouchableOpacity, Button, TouchableHighlight } from "react-native";
import {
	Container,
	Header,
	Title,
	Button as BaseButton,
	IconNB,
	DeckSwiper,
	Card,
	CardItem,
	Icon,
	Thumbnail,
	Text,
	Left,
	Right,
	Body,
	Content,
} from "native-base";
import { connect } from 'react-redux';
import styles from "./styles";
import { removeMarkerThunk } from '../../../store';

const cardImage = require("../../../img/mcqueen.jpg");

class SimpleDeck extends Component {
	// eslint-disable-line

	constructor() {
		super();
		this._renderButton = this._renderButton.bind(this);
	}

	_renderButton = marker => (
		<View style={styles.container}>
			<TouchableOpacity onPress={console.log('pressed')}>
			<View style={styles.button}>
				<Text style={styles.buttonText}>Remove remainder</Text>
			</View>
			</TouchableOpacity>
		</View>
	  );
	  

	render() {
		const markers = this.props.markers;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<BaseButton transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" />
						</BaseButton>
					</Left>
					<Body>
						<Title>Simple Deck Swiper</Title>
					</Body>
					<Right />
				</Header>

				<View style={{ flex: 1, padding: 12 }}>
					<DeckSwiper
						dataSource={markers}
						looping={true}
						renderEmpty={() =>
							<View>
								<Text>Over</Text>
							</View>}
						renderItem={marker =>
							<Card style={{ elevation: 3 }}>
								<CardItem>
									<Left>
										<Thumbnail source={cardImage} />
										<Body>
											<Text>
												{marker.remainder}
											</Text>
											<Text note>To add this!</Text>
										</Body>
									</Left>
								</CardItem>
								<CardItem cardBody>
									<Image
										style={{
											resizeMode: "cover",
											width: null,
											flex: 1,
											height: 300,
										}}
										source={cardImage}
									/>
								</CardItem>
								<CardItem>
									<IconNB name={"ios-heart"} style={{ color: "#ED4A6A" }} />
									<Text>
										Latitude: {marker.latitude}
										{"\n"}
										Longitude: {marker.longitude}
									</Text>
								</CardItem>
									{this._renderButton(marker)}
							</Card>}
					/>
				</View>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
	  markers: state.markers
	}
  }

const SimpleDeckContainer = connect(mapStateToProps, null)(SimpleDeck);
export default SimpleDeckContainer; 
