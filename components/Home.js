import React, {Component} from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { cardStorage, convertObjectToArray } from '../utils/helpers'

//TODO: this is a list of All Decks.
function DeckListItem({title}){
  return (
    <View>
      <Text>Title: {title}</Text>
      <Text>No: Cards</Text>
      <Text>Date Modified</Text>
    </View>
  )
}

class Home extends Component {
  _keyExtractor = (item, index) => {
    return (item.title + index)
  }

  _renderItem = ({item}) => {
    return <DeckListItem {...item}/>
  }

  render(){

    let listData = convertObjectToArray(cardStorage)
    // console.log("L32 Home listData = ", listData)
    return(
      <View style={styles.continer}>
        <Text>Home</Text>
        <Text>There will be List of scrollable and</Text>
        <Text>touchable Items.</Text>

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
})


export default Home
