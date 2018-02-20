import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Button,
  TouchableHighlight,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons"
import * as _ from 'underscore'
import {
  getCardAction,
  getDeckAction,
  setQuizScoreAction,
  finishQuizAction,
  startQuizAction,
} from '../actions'

/**
TODO:
Has a bug???
Home button needs to be pressed 2 times before it let you go Home.
Do not know how to fix yet.
TODO:

*/

class Quiz extends Component{

  state = {
    disabledNextCardBtn: false,
    disabledPrevCardBtn: false,
    card: {},
    deckLength: 0,
    cardIndex: 0,
    toggleAnswer: false,
    questionValue: "",
    answerValue: "",
    startQuiz: false,
    quizScore: 0,
    voteCounter: 0,
    restartOnce: 1,
  }

  componentWillMount(){
    const { getDeckReducer, getCardReducer, quizReducer } = this.props
    let deck = getDeckReducer.deck.questions.forEach((card, index) => {
        if(!_.isEmpty(card) && card.cardId === getCardReducer.cardId){
          this.setState({
            deckId: getDeckReducer.deck.deckId,
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

  componentWillUnmount(){
    this.setState({
      restartOnce: 1
    })
  }

  getNextCard(){
    const { cardIndex, deckLength } = this.state
    const { getDeckReducer, dispatch } = this.props

    this.hideAnswer()//Switches answer off

    if(cardIndex < deckLength - 1){
      let nextCard = getDeckReducer.deck.questions[cardIndex + 1]
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
  }//getNextCard()

  toggleAnswer(){
    this.setState({
      toggleAnswer: !this.state.toggleAnswer,
    })
  }

  hideAnswer(){
    this.setState({
      toggleAnswer: false
    })
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

      if(voteCounter === deckLength - 1){
        dispatch(finishQuizAction())
      }
  }//correctAnswer()

  incorrectAnswer(){
    const { voteCounter, deckLength } = this.state
    const { dispatch } = this.props
    if(voteCounter < deckLength){
      this.getNextCard()
      this.setState({
        voteCounter: this.state.voteCounter + 1
      })
    }

    if(voteCounter === deckLength - 1){
      dispatch(finishQuizAction())
    }
  }//incorrectAnswer()

  getCurrentQuizScore(){
    const { quizReducer } = this.props
    let score = 0
    if(quizReducer.quizScore){//If it is a number
      score = ((quizReducer.quizScore / this.state.deckLength)*100).toFixed(2)
    }
    return score
  }//getCurrentQuizScore()

  repeatQuiz(){
    const { navigation, getDeckReducer, dispatch } = this.props

    const replaceAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Deck" })]
    })


    // if(!_.isEmpty(getDeckReducer.deck) && getDeckReducer.deck.questions.length !== 0){
    if(this.state.restartOnce === 1){
      let firstCard = getDeckReducer.deck.questions[0]

      //Get first card in the Deck.
      dispatch(getCardAction(getDeckReducer.deck.deckId, firstCard))
      dispatch(startQuizAction())
      navigation.state.key ? this.props.navigation.dispatch(replaceAction) : null
      navigation.navigate("Quiz")
    }

    this.setState({
      restartOnce: 0
    })
    // }
  }//repeatQuiz()

  navigateHome(){
    const { navigation } = this.props

    const replaceAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })]
    })

    navigation.state.key ? this.props.navigation.dispatch(replaceAction) : null
    navigation.navigate("Home")
  }

  render(){
    // setTestData()
    const { card, voteCounter, deckLength } = this.state
    const { dispatch, quizReducer, getCardReducer, getDeckReducer, navigation } = this.props
    // console.log("L204 Quiz this.props = ", this.props.quizReducer)
    // console.log("L205 Quiz this.state = ", this.state)

    return(
      <View
        style={styles.container}
        behavior="padding"
      >
        <View style={styles.deck_title}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>
              {getDeckReducer.deck && getDeckReducer.deck.title}
            </Text>
          </View>
        </View>
        <ScrollView style={{flex: 1}}>
          <View
            style={styles.question}
            behavior="padding"
          >
          { voteCounter === deckLength ?
            <View style={styles.container}>
              <View
                style={styles.emoticon}
              >
                <MaterialIcons
                  name="insert-emoticon"
                  size={60}
                />
                <Text style={{fontSize: 20}} >
                  You have completed the quiz with
                </Text>
              </View>
              <View style={styles.score}>
                <MaterialCommunityIcons name="thumb-up-outline" size={30}/>
                <Text style={{fontSize: 20}}> {this.getCurrentQuizScore()} % </Text>
                <MaterialCommunityIcons
                  style={{transform: [{scaleX: -1}]}}
                  name="thumb-up-outline"
                  size={30}
                />
              </View>
            </View>
            :
            <View>
              <Text style={styles.textInputHeaders}>Question</Text>
              <TextInput
                style={styles.textInput}
                multiline = {true}
                numberOfLines = {3}
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
                    onChangeText={(answerValue) => this.setState({answerValue})}
                    value={this.state.answerValue}
                  />
                </View>
              }
            </View>
          }
          </View>
        </ScrollView>
        { quizReducer.startQuiz &&
          <View>
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
                {this.getCurrentQuizScore()} %
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.incorrectAnswer()}
            >
              <Text style={styles.button_text}>Incorrect</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.stats}>
            <View style={styles.answerSwitch}>
              <Text style={{fontSize: 20}}>Show answer</Text>
              <Switch
                onValueChange={() => this.toggleAnswer()}
                value={this.state.toggleAnswer}
              />
            </View>
          </View>
          </View>
        }

        <View
          style={styles.cardNavigation}
        >
        { voteCounter === deckLength &&
          <TouchableOpacity 
            style={styles.controlsBtn}
            onPress={() => {
              console.log("L324 Quiz Home Button Pressed")
                this.navigateHome()}
              }
            >
            <View>
              <FontAwesome
                name="home"
                size={30}
                />
              <Text>Home</Text>
            </View>
          </TouchableOpacity >
        }
          <TouchableOpacity
            disabled={true}
          >
            <Text style={{fontSize: 18}}>
              Card {this.state.cardIndex + 1}/{this.state.deckLength}
            </Text>
          </TouchableOpacity>
        { voteCounter === deckLength &&
          <TouchableOpacity 
            style={styles.controlsBtn}
            onPress={() => {
              console.log("L323 Quiz Repeat Button Pressed")
                this.repeatQuiz()
            }}
            >
            <View>
              <FontAwesome
                name="rotate-right"
                size={30}
              />
              <Text>Repeat</Text>
            </View>
          </TouchableOpacity >
        }
        </View>
      </View>
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
  controlsBtn: {
    alignItems: "center",
  },
  emoticon: {
    marginTop: 15,
    alignItems: "center",
  },
  score: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
})//const styles

function mapStateToProps(state){
  const {getCardReducer, getDeckReducer, quizReducer} = state
  return {
    getDeckReducer: getDeckReducer,
    getCardReducer: getCardReducer,
    quizReducer: quizReducer,
  }
}//mapStateToProps()

export default connect(mapStateToProps)(Quiz)
