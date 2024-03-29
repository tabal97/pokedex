import React, { Component } from 'react';
import SearchScreen from "./components/SearchScreen";
import PokemonCard from "./components/PokemonCard";
import HomeScreen from "./components/HomeScreen";
import TypesScreen from "./components/TypesScreen";
import PokemonList from "./components/PokemonList";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const RootStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  TypesScreen: {
    screen: TypesScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "red"
      },
      title: "Pokémon Types"
    }
  },
  PokemonList,
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      header: null
    }
  },
  PokemonCard: {
    screen: PokemonCard,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "skyblue"
      },
      title: "Pokemon Info"
    }
  }
});
const AppContainer = createAppContainer(RootStack);

class App extends Component {
  render() {
    return <AppContainer />;
  }
}


export default App