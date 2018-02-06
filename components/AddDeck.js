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
} from 'react-native'
import {
  MaterialIcons,
} from "@expo/vector-icons"
import { addNewDeckAction } from '../actions'
import { connect } from 'react-redux'

class AddDeck extends Component{

  /**TODO: when press save go to Deck view.
  Also need to issue an action to update Home.
  as AsyncStorage seem to be updating OK.

*/
  state = {
    text: ""
  }

  cancelAddDeck(){
    this.setState({
      text: ""
    })
  }

  saveDeck(){
    const { navigation, dispatch } = this.props
    console.log("L36 AddDeck this.state.text = ", this.state.text )
    dispatch(addNewDeckAction(this.state.text))
    navigation.goBack()
  }

  render(){

    // console.log("L33 AddDeck this.props = ", this.props);
    const { navigation } = this.props

    return(
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}
        >
          <TextInput
            placeholder="Deck Title"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            style={styles.deckTitle}
          />
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.controls}>
            <TouchableOpacity
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
})

export default connect()(AddDeck)
