/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Text,
  AsyncStorage
} from 'react-native';
import Post from './Post';

global.endpoint = 'https://instalura-api.herokuapp.com/api/public/fotos/rafael';

export default class Feed extends Component {
  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('usuario')
      .then(usuarioEmTexto => JSON.parse(usuarioEmTexto))
      .then(usuario => {
        const request = {
          headers: new Headers({
            'X-AUTH-TOKEN': usuario.token
          })
        }
        return request
      })
      .then(req => fetch(global.endpoint,req))
      .then(res => res.json())
      .then(fotos => this.setState({ fotos }))
/*       
    fetch(global.endpoint)
      .then(res => res.json())
      .then(data => this.setState({ fotos: data })) */
  }

  findPhotos = (idFoto, fotos = this.state.fotos) => {

    return fotos.find(foto => foto.id == idFoto)
  }

  updatePhoto = (fotoAtualizada, stateFoto = this.state.fotos) => {

    return stateFoto
      .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)
  }

  adicionaComentario = (idFoto, valorComentario) => {
    if (!valorComentario) return;


    const foto = this.findPhotos(idFoto)

    const novaLista = [
      ...foto.comentarios, {

        id: Math.random() * 20 | 0,
        login: 'meusuario',
        texto: valorComentario
      }
    ]
    /*   console.warn(...novaLista); */

    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
    }
    const fotos = this.updatePhoto(fotoAtualizada)

    this.setState({ fotos })
  }

  like = (idFoto) => {
    const foto = this.findPhotos(idFoto)

    let novaLista = [];

    if (!foto.likeada) {
      novaLista = [
        ...foto.likers,
        { login: 'meusuario' }
      ]
    } else {
      novaLista = foto.likers
        .filter(liker => liker.login != 'meusuario')
    }

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista

    }
    const fotos = this.updatePhoto(fotoAtualizada)

    this.setState({ fotos });
  }

  /*   fetchImages = async () => {
      const res = await fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael').catch(err => console.warn(err))
      const data = await res.json()
      this.setState({ fotos: data })
    } */

  render() {

    return (
      <FlatList
        keyExtractor={item => item.id}
        data={this.state.fotos}
        renderItem={({ item }) =>
          <Post foto={item}
            likeCallback={this.like}
            comentarioCallback={this.adicionaComentario} />
        }
      />

    );
  }
}

