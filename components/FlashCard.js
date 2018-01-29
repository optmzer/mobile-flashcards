import React, { Component } from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons"

class FlashCard extends Component{

  state = {
    front_editable: false,
    back_editable: false,
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

  saveChanges(){
    //Save changes into the file

    //setState front_editable: false
    this.setFrontNotEditable()
  }

  render(){

    const {front_editable, back_editable} = this.state
console.log("L33 FlashCard this.state = ", this.state);
    return(
      <View style={styles.container}>
        <View style={styles.deck_title}>
          <Text style={{fontSize: 27}}>Deck Title</Text>
          <TouchableOpacity
            onPress={() => this.setFrontEditable()}
          >
            <FontAwesome name="pencil-square-o" size={30}/>
          </TouchableOpacity>
        </View>
        <View style={styles.question}>
          <TextInput
            style={styles.text_input}
            editable={front_editable}
          >
            Question Content
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
            <Text style={styles.button_text}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.button_text}>No</Text>
          </TouchableOpacity>
        </View>
        <Text>{"\n"}</Text>
        <View style={styles.cardNavigation}>
          <TouchableOpacity>
            <MaterialIcons name="arrow-back" size={35}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Hint</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Answer</Text>
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
    borderBottomWidth: 2,
    // textAlign: "left",
  },
  text_input: {
    //get rid of bottom border
    //set min height
    height: 200,
    maxHeight: 200,
    borderBottomWidth: 0
  },
  button: {
    backgroundColor: "#A3A3A3",
    width: 80,
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
  },
  cardNavigation: {
    //align inline
  }
})

export default FlashCard
