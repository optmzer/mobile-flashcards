# Mobile FlashCards Warehouse

Udacity study project for React nano-degree.
An Android application to create simple text flash cards. The app has
primitive quiz functionality to study flashcards.
Created with react-native and implements Redux for state management.

## Required

[Expo app](https://expo.io) or something similar.
Download the Expo app on your Android device and connect it to the same
network as your PC/Computer.

##  Start Developing

In terminal window
clone or fork the repo
navigate into the folder containing this project
install dependencies with
- `npm install`
start the app with
- `npm start`. the app starts on a single command.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```
## Folder Structure

After cloning the app should looks like this:

```
mobile-flashcards/
  node_modules/ - dependencies
  action/
    index.js
    card_actions.js
    deck_actions.js
    quiz_actions.js
    types.js - Action types.
  components/
    AddCard.js - Adds FlashCard to the list of Decks FlashCards
    AddDeck.js - Adds Deck to the list of Decks
    Deck.js - Displays list of FlashCards in the Deck
    FlashCard.js - Displays questions and answers
    Home.js - Default view of the app
    Quiz.js - Quiz logic
  icons/
    icons8-questions-50.png - App icon
    icons8-questions-1024.png
  reducers/
    card_reducers.js
    deck_reducers.js
    index.js
    quiz_reducers.js
  utils/
    helpers.js - helper functions
  App.js
  App.test.js
  package.json
  README.md

```

## Built With

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).


## Contributing

This is a study project so contributing is not required. Please consider other projects. Thank you for your interest.

## Versioning

For the versions available, see the tags on this repository.

## Authors

    Alexander Frolov - The Mobile FlashCards Warehouse android application
