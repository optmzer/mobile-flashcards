import React, {Component} from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { cardStorage, convertObjectToArray } from '../utils/helpers'

class Home extends Component {
  _keyExtractor = (item, index) => {
    return (item.title + index)
  }

  _renderItem = ({item}) => {
    return (
      <View style={styles.deckListItem}>
        {
          item
          ?
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Deck', {deckId: item.deckId})}
            >
              <View>
                <Text>Title: {item.title}</Text>
                <Text>deckId: {item.deckId}</Text>
                <Text>No of Cards {item.questions.length}</Text>
                <Text>Date Modified</Text>
              </View>
            </TouchableOpacity>
          :
            <View>
              <Text>The list is empty</Text>
              <Text>Add more cards</Text>
            </View>
        }
      </View>
    )
  }

  render(){

    let listData = convertObjectToArray(cardStorage)
    // console.log("L32 Home listData = ", listData)
    return(
      <View style={styles.continer}>
        <FlatList
          data={listData}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
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


export default Home
