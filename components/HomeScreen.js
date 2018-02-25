import React, {Component} from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { getAllDecks, convertObjectToArray, setTestData } from '../utils/helpers'
import * as Action from '../actions'
import { connect } from 'react-redux'

/**
 * Lists all decks in the storage.
 * If no decks found displays prompt to add some
 */

class HomeScreen extends Component {

  componentWillMount(){
    this.props.dispatch(Action.getAllDecksAction())
  }//componentWillMount()

  _keyExtractor = (item, index) => {
    return (item.deckId)
  }

  _renderItem = ({item}) => {
    const { dispatch } = this.props

    return (
      <View style={styles.deckListItem}>
        { item.title &&
          <TouchableOpacity
            style={styles.deck}
            onPress={() => {
              dispatch(Action.getDeckAction(item.deckId))
              this.props.navigation.navigate('Deck')}
            }
          >
            <View style={{flex: 7}}>
              <Text style={styles.deckText}>{item.title}</Text>
              <Text style={{fontSize: 18}}>Cards {item.questions ? item.questions.length : 0}</Text>
            </View>
            <View style={{flex: 1}}>
              <MaterialIcons name="keyboard-arrow-right" color="#808080" size={35}/>
            </View>
          </TouchableOpacity>
        }
      </View>
    )
  }

  render(){

    const { decks } = this.props.getAllDecksReducer
    return(
      <View style={styles.continer}>
        { decks && decks.length > 0
          ?
           <FlatList
            data={decks}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
          :
          <View>
            <Text>The list is empty</Text>
            <Text>Add more decks</Text>
          </View>
        }
      </View>
    )//return()
  }//render()
}//class HomeScreen

const styles = StyleSheet.create({
  continer: {
    flex: 1,
  },
  deckListItem: {
    marginLeft: 10,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#A0A0A0",
  },
  deck: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deckText: {
    fontSize: 20,
    fontWeight: "bold",
  },
})

function mapStateToProps(state){
  const { getAllDecksReducer } = state
  return {
    getAllDecksReducer,
  }
}

export default connect(mapStateToProps)(HomeScreen)
