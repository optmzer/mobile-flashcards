/**TODO: Align icons vertically.
Hook up Save button*/

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import {
  FontAwesome,
} from "@expo/vector-icons"

class AddDeck extends Component{

  state = {
    text: ""
  }

  cancelAddDeck(){
    this.setState({
      text: ""
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <TextInput
          placeholder="Deck Title"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          style={styles.deckTitle}
        />
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlsBtn}
          >
            <Text style={{fontSize: 25}}>Save Deck - </Text>
            <FontAwesome name="save" size={40}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlsBtn}
            onPress={() => this.cancelAddDeck()}
          >
            <Text style={{fontSize: 25}}>Cancel - </Text>
            <FontAwesome name="trash-o" size={40}/>
          </TouchableOpacity>
        </View>
      </View>
    )//return()
  }//render()
}//class AddDeck


const styles = StyleSheet.create({
  continer: {
    flex: 1,
  },//container
  deckTitle: {
    paddingTop: 20,
    fontSize: 25,
    height: 60
  },//deckTitle
  controls: {
    paddingTop: 40,
  },//controls
  controlsBtn: {
    paddingLeft: 40,
    flexDirection: "row",
  },//controlsBtn
})

export default AddDeck
