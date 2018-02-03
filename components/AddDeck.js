import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import {
  FontAwesome,
} from "@expo/vector-icons"

class AddDeck extends Component{

  state = {
    placeHolder: "Deck Title",
  }

  render(){
    return(
      <View style={styles.container}>
        <TextInput>
          {this.state.placeHolder}
        </TextInput>
        <TouchableOpacity>
          <FontAwesome name="save" size={25}/>
        </TouchableOpacity>
        <TouchableOpacity>
        <FontAwesome name="trash-o" size={25}/>
        </TouchableOpacity>
      </View>
    )//return()
  }//render()
}//class AddDeck

const styles = StyleSheet.create({
  continer: {
    flex: 1,
  },//container
})

export default AddDeck
