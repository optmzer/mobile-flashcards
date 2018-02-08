import React, {Component} from 'react'
import { connect } from 'react-redux'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import * as _ from 'underscore'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import {
  getDeckAction,
  deleteDeckAction,
} from '../actions'

/**TODO: Add TabDrawer to edit deck ???
Add card,
Rename Deck title,
*/
class Deck extends Component{

  //TODO: add deleteDeck(deckId) method.
  // componentWillReceiveNewProps(){
  //
  // }

deleteDeck(){
  const { navigation, dispatch } = this.props
  dispatch(deleteDeckAction(navigation.state.params.deck.deckId))
}

componentDidMount(){
  const { navigation, dispatch } = this.props
  dispatch(getDeckAction(navigation.state.params.deck.deckId))
}

  render(){

    const { navigation, getDeckReducer } = this.props
    // const { deck } = this.props.navigation.state.params
    console.log("L40 Deck getDeckReducer = ", getDeckReducer)
    let deckId = 0, title = "", numbOfCards = 0

    if(!_.isEmpty(getDeckReducer)){//if not empty
      deckId = getDeckReducer.deck.deckId
      title = getDeckReducer.deck.title
      numbOfCards = getDeckReducer.deck.questions.length
    }
    return(
      <View style={styles.container}>
        { !_.isEmpty(getDeckReducer) &&
          <Text style={styles.containerText}>
            deckId: {deckId}
          </Text>
        }
        <Text style={styles.containerText}>
          Title: {title}
        </Text>
        <Text style={styles.containerText}>
          Cards: {numbOfCards}
        </Text>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <FontAwesome name="home" size={30}/>
            <Text>Return</Text>
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
  }
})

function mapStateToProps(state){
  const { getDeckReducer } = state
  return{
    getDeckReducer: getDeckReducer,
  }
}

export default connect(mapStateToProps)(Deck)
