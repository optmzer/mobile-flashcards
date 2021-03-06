import React, {Component} from 'react'
import { connect } from 'react-redux'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import * as _ from 'underscore'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import {
  getCardAction,
  deleteCardAction,
  getDeckAction,
  deleteDeckAction,
  startQuizAction,
} from '../actions'
import { clearLocalNotification } from '../utils/helpers'

/**
 * Component that displays content of a Deck.
 * List of questions
 * and controls.
 */
class Deck extends Component{

/**
 * If a Deck was opened that means user did study. 
 * Cancel all notifications for today
 */
componentDidMount(){
  const { navigation, dispatch } = this.props
  clearLocalNotification()
}

/**
 * @param {obj} card 
 * @param {string} quizOrFalashCard - view in StackNavigator "Quiz" or "FlashCard"
 * Accepts first card in the deck and navigates to either 
 * Quiz of FlashCard view.
 */
getCard(card, quizOrFalashCard){
  const { navigation, dispatch, getDeckReducer } = this.props
  dispatch(getCardAction(getDeckReducer.deck.deckId, card))
  navigation.navigate(quizOrFalashCard)
}

deleteDeck(){
  const { getDeckReducer, dispatch, navigation } = this.props
  dispatch(deleteDeckAction(getDeckReducer.deck.deckId))

  //reset route so that user could not go back to deleted Deck.
  const replaceAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Home" })]
  })
  navigation.state.key ? this.props.navigation.dispatch(replaceAction) : null
}

/**
 * Gets the first card in the Deck and navigates to Quiz view
 * Where quiz logic is.
 */
startQuiz(){
  const { navigation, dispatch, getDeckReducer } = this.props

  if(!_.isEmpty(getDeckReducer.deck) && getDeckReducer.deck.questions.length !== 0){
    let firstCard = getDeckReducer.deck.questions[0]
    dispatch(startQuizAction())
    //Get first card in the Deck.
    this.getCard(firstCard, "Quiz")
  }
}


/**
 * FlatList service function 
 * Generates unique key for each item to render
 */
_keyExtractor = (item, index) => {
  return index
}//_keyExtractor()

/**
 * FlatList service function 
 * Defines how to render each element
 * item is a question card.
 */
_renderItem = ({item}) => {

  const { navigation, dispatch } = this.props

  return (
    <View>
      {
        !_.isEmpty(item)
        ?
        <TouchableOpacity
          onPress={() => this.getCard(item, "FlashCard")}
        >
          <View style={styles.questionEntryView}>
            <Text style={styles.questionList}>Q: {item.question}</Text>
            <MaterialIcons
              style={styles.questionIcon}
              name="touch-app"
              color="#808080"
              size={30}/>
          </View>
        </TouchableOpacity>
        :
        <View>
          <Text style={styles.containerText}>This deck has 0 cards to display.</Text>
          <Text style={styles.containerText}>Add more cards.</Text>
        </View>
      }
    </View>
  )
}//_renderItem()

  render(){

    const { navigation, getDeckReducer } = this.props

    let deckId = 0, title = "", numbOfCards = 0, cards = []

    //if not empty
    if(!_.isEmpty(getDeckReducer.deck)){
      deckId = getDeckReducer.deck.deckId
      title = getDeckReducer.deck.title
      numbOfCards = getDeckReducer.deck.questions.length
      cards = getDeckReducer.deck.questions
    }
    return(
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={{fontSize: 18, marginLeft: 10}}>
          Cards: {numbOfCards}
        </Text>
        <FlatList
          data={cards}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
         />
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <FontAwesome name="home" size={30}/>
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.startQuiz()}
          >
            <MaterialIcons name="play-arrow" size={30}/>
            <Text>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddCard", {deckId: deckId})}
          >
            <MaterialIcons name="playlist-add" size={30}/>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.deleteDeck()
              navigation.goBack()
            }}
            style={styles.button}>
            <MaterialIcons name="delete-forever" size={30}/>
            <Text>Delete Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )//return()
  }//render()
}//class Deck

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },
  containerText: {
    fontSize: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 20,
  },
  button: {
    alignItems: "center",
  },
  questionEntryView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#A0A0A0",
    marginLeft: 10,
    marginRight: 10,
  },
  questionList: {
    flex: 7,
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  questionIcon: {
    flex: 1,
  }
})

function mapStateToProps(state){
  const { getDeckReducer } = state
  return{
    getDeckReducer: getDeckReducer,
  }
}

export default connect(mapStateToProps)(Deck)