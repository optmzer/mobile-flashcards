import React, {Component} from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
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
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
      >
        <TextInput
          placeholder="Question"
          onChangeText={(question) => this.setState({question})}
          value={this.state.text}
          style={[styles.cardInput, {marginTop: 30}]}
        />
        <TextInput
          placeholder="Answer"

          onChangeText={(answer) => this.setState({answer})}
          value={this.state.text}
          style={styles.cardInput}
        />
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.controls}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
          >
          <FontAwesome name="home" size={30}/>
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="save" size={30}/>
            <Text>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlsBtn}
            onPress={() => {
              this.cancelAddCard()
              navigation.goBack()
            }}
          >
          <FontAwesome name="trash-o" size={30}/>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    )//return()
  }//render()
}//class AddCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  cardInput: {
    fontSize: 25,
    height: 60,
  },
})//styles

export default AddCard
