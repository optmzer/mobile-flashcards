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
import {
  getCardAction,
  deleteCardAction,
  getDeckAction,
  deleteDeckAction,
} from '../actions'

/**TODO: Add TabDrawer to edit deck ???
Add card,
Rename Deck title,
*/
class Deck extends Component{

  //TODO:
  // componentWillReceiveNewProps(){
  //
  // }

deleteDeck(){
  const { getDeckReducer, dispatch } = this.props
  dispatch(deleteDeckAction(getDeckReducer.deck.deckId))
}

componentDidMount(){
  const { navigation, dispatch } = this.props
  // dispatch(getDeckAction(navigation.state.params.deck.deckId))
}

getCard(card){
  const { navigation, dispatch, getDeckReducer } = this.props
  dispatch(getCardAction(getDeckReducer.deck.deckId, card))
  navigation.navigate("FlashCard")
}

_keyExtractor = (item, index) => {
  return index
}//_keyExtractor()

_renderItem = ({item}) => {

  const { navigation, dispatch } = this.props

  return (
    <View>
      {
        !_.isEmpty(item)
        ?
        <TouchableOpacity
          onPress={() => this.getCard(item)}
        >
          <View>
            <Text style={styles.questionList}>Q: {item.question}</Text>
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
    // const { deck } = this.props.navigation.state.params
    console.log("L81 Deck getDeckReducer = ", getDeckReducer)
    let deckId = 0, title = "", numbOfCards = 0, cards = []

    if(!_.isEmpty(getDeckReducer.deck)){//if not empty
      deckId = getDeckReducer.deck.deckId
      title = getDeckReducer.deck.title
      numbOfCards = getDeckReducer.deck.questions.length
      cards = getDeckReducer.deck.questions
    }
    return(
      <View style={styles.container}>
        <Text style={styles.containerText}>
          Title: {title}
        </Text>
        <Text style={styles.containerText}>
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
          <TouchableOpacity style={styles.button}>
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
  containerText: {
    fontSize: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    // paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    alignItems: "center",
  },
  questionList: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
})

function mapStateToProps(state){
  const { getDeckReducer } = state
  return{
    getDeckReducer: getDeckReducer,
  }
}

export default connect(mapStateToProps)(Deck)
