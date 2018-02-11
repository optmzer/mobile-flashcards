import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import {
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons"
import * as _ from 'underscore'
import {
  getCardAction,
  getDeckAction,
  saveEditedCardAction,
  deleteCardAction,
} from '../actions'

/**
TODO:
Use KeyboardAvoidingView in edit mode.
Make card editable,
Save changes
Allign buttons horizontally to the right. for edit mode.
*/

class FlashCard extends Component{

  state = {
    disabledNextCardBtn: false,
    disabledPrevCardBtn: false,
    front_editable: false,
    back_editable: false,
    card: {},
    deckLength: 0,
    cardIndex: 0,
    toggleAnswer: false,
    questionValue: "",
    answerValue: "",
  }

  componentWillMount(){
    const { getDeckReducer, getCardReducer } = this.props
    let deck = getDeckReducer.deck.questions.forEach((card, index) => {
        if(!_.isEmpty(card) && card.cardId === getCardReducer.cardId){
          this.setState({
            card: card,
            deckLength: getDeckReducer.deck.questions.length,
            cardIndex: index,
            questionValue: card.question,
            answerValue: card.answer,
          })
        }
    })//.forEach()
  }//componentWillMount()

  getNextCard(){
    const { cardIndex, deckLength } = this.state
    const { getDeckReducer, dispatch } = this.props

    this.hideAnswer()//Switches answer off

    if(cardIndex < deckLength - 1){
      let nextCard = getDeckReducer.deck.questions[cardIndex + 1]
      console.log("L79 getNextCard nextCardId = ", nextCard)
      dispatch(getCardAction(getDeckReducer.deck.deckId, nextCard))
      this.setState((prevState) => {
        return {
          card: nextCard,
          cardIndex: prevState.cardIndex + 1,
          disabledPrevCardBtn: false,
          questionValue: nextCard.question,
          answerValue: nextCard.answer,
        }
      })
    }else{
      this.setState({
        disabledNextCardBtn: true,//locked
      })
    }
    this.setFrontNotEditable()
  }//getNextCard()

  getPreviousCard(){
    //For arrow-back
    const { cardIndex, deckLength } = this.state
    const { getDeckReducer, dispatch } = this.props

    this.hideAnswer()//Switches answer off

    if(cardIndex > 0){
      let nextCard = getDeckReducer.deck.questions[cardIndex - 1]
      console.log("L117 getNextCard nextCardId = ", nextCard)
      dispatch(getCardAction(getDeckReducer.deck.deckId, nextCard))
      this.setState((prevState) => {
        return {
          card: nextCard,
          cardIndex: prevState.cardIndex - 1,
          disabledNextCardBtn: false,
          questionValue: nextCard.question,
          answerValue: nextCard.answer,
        }
      })
    }else{
      this.setState({
        disabledPrevCardBtn: true,//locked
      })
    }
    this.setFrontNotEditable()
  }

  setFrontEditable(){
    this.setState({
      front_editable: true,
      toggleAnswer: true,
    })
  }

  setFrontNotEditable(){
    this.setState({
      front_editable: false,
      toggleAnswer: false,
    })
  }

  saveChanges(){
    const {getCardReducer, dispatch} = this.props

    let card = {
      cardId: this.state.card.cardId,
      question: this.state.questionValue,
      answer: this.state.answerValue,
    }

    //Save changes into the card
    console.log("L141 FlashCard saveChanges card = ", card)
    console.log("L142 FlashCard getCardReducer.deckId = ", getCardReducer.deckId)

    dispatch(saveEditedCardAction(getCardReducer.deckId, card))

    //setState front_editable: false
    this.setFrontNotEditable()
  }

  toggleAnswer(){
    this.setState({
      toggleAnswer: !this.state.toggleAnswer
    })
  }

  hideAnswer(){
    this.setState({
      toggleAnswer: false
    })
  }

  cancelChanges(){
    this.setFrontNotEditable()
  }

  deleteCard(){
    const { card } = this.state
    const { dispatch, navigation, getCardReducer } = this.props
    console.log("L166 deleteCard card.deckId = ", card.deckId)
    dispatch(deleteCardAction(getCardReducer.deckId, card.cardId))
    navigation.goBack()
  }

  render(){
    // setTestData()
    const { front_editable, back_editable, card } = this.state
    const { getCardReducer, getDeckReducer, navigation } = this.props
    // console.log("L112 FlashCard this.props = ", this.props)
    // console.log("L113 FlashCard this.state = ", this.state)

    return(
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View style={styles.deck_title}>
          <Text style={{fontSize: 27}}>Title: {getDeckReducer.deck && getDeckReducer.deck.title}</Text>
          {
            !this.state.front_editable
            ?
            <View>
              <TouchableOpacity
                onPress={() => this.deleteCard()}
                style={styles.edit_icon}>
                <MaterialIcons name="delete-forever" size={30}/>
                <Text>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.edit_icon}
                onPress={() => this.setFrontEditable()}
              >
                <FontAwesome name="pencil-square-o" size={30}/>
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>
            :
            <View>
              <TouchableOpacity
                onPress={() => this.saveChanges()}
              >
                <FontAwesome name="save" size={30}/>
                <Text>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.cancelChanges()}
              >
                <FontAwesome name="close" size={30}/>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
        <ScrollView style={{flex: 1}}>
          <KeyboardAvoidingView
            style={styles.question}
            behavior="padding"
          >
            <Text
              style={{fontSize: 20}}
            >
              Question:
            </Text>
            <TextInput
              style={styles.textInput}
              multiline = {true}
              numberOfLines = {4}
              editable={front_editable}
              onChangeText={(questionValue) => this.setState({questionValue})}
              value={this.state.questionValue}
            />
            {
              this.state.toggleAnswer &&
              <TextInput
                style={styles.textInput}
                multiline = {true}
                numberOfLines = {4}
                editable={front_editable}
                onChangeText={(answerValue) => this.setState({answerValue})}
                value={this.state.answerValue}
              />
            }
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.answer_buttons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.button_text}>True</Text>
          </TouchableOpacity>
          <View style={styles.answerSwitch}>
            <Switch
              onValueChange={() => this.toggleAnswer()}
              value={this.state.toggleAnswer}
            />
            <Text style={{fontSize: 20}}>Answer</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.button_text}>False</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardNavigation}>
          <TouchableOpacity
            onPress={() => this.getPreviousCard()}
            disabled={this.state.disabledPrevCardBtn}
          >
            <MaterialIcons name="arrow-back" size={30}/>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={true}
          >
            <Text style={{fontSize: 18}}>
              Card {this.state.cardIndex + 1}/{this.state.deckLength}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.getNextCard()}
            disabled={this.state.disabledNextCardBtn}
          >
            <MaterialIcons name="arrow-forward" size={30}/>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )//return()
  }//render()
}//class FlashCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "space-between",
  },
  deck_title: {
    flexDirection: "row",
    borderBottomWidth: 2,
    justifyContent: "space-between",
    // textAlign: "left",
  },
  edit_icon: {
    alignSelf: "center",
  },
  textInput: {
    marginTop: 10,
    fontSize: 25,
    height: 60
  },
  answer_buttons:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  answerSwitch: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#A3A3A3",
    width: 100,
    height: 60,
    borderRadius: 3,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    justifyContent: "center",
  },
  button_text: {
    fontSize: 25,
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardNavigation: {
    //align inline
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 20,
  }
})

function mapStateToProps(state){
  const {getCardReducer, getDeckReducer} = state
  return {
    getDeckReducer: getDeckReducer,
    getCardReducer: getCardReducer,
  }
}

export default connect(mapStateToProps)(FlashCard)
