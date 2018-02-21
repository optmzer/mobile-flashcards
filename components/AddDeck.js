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


/**
 * Component UI to add new Deck to the Deck list
 */
class AddDeck extends Component{

  state = {
    text: "",
    disabled: true,
    deckAlreadyExist: false,
  }

  clearTextInput(){
    this.setState({
      text: "",
      disabled: true,
      deckAlreadyExist: false,
    })
  }

  setText(text){
    const { getAllDecksReducer } = this.props 
      //checks if there is a deck with the same title 
      let deckExists = getAllDecksReducer.decks.filter(deck => deck.title === text)

      if(deckExists.length == 0){
        this.setState({
          text: text,
          disabled: false,
          deckAlreadyExist: false,
        })
      }else{
        this.setState({
          text: text,
          disabled: true,
          deckAlreadyExist: true,
        })
      }
  }//setText()

  saveDeck(){
    const { navigation, dispatch } = this.props
    let newDeck = {
      deckId: Date.now() + "#!" + this.state.text,
      title: this.state.text,
      questions: []
    }
    
    dispatch(addNewDeckAction(newDeck))
    Keyboard.dismiss()//Dismiss Keyboard on submit.
    navigation.navigate("Deck")
    this.clearTextInput()
  }//saveDeck()

  deckAlreadyExist(){
    return(
      <View style={styles.warningTitle}>
        <Text style={{fontSize: 18}}>Deck with this title already exists.</Text>
        <Text style={{fontSize: 18}}>Please choose another title.</Text>
      </View>
    )
  }

  render(){
    const { navigation } = this.props

    return(
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}
        >
          <TextInput
            style={styles.deckTitle}
            placeholder="Deck Title"
            value={this.state.text}
            onChangeText={(text) => this.setText(text)}
            multiline = {true}
            numberOfLines = {2}
          />
          { this.state.deckAlreadyExist &&
            this.deckAlreadyExist()
          }
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.controls}
          >
            <TouchableOpacity
              disabled={this.state.disabled}
              style={styles.controlsBtn}
              onPress={() => this.saveDeck()}
            >
              <MaterialIcons name="save" size={30}/>
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlsBtn}
              onPress={() => {
                this.clearTextInput()
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
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 25,
  },//deckTitle
  warningTitle: {
    alignItems: "center",
  },//warningTitle
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },//controls
  controlsBtn: {
    alignItems: "center",
  },//controlsBtn
})

function mapStateToProps(state){
  const { getAllDecksReducer } = state
  return {
    getAllDecksReducer: getAllDecksReducer
  }
}

export default connect(mapStateToProps)(AddDeck)