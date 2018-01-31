import React, { Component } from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from 'react-native'
import {
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons"
import * as API from '../utils/api'
import { setTestData } from '../utils/helpers'

class FlashCard extends Component{

  state = {
    front_editable: false,
    back_editable: false,
    card: {}
  }

  componentWillMount(){
    API.getAllDecks().then((data) => {
      this.setState({
        card: JSON.parse(data).JavaScript
      })
    })
  }//componentWillMount()

  setFrontEditable(){
    this.setState({
      front_editable: true,
    })
  }

  setFrontNotEditable(){
    this.setState({
      front_editable: false,
    })
  }

  saveChanges(){
    //Save changes into the card

    //setState front_editable: false
    this.setFrontNotEditable()
  }

  render(){
    setTestData()
    const { front_editable, back_editable, card } = this.state
    console.log("L55 FlashCard this.state = ", this.state)

    // let question = [
    //   {
    //   answer: "The combination of a function and the lexical environment within which that function was declared.",
    //   question: "What is a closure?",
    //   },
    // ]
    // console.log("L66 FlashCard: ", question[0].question)
    //works OK

    card ? console.log("L66 FlashCard card.questions: ", card.questions) : null
    // API.getAllDecks().then(data => console.log("L45 getAllDecks from FlashCard ", JSON.parse(data)))

    return(
      <View style={styles.container}>
        <View style={styles.deck_title}>
          <Text style={{fontSize: 27}}>Title: {card && card.title}</Text>
          <TouchableOpacity
            style={styles.edit_icon}
            onPress={() => this.setFrontEditable()}
          >
            <FontAwesome name="pencil-square-o" size={30}/>
          </TouchableOpacity>
        </View>
        <View style={styles.question}>
          <Text>Question: </Text>
          <TextInput
            style={styles.text_input}
            editable={front_editable}
          >
            {card.questions && card.questions[0].question}
          </TextInput>
          {this.state.front_editable &&
            <TouchableOpacity
              onPress={() => this.saveChanges()}
            >
              <FontAwesome name="save" size={30}/>
            </TouchableOpacity>
          }
          <Text>{"\n"}</Text>
          <Text>Do you concure?</Text>
          <Text>{"\n"}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.button_text}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.button_text}>Incorrect</Text>
          </TouchableOpacity>
        </View>
        <Text>{"\n"}</Text>
        <View style={styles.cardNavigation}>
          <TouchableOpacity>
            <MaterialIcons name="arrow-back" size={35}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontSize: 25}}>Hint</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontSize: 25}}>Answer</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="arrow-forward" size={35}/>
          </TouchableOpacity>
        </View>

      </View>
    )//return()
  }//render()
}//class FlashCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  deck_title: {
    flexDirection: "row",
    borderBottomWidth: 2,
    justifyContent: "space-between",
    // textAlign: "left",
  },
  edit_icon: {
    alignSelf: "center",
  },
  text_input: {
    //get rid of bottom border
    //set min height
    height: 200,
    maxHeight: 200,
    borderBottomWidth: 0,
    fontSize: 24,
  },
  button: {
    backgroundColor: "#A3A3A3",
    // width: 80,
    height: "auto",
    borderRadius: 3,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  button_text: {
    fontSize: 25,
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  cardNavigation: {
    //align inline
    flexDirection: "row",
    justifyContent: "space-around",
  }
})

export default FlashCard
