import React, {Component} from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { getAllDecks, convertObjectToArray, setTestData } from '../utils/helpers'
import {FLASH_CARD_STORAGE_KEY} from '../utils/api'
import * as Action from '../actions'
import { connect } from 'react-redux'

class Home extends Component {

  componentWillMount(){
    // setTestData() //run only once on every Expo App reload.
    this.props.dispatch(Action.getAllDecksAction())
  }//componentWillMount()

  _keyExtractor = (item, index) => {
    // console.log("L24 Home item.deckId = ", item.deckId)
    return (item.deckId)
  }

  _renderItem = ({item}) => {
    // console.log("L29 Home item = ", item)
    const { dispatch } = this.props

    return (

      <View style={styles.deckListItem}>
        {
          item.title
          ?
            <TouchableOpacity
              onPress={() => {
                dispatch(Action.getDeckAction(item.deckId))
                this.props.navigation.navigate('Deck')}
              }
            >
              <View>
                <Text>Title: {item.title}</Text>
                <Text>No of Cards {item.questions.length}</Text>
                <Text>Date Modified</Text>
              </View>
            </TouchableOpacity>
          :
            <View>
              <Text>The list is empty</Text>
              <Text>Add more decks</Text>
            </View>
        }
      </View>
    )
  }

  render(){

    // console.log("L79 Home this.state = ", this.state)
    // console.log("L80 Home this.props = ", this.props)

    const { decks } = this.props.getAllDecksReducer
    // console.log("L66 Home decks = ", decks)
    return(
      <View style={styles.continer}>
        { decks
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
}//class Home

const styles = StyleSheet.create({
  continer: {
    flex: 1,
  },
  deckListItem: {
    height: 100,
    borderBottomWidth: 1,
  }
})

function mapStateToProps(state){
  const { getAllDecksReducer } = state
  return {
    getAllDecksReducer,
  }
}

export default connect(mapStateToProps)(Home)
