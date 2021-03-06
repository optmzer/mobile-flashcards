import React, {Component} from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import {
  saveCardAction,
  getDeckAction,
} from '../actions'

/**
 * Component that adds flash card to the deck
 */
class AddCard extends Component{

  state = {
    question: "",
    answer: "",
  }

  clearTextInput(){
    this.setState({
      question: "",
      answer: "",
    })
  }

  /**
   * Creates card object 
   * dispatches action to creat card and navigates back to Deck view.
   */
  saveCard(){
    const { navigation } = this.props
    const {deckId} = this.props.navigation.state.params
    const { dispatch } = this.props

    let card = {
      question: this.state.question,
      answer: this.state.answer
    }

    dispatch(saveCardAction(deckId, card))
    this.clearTextInput()//clear the text input
    navigation.goBack()
  }

  render(){
    const { navigation } = this.props
    const {deckId} = this.props.navigation.state.params

    return(
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
        <Text style={{fontSize: 20}}>
          Deck Title: {deckId && deckId.split("#!", 2)[1]}
        </Text>
        <TextInput
          placeholder="Question"
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
          style={[styles.cardInput, {marginTop: 10}]}
          multiline = {true}
          numberOfLines = {4}
        />
        <TextInput
          placeholder="Answer"
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
          style={styles.cardInput}
          multiline = {true}
          numberOfLines = {2}
        />

        <KeyboardAvoidingView
          behavior="padding"
          style={styles.controls}
        >
          <TouchableOpacity
            style={styles.controlsBtn}
            onPress={() => navigation.navigate("Home")}
          >
          <FontAwesome name="home" size={30}/>
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlsBtn}
            onPress={() => this.state.answer && this.state.question && this.saveCard()}
          >
            <FontAwesome name="save" size={30}/>
            <Text>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlsBtn}
            onPress={() => {
              this.clearTextInput()
              navigation.goBack()
            }}
          >
          <FontAwesome name="close" size={30}/>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    )//return()
  }//render()
}//class AddCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  cardInput: {
    fontSize: 25,
    height: 60,
  },
  controlsBtn: {
    alignItems: "center",
  }
})//styles

export default connect()(AddCard)