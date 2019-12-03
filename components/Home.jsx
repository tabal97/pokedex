import React, { Component } from 'react';
import { StyleSheet, ImageBackground, View, Image, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from "react-native";
import axios from "axios";
import { withNavigation } from "react-navigation"


class Home extends Component {
    state = { pokemon: "", error: false, fakePokemon: "" }
    render() {
        const { pokemon, error, fakePokemon } = this.state
        return (
            <ImageBackground source={require("../assets/pokemon-bg.jpg")} style={styles.container}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <Image source={require("../assets/pokedex-header.png")} style={styles.header} />
                    <TextInput placeholder="Enter Pokemon"
                        style={styles.inputBox}
                        onChangeText={this.handlePokemonChange}
                        value={pokemon}
                        autoCorrect={false} />
                    {error && <Text style={styles.errorMsg}>Are you sure {fakePokemon} is a real pokemon?</Text>}
                    <TouchableOpacity onPress={this.handleSearch} disabled={!pokemon}><Text style={styles.button}>Search</Text></TouchableOpacity>
                </KeyboardAvoidingView></ImageBackground>);
    }

    handlePokemonChange = e => {
        this.setState({ pokemon: e })
    }
    handleSearch = e => {
        const { pokemon } = this.state;
        const formattedPokemon = pokemon.toLowerCase()
        axios.get(`https://pokeapi.co/api/v2/pokemon/${formattedPokemon}`).then(({ data }) => { this.handleSuccess(data) }).catch(this.handleError(pokemon))
    }
    handleError = pokemon => {
        this.setState({ error: true, fakePokemon: pokemon })
    }
    handleSuccess = data => {
        this.setState({ error: false });
        const { pokemon } = this.state;
        const { id, height, weight } = data;
        const abilities = data.abilities.map(({ ability }) => {
            return ability.name
        });
        const moves = data.moves.map(({ move }) => {
            return move.name
        })
        const sprite_url = data.sprites.front_default;
        // console.log(data.stats, "unformatted")
        const stats = data.stats.reduce((total, currObj) => {
            total[currObj.stat.name] = currObj.base_stat;
            return total
        }, {})
        // console.log(stats, "stats")
        const types = data.types.map(({ type }) => {
            return type.name;
        })
        const { speed, attack, defense, hp } = stats;
        const specAtk = stats[`special-attack`];
        const specDef = stats[`special-defense`];
        // console.log("id", id, "name", pokemon, "height", height, "weight", weight, "spec-abilities", abilities, "moves", moves, "sprite", sprite_url, "stats", stats, "types", types)
        this.props.navigation.navigate("PokemonRoom", { id, pokemon, height, weight, abilities, moves, sprite_url, speed, attack, defense, hp, specAtk, specDef, types })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between"
    },
    header: {
        width: 350,
        height: 350,
        resizeMode: 'contain'
    },
    errorMsg: {
        color: "red",
    },
    inputBox: {
        height: 50,
        width: 200,
        padding: 3,
        margin: 3,
        borderRadius: 20,
        marginBottom: 100,
        backgroundColor: "whitesmoke"
    },
    button: {
        fontSize: 30,
        backgroundColor: "whitesmoke",
        opacity: 0.8,
        marginBottom: 150,
        borderRadius: 10,
        overflow: "hidden",
        padding: 10
    }
});

export default withNavigation(Home);