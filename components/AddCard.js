import React, {Component} from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

//TODO: make TextInput multiliners.

class AddCard extends Component{

  state = {
    question: "",
    answer: "",
  }

  cancelAddCard(){
    this.setState({
      question: "",
      answer: "",
    })
  }

  render(){
    const { navigation } = this.props

    return(
      <View style={styles.container}>
        <Text>{"\n"}</Text>
        <TextInput
          placeholder="Question"
          onChangeText={(question) => this.setState({question})}
          value={this.state.text}
          style={styles.cardInput}
        />
        <TextInput
          placeholder="Answer"
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.text}
          style={styles.cardInput}
        />
        <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
        >
          <FontAwesome name="home" size={40}/>
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="save" size={40}/>
            <Text>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlsBtn}
            onPress={() => this.cancelAddCard()}
          >
          <FontAwesome name="trash-o" size={40}/>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    )//return()
  }//render()
}//class AddCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controls: {

  },
  cardInpur: {
    height: 150,
  },
})//styles

export default AddCard
