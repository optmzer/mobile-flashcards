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

      </View>
    )
  }

  render(){

    // console.log("L79 Home this.state = ", this.state)
    // console.log("L80 Home this.props = ", this.props)

    // console.log("L60 Home this.props.navigation.state = ", this.props.navigation.state)

    const { decks } = this.props.getAllDecksReducer
    // console.log("L69 Home decks = ", decks)
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
}//class Home

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

export default connect(mapStateToProps)(Home)
