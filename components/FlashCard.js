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
import * as _ from 'underscore'
import {getAllDecksAction, getCardAction} from '../actions'

/**
TODO:
Make card editable,
Save changes
Allign buttons horizontally to the right. for edit mode.
*/

class FlashCard extends Component{

  state = {
    disabledNextCardBtn: false,
    disabledPrevCardBtn: false,
    front_editable: false,
    back_editable: false,
    card: {},
    deckLength: 0,
    cardIndex: 0,
  }

  componentWillMount(){
    const { getDeckReducer, getCardReducer } = this.props
    let deck = getDeckReducer.deck.questions.forEach((card, index) => {
        if(!_.isEmpty(card) && card.cardId === getCardReducer.cardId){
          this.setState({
            card: card,
            deckLength: getDeckReducer.deck.questions.length,
            cardIndex: index
          })
        }
    })//.forEach()
  }//componentWillMount()

  getNextCard(){
    const { cardIndex, deckLength } = this.state
    const { getDeckReducer, dispatch } = this.props

    if(cardIndex < deckLength - 1){
      let nextCard = getDeckReducer.deck.questions[cardIndex + 1]
      console.log("L79 getNextCard nextCardId = ", nextCard)
      dispatch(getCardAction(getDeckReducer.deck.deckId, nextCard))
      this.setState((prevState) => {
        return {
          card: nextCard,
          cardIndex: prevState.cardIndex + 1,
          disabledPrevCardBtn: false,
        }
      })
    }else{
      this.setState({
        disabledNextCardBtn: true,//locked
      })
    }
  }//getNextCard()

  getPreviousCard(){
    //For arrow-back
    const { cardIndex, deckLength } = this.state
    const { getDeckReducer, dispatch } = this.props

    if(cardIndex > 0){
      let nextCard = getDeckReducer.deck.questions[cardIndex - 1]
      console.log("L117 getNextCard nextCardId = ", nextCard)
      dispatch(getCardAction(getDeckReducer.deck.deckId, nextCard))
      this.setState((prevState) => {
        return {
          card: nextCard,
          cardIndex: prevState.cardIndex - 1,
          disabledNextCardBtn: false,
        }
      })
    }else{
      this.setState({
        disabledPrevCardBtn: true,//locked
      })
    }
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
    const { getCardReducer, getDeckReducer } = this.props
    // console.log("L112 FlashCard this.props = ", this.props)
    // console.log("L113 FlashCard this.state = ", this.state)

    return(
      <View style={styles.container}>
        <View style={styles.deck_title}>
          <Text style={{fontSize: 27}}>Title: {getDeckReducer.deck && getDeckReducer.deck.title}</Text>
          <TouchableOpacity
            style={styles.edit_icon}
            onPress={() => this.setFrontEditable()}
          >
            <FontAwesome name="pencil-square-o" size={30}/>
          </TouchableOpacity>
        </View>
        <View style={styles.question}>
          <Text
            style={{fontSize: 20}}
          >
            Question:
          </Text>
          <TextInput
            style={styles.textInput}
            editable={front_editable}
            value={card.question}
          />
          {this.state.front_editable &&
            <View>
              <TouchableOpacity
                onPress={() => this.saveChanges()}
              >
                <FontAwesome name="save" size={30}/>
                <Text>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.saveChanges()}
              >
                <FontAwesome name="close" size={30}/>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          }
          <Text>{"\n"}</Text>
          <Text style={{fontSize: 20}}>Do you concure?</Text>
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
        <View style={styles.cardNavigation}>
          <TouchableOpacity
            onPress={() => this.getPreviousCard()}
            disabled={this.state.disabledPrevCardBtn}
          >
            <MaterialIcons name="arrow-back" size={30}/>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={true}
          >
            <Text style={{fontSize: 18}}>
              Card {this.state.cardIndex + 1}/{this.state.deckLength}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.getNextCard()}
            disabled={this.state.disabledNextCardBtn}
          >
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
  textInput: {
    marginTop: 30,
    fontSize: 25,
    height: 60
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
  const {getCardReducer, getDeckReducer} = state
  return {
    getDeckReducer: getDeckReducer,
    getCardReducer: getCardReducer,
  }
}

export default connect(mapStateToProps)(FlashCard)
