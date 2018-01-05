import React, { Component } from "react";

import {
  Container,
  Header,
  Button,
  Icon,
  Item,
  Input,
  Content,
  Text
} from "native-base";

import styles from "./styles";

class NHSearchbar extends Component {
  // eslint-disable-line

  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Item>
            <Icon active name="search" />
            <Input name="place" placeholder="Search" onChangeText={(text) => console.log(text)}/>
            <Icon active name="people" />
          </Item>
          {/* <Button 
            transparent
            onPress = {(event) => console.log('event is ', event.target)}
          >
            <Text>Search</Text>
          </Button> */}
          </Header>

        <Content padder>
          <Button
            onPress={() => this.props.navigation.navigate("DrawerOpen")}
          >
            <Text>Back</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default NHSearchbar;
