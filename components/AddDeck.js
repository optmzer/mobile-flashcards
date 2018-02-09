/**TODO: Align icons vertically.
Hook up Save button
key board blocks buttons.
*/

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native'
import {
  MaterialIcons,
} from "@expo/vector-icons"
import {
  addNewDeckAction,
  getDeckAction
} from '../actions'
import { connect } from 'react-redux'

class AddDeck extends Component{

  state = {
    text: "",
    disabled: true,
  }

  cancelAddDeck(){
    this.setState({
      text: "",
      disabled: true,
    })
  }

  setText(text){
    this.setState({
      text: text,
      disabled: false,
    })
  }//setText()

  saveDeck(){
    const { navigation, dispatch } = this.props
    let deck = {
      deckId: Date.now() + "#!" + this.state.text,
      title: this.state.text,
      questions: []
    }
    Keyboard.dismiss()//Dismiss Keyboard on submit.
    dispatch(addNewDeckAction(deck))

    navigation.navigate("Deck", {deck: deck})
    this.cancelAddDeck()
  }//saveDeck()

  render(){

    const { navigation } = this.props
    const { disabled } = this.state

    // console.log("L71 AddDeck this.textInput = ", this.textInput)

    return(
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}
        >
          <TextInput
            placeholder="Deck Title"
            onChangeText={(text) => this.setText(text)}
            value={this.state.text}
            style={styles.deckTitle}
          />
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.controls}>
            <TouchableOpacity
              disabled={!this.state.text ? true : false}
              style={styles.controlsBtn}
              onPress={() => this.saveDeck()}
            >
              <MaterialIcons name="save" size={30}/>
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlsBtn}
              onPress={() => {
                this.cancelAddDeck()
                navigation.goBack()
              }}
            >
              <MaterialIcons name="delete-forever" size={30}/>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </KeyboardAvoidingView>
    )//return()
  }//render()
}//class AddDeck


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },//container
  deckTitle: {
    marginTop: 30,
    fontSize: 25,
    height: 60
  },//deckTitle
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },//controls
  controlsBtn: {
    alignItems: "center",
  },//controlsBtn
  // contorlDisabled: {
  //   alignItems: "center",
  //   opacity: 0.5,
  // }
})

export default connect()(AddDeck)
