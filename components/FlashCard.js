import React, { Component } from 'react'
import {connect} from 'react-redux'
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
// import { setTestData } from '../utils/helpers'
import {getAllDecksAction, getCardAction} from '../actions'

//TODO: make cardId so FlashCard can get card from the store.
//I can use Date.now() for this simple program as I can only make 1 card at a time.

class FlashCard extends Component{

  state = {
    front_editable: false,
    back_editable: false,
    card: {}
  }

  componentWillMount(){
    const { navigation } = this.props
    this.setState({
      card: navigation.state.params.card
    })
  }//componentWillMount()


  getNextCard(){
    //TODO: returns next card in the Deck
    //For arrow-forward
  }

  getPreviousCard(){
    //TODO: returns previos card in the Deck
    //For arrow-back
  }

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

  saveChanges(card){
    //Save changes into the card

    //setState front_editable: false
    this.setFrontNotEditable()
  }

  render(){
    // setTestData()
    const { front_editable, back_editable, card } = this.state
    console.log("L53 FlashCard this.props = ", this.props)
    console.log("L54 FlashCard this.state = ", this.state)

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
        <View style={styles.answer_buttons}>
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
            <MaterialIcons name="arrow-back" size={30}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontSize: 25}}>Hint</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="arrow-forward" size={30}/>
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
    justifyContent: "space-between",
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
    // maxHeight: 200,
    borderBottomWidth: 0,
    fontSize: 24,
  },
  answer_buttons:{
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#A3A3A3",
    width: 160,
    height: 60,
    borderRadius: 3,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    justifyContent: "center",
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
    paddingBottom: 20,
  }
})

function mapStateToProps(state){
  const {getCardReducer} = state
  return {
    getCardReducer,
  }
}

// function mapDispatchToProps(dispatch){
//   return {
//     getAllDecks: () => dispatch(getAllDecks()),
//   }
// }

export default connect(mapStateToProps)(FlashCard)
