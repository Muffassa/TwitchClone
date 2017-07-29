import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import GamePreview  from './components/GamePreview';
import { getAllGames } from './helpers/api';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }
  componentDidMount() {
    getAllGames()
      .then(
        res => this.setState({games: res.top}),
        err => console.log(err)
      );
  }

  openGameStreams(gameName) {
    alert(gameName)
  }

  render() {
    if(this.state.games.length === 0) {
      return <Text>Loading</Text>
    } else {
      const gamesList = this.state.games.map( (gameInfo, i) => {
        return (<GamePreview
          key={i}
          name={gameInfo.game.name}
          imageUri={gameInfo.game.box.medium}
          viewers={gameInfo.viewers}
          onPress={() => this.openGameStreams(gameInfo.game.name)}
          />)
      });

      return (
        <View style={styles.container}>
          <ScrollView style={styles.gamesList}>{ gamesList }</ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  gamesList: {
    alignSelf: 'stretch'
  }
});
