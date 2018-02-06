import React, {Component} from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { getDeckAction } from '../actions'

/**TODO: Add TabDrawer to edit deck ???
Add card,
Rename Deck title,
*/
class Deck extends Component{

  //TODO: add deleteDeck(deckId) method.
  // componentWillReceiveNewProps(){
  //
  // }
componentDidMount(){
  const { navigation, dispatch } = this.props

  dispatch(getDeckAction(navigation.state.params.deckId))
}

  render(){

    const { navigation } = this.props
    return(
      <View style={styles.container}>
        { navigation.state.params &&
          <Text style={styles.containerText}>
          deckId: {navigation.state.params.deckId}
          </Text>
        }
        <Text style={styles.containerText}>Title: </Text>
        <Text style={styles.containerText}>Cards: </Text>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={30}/>
            <Text>Return</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <MaterialIcons name="play-arrow" size={30}/>
            <Text>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddCard")}
          >
            <MaterialIcons name="playlist-add" size={30}/>
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
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

export default connect()(Deck)
