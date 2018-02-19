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
    const { getDeckReducer, getCardReducer} = this.props
    let deck = getDeckReducer.deck.questions.forEach((card, index) => {
        if(!_.isEmpty(card) && card.cardId === getCardReducer.cardId){
          this.setState({
            deckId: getDeckReducer.deck.deckId,
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
      // console.log("L74 getNextCard nextCardId = ", nextCard)
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
      // console.log("L101 getPreviousCard nextCardId = ", nextCard)
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
    dispatch(saveEditedCardAction(getCardReducer.deckId, card))

    //setState front_editable: false
    this.setFrontNotEditable()
  }

  toggleAnswer(){
    this.setState({
      toggleAnswer: !this.state.toggleAnswer,
      // startQuiz: !this.state.startQuiz
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
    dispatch(deleteCardAction(getCardReducer.deckId, card.cardId))
    navigation.goBack()
  }

  render(){
    // setTestData()
    const { front_editable, back_editable, card, voteCounter, deckLength } = this.state
    const { dispatch, quizReducer, getCardReducer, getDeckReducer, navigation } = this.props
    // console.log("L112 FlashCard this.props = ", this.props)
    // console.log("L113 FlashCard this.state = ", this.state)

    return(
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View style={styles.deck_title}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>
              {getDeckReducer.deck && getDeckReducer.deck.title}
            </Text>
          </View>
          { !this.state.startQuiz &&
          <View style={styles.editableControls}>
            {
              !this.state.front_editable
              ?
              <View style={styles.editable}>
                <TouchableOpacity
                  onPress={() => this.deleteCard()}
                  style={styles.editableIcons}>
                  <MaterialIcons name="delete-forever" size={30}/>
                  <Text>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editableIcons}
                  onPress={() => this.setFrontEditable()}
                >
                  <FontAwesome name="pencil-square-o" size={30}/>
                  <Text>Edit</Text>
                </TouchableOpacity>
              </View>
              :
              <View style={styles.editable}>
                <TouchableOpacity
                  style={styles.editableIcons}
                  onPress={() => this.saveChanges()}
                >
                  <FontAwesome name="save" size={30}/>
                  <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editableIcons}
                  onPress={() => this.cancelChanges()}
                >
                  <FontAwesome name="close" size={30}/>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        }
        </View>
        <ScrollView style={{flex: 1}}>
          <KeyboardAvoidingView
            style={styles.question}
            behavior="padding"
          >
            <View>
            <Text style={styles.textInputHeaders}>Question</Text>
            <TextInput
              style={styles.textInput}
              multiline = {true}
              numberOfLines = {3}
              editable={front_editable}
              onChangeText={(questionValue) => this.setState({questionValue})}
              value={this.state.questionValue}
            />
            {
              this.state.toggleAnswer &&
              <View>
                <Text style={styles.textInputHeaders}>Answer</Text>
                <TextInput
                  style={styles.textInput}
                  multiline = {true}
                  numberOfLines = {3}
                  editable={front_editable}
                  onChangeText={(answerValue) => this.setState({answerValue})}
                  value={this.state.answerValue}
                />
              </View>
            }
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.stats}>
          <View style={styles.answerSwitch}>
            <Text style={{fontSize: 20}}>Show answer</Text>
            <Switch
              onValueChange={() => this.toggleAnswer()}
              value={this.state.toggleAnswer}
            />
          </View>
        </View>
        <View
          style={[styles.cardNavigation, {
            marginBottom: this.state.startQuiz ? 26 : 20,
          }]}
        >
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
    marginLeft: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  titleView: {
    flex: 3,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  editableControls: {
    flex: 2,
  },
  editable: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "space-around",
  },
  editableIcons: {
    alignItems: "center",
  },
  textInputHeaders: {
    fontSize: 20,
    marginLeft: 10,
    textDecorationLine: "underline",
    color: "#808080",
  },
  textInput: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 25,
  },
  answer_buttons:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    paddingTop: 5,
    marginBottom: 15,
  },
  answerSwitch: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stats: {
    // flexDirection: "row",
  },
  score: {
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#A3A3A3",
    width: 100,
    height: 40,
    borderRadius: 3,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    justifyContent: "center",
  },
  button_text: {
    fontSize: 20,
    textAlign: "center",
  },
  cardNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
})

function mapStateToProps(state){
  const {getCardReducer, getDeckReducer} = state
  return {
    getDeckReducer: getDeckReducer,
    getCardReducer: getCardReducer,
  }
}

export default connect(mapStateToProps)(FlashCard)
