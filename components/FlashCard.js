import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

class FlashCard extends Component{
  render(){
    return(
      <View>
        <Text>Deck Title</Text>
        <Text>Question Content</Text>
        <Text>{"\n"}</Text>
        <Text>Do you concure?</Text>
        <Text>{"\n"}</Text>
        <TouchableOpacity>
          <Text>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>No</Text>
        </TouchableOpacity>
        <Text>{"\n"}</Text>
        <Text>Show a hint</Text>
      </View>
    )//return()
  }//render()
}//class FlashCard

export default FlashCard
