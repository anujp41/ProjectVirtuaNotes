import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import {
	Container,
	Header,
	Title,
	Button,
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
// import default from "../spinner/styles";

const cardOne = require("../../../img/swiper-1.png");
const cardTwo = require("../../../img/swiper-2.png");
const cardThree = require("../../../img/swiper-3.png");
const cardFour = require("../../../img/swiper-4.png");

const cardImage = require("../../../img/mcqueen.jpg");

const cards = [
	{
		text: "Card One",
		name: "One",
		image: cardOne,
	},
	{
		text: "Card Two",
		name: "Two",
		image: cardTwo,
	},
	{
		text: "Card Three",
		name: "Three",
		image: cardThree,
	},
	{
		text: "Card Four",
		name: "Four",
		image: cardFour,
	},
];

class SimpleDeck extends Component {
	// eslint-disable-line

	constructor() {
		super();
		this._renderButton = this._renderButton.bind(this);
	}

	_renderButton = (text) => (
        <TouchableOpacity onPress={() => console.log('i am pressed')}>
          <View style={styles.button}>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
      );

	render() {
		const markers = this.props.markers;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
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

								{this._renderButton('Remove card')}

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
