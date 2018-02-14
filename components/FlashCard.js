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
  BackHandler,
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
  setQuizScoreAction,
  finishQuizAction,
} from '../actions'

/**
TODO:
Increment score and show percentage.
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
    startQuiz: false,
    quizScore: 0,
    voteCounter: 0,
  }

  componentWillMount(){
    const { getDeckReducer, getCardReducer, quizReducer } = this.props
    let deck = getDeckReducer.deck.questions.forEach((card, index) => {
        if(!_.isEmpty(card) && card.cardId === getCardReducer.cardId){
          this.setState({
            card: card,
            deckLength: getDeckReducer.deck.questions.length,
            cardIndex: index,
            questionValue: card.question,
            answerValue: card.answer,
            startQuiz: quizReducer.startQuiz,
          })
        }
    })//.forEach()
  }//componentWillMount()

  componentDidMount(){
    // BackHandler.addEventListener("hardwareBackPress", this.onBackButtonPressAndroid)
  }

  componentWillUnmount(){
    const { dispatch } = this.props
    dispatch(finishQuizAction())
    dispatch(setQuizScoreAction(0))
    // BackHandler.removeEventListener("hardwareBackPress", this.onBackButtonPressAndroid)

  }

  // onBackButtonPressAndroid = () => {
  //   const {dispatch, quizReducer, navigation} = this.props
  //   if(this.state.startQuiz){
  //     dispatch(finishQuizAction())
  //     dispatch(setQuizScoreAction(0))
  //     this.setState({
  //       startQuiz: false,
  //       quizScore: 0,
  //     })
  //     navigation.goBack()
  //     return true
  //   }else{
  //     return false
  //   }
  // }

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

  correctAnswer(){
    const { dispatch } = this.props
    const { cardIndex, deckLength, voteCounter } = this.state

      if(voteCounter < deckLength){
        this.setState({
          quizScore: this.state.quizScore + 1,
          voteCounter: this.state.voteCounter + 1
        })
        dispatch(setQuizScoreAction(this.state.quizScore + 1))
        this.getNextCard()
      }
  }//correctAnswer()

  incorrectAnswer(){
    const { voteCounter, deckLength } = this.state

    if(voteCounter < deckLength){
      this.getNextCard()
      this.setState({
        voteCounter: this.state.voteCounter + 1
      })
    }
  }//incorrectAnswer()

  getQuizScore(){
    const { quizReducer } = this.props
    let score = 0
    console.log("L191 FlashCard ", quizReducer.quizScore);
    if(quizReducer.quizScore){//If it is a number
      score = ((quizReducer.quizScore / this.state.deckLength)*100).toFixed(2)
    }
    return score
  }//getQuizScore()

  render(){
    // setTestData()
    const { front_editable, back_editable, card } = this.state
    const { quizReducer, getCardReducer, getDeckReducer, navigation } = this.props
    // console.log("L112 FlashCard this.props = ", this.props)
    // console.log("L113 FlashCard this.state = ", this.state)

    return(
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View style={styles.deck_title}>
          <Text style={{fontSize: 27}}>
            Deck: {getDeckReducer.deck && getDeckReducer.deck.title}
          </Text>

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
              numberOfLines = {3}
              editable={front_editable}
              onChangeText={(questionValue) => this.setState({questionValue})}
              value={this.state.questionValue}
            />
            {
              this.state.toggleAnswer &&
              <View>
                <Text
                  style={{fontSize: 20}}
                >
                  Answer:
                </Text>
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
          </KeyboardAvoidingView>
        </ScrollView>
        { this.state.startQuiz &&
          <View style={styles.answer_buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.correctAnswer()}
            >
              <Text style={styles.button_text}>Correct</Text>
            </TouchableOpacity>
            <View style={styles.score}>
              <Text style={{fontSize: 20}}>Score: </Text>
              <Text style={{fontSize: 20}}>
                {this.getQuizScore()} %
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.incorrectAnswer()}
            >
              <Text style={styles.button_text}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        }
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
        { !this.state.startQuiz &&
          <TouchableOpacity
            onPress={() => this.getPreviousCard()}
            disabled={this.state.disabledPrevCardBtn}
          >
              <MaterialIcons name="arrow-back" size={30}/>
          </TouchableOpacity>
        }
          <TouchableOpacity
            disabled={true}
          >
            <Text style={{fontSize: 18}}>
              Card {this.state.cardIndex + 1}/{this.state.deckLength}
            </Text>
          </TouchableOpacity>
        { !this.state.startQuiz &&
          <TouchableOpacity
            onPress={() => this.getNextCard()}
            disabled={this.state.disabledNextCardBtn}
          >
              <MaterialIcons name="arrow-forward" size={30}/>
          </TouchableOpacity>
        }
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
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  edit_icon: {
    alignSelf: "center",
  },
  textInput: {
    // marginTop: 5,
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
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  cardNavigation: {
    //align inline
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  }
})

function mapStateToProps(state){
  const {getCardReducer, getDeckReducer, quizReducer} = state
  return {
    getDeckReducer: getDeckReducer,
    getCardReducer: getCardReducer,
    quizReducer: quizReducer,
  }
}

export default connect(mapStateToProps)(FlashCard)
