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
	Content
} from "native-base";
import { connect } from 'react-redux';
import styles from "./styles";
import ToastNB from './toast';
import { removeMarkerThunk } from '../../../store';

const cardImage = require("../../../img/mcqueen.jpg");

class SimpleDeck extends Component {
	// eslint-disable-line

	constructor(props) {
		super(props);
	}  

	render() {
		const markers = this.props.markers;
		return (
			<Container style={styles.container}>
				<View style={{ flex: 1, padding: 12 }}>
					<DeckSwiper
						dataSource={markers}
						looping={true}
						renderItem={item =>
							<Card style={{ elevation: 3 }}>
								<CardItem>
									<Left>
										<Thumbnail source={cardImage} />
										<Body>
											<Text>
												{item.remainder}
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
										Latitude: {item.latitude}
										{"\n"}
										Longitude: {item.longitude}
									</Text>
								</CardItem>
								<CardItem>
									< ToastNB marker={item.key} />
								</CardItem>
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
