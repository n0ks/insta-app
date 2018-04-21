/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
// import Post from './src/components/Post';
import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Text
} from 'react-native';
import Post from './src/components/Post';

global.endpoint = 'https://instalura-api.herokuapp.com/api/public/fotos/rafael';

export default class InstaluraMobile extends Component {
  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }
  componentDidMount() {this.fetchImages()}

  fetchImages = async () => {
    const res = await fetch(global.endpoint).catch(err => console.warn(err))
    const data = await res.json()
    this.setState({ fotos: data })
  }

  render() {

    return (
      <FlatList
        keyExtractor={item => item.id}
        data={this.state.fotos}
        renderItem={({ item }) =>
          <Post foto={item} />

        }
      />

    );
  }
}

AppRegistry.registerComponent('InstaluraMobile', () => InstaluraMobile);