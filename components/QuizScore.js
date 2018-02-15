import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons"
import {connect} from 'react-redux'
import {
  setQuizScoreAction,
  startQuizAction,
  getCardAction,
  finishQuizAction,
} from '../actions'
import * as _ from 'underscore'

/**
  TODO:
  1 - Show QuizScore
  2 - restart the quiz.
  3 - start new quiz. go Home.
*/

class QuizScore extends Component {

  // repeatQuiz(){
  //   const { navigation, getDeckReducer, dispatch } = this.props
  //
  //   if(!_.isEmpty(getDeckReducer.deck) && getDeckReducer.deck.questions.length !== 0){
  //     let firstCard = getDeckReducer.deck.questions[0]
  //
  //     //Get first card in the Deck.
  //     dispatch(getCardAction(getDeckReducer.deck.deckId, firstCard))
  //
  //     dispatch(startQuizAction())
  //   }
  //   navigation.navigate("FlashCard")
  // }//repeatQuiz()

  render(){

    const { navigateHome, repeatQuiz, quizReducer, score } = this.props

    return(
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
          <Text style={{fontSize: 20}}> {score} % </Text>
          <MaterialCommunityIcons
            style={{transform: [{scaleX: -1}]}}
            name="thumb-up-outline"
            size={30}
          />
        </View>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlsBtn}
          >
            <FontAwesome
              name="home"
              size={30}
              onPress={() => navigateHome()}
            />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlsBtn}
          >
            <FontAwesome
              name="rotate-right"
              size={30}
              onPress={() => repeatQuiz()}
            />
            <Text>Repeat</Text>
          </TouchableOpacity>
        </View>
      </View>
    )//return()
  }//render()
}//class QuizScore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
  controlsBtn: {
    alignItems: "center",

  }
})//const styles

function mapStateToProps(state){
  const { quizReducer, getDeckReducer } = state
  return {
    quizReducer: quizReducer,
    getDeckReducer: getDeckReducer,
  }
}//mapStateToProps()

export default connect(mapStateToProps)(QuizScore)
