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
import InstaluraFetchService from '../services/InstaluraFetchService';
import Notificacao from '../api/Notificacao';


export default class Feed extends Component {
  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    
    InstaluraFetchService.get('/fotos')
      .then(json => this.setState({ fotos: json }))
      .catch(err => {
        Notificacao.exibe('ops..', err.message)
      })

  }

  findPhotos = (idFoto, fotos = this.state.fotos) => {

    return fotos.find(foto => foto.id == idFoto)
  }

  updatePhoto = (fotoAtualizada) => {
    const fotos = this.state.fotos
      .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({ fotos })
  }

  adicionaComentario = (idFoto, valorComentario) => {
    if (!valorComentario) return;

    
    const foto = this.findPhotos(idFoto)

    const comentario = {
      texto: valorComentario
    }


    InstaluraFetchService.post(`/fotos/${idFoto}/comment`, comentario)
      .then(comentario => [...foto.comentarios, comentario])
      .then(novaLista => {

        const fotoAtualizada = {
          ...foto,
          comentarios: novaLista
        }

        this.updatePhoto(fotoAtualizada)
      })
      .catch(err => {
        this.setState({fotos:foto})
        Notificacao.exibe('opss', err.message)
      })
  }

  like = (idFoto) => {
    const listaOriginal = this.state.fotos
    const foto = this.findPhotos(idFoto)
   
    const uri = `https://instalura-api.herokuapp.com/api/fotos/${idFoto}/like`

    AsyncStorage.getItem('usuario')
      .then(usuarioLogado => {

        let novaLista = [];

        if (!foto.likeada) {
          novaLista = [
            ...foto.likers,
            { login: usuarioLogado }
          ]
        } else {
          novaLista = foto.likers
            .filter(liker => liker.login != usuarioLogado)
        }
        return novaLista
      })
      .then(novaLista => {

        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista
        };
        this.updatePhoto(fotoAtualizada)
      })

    InstaluraFetchService.post(`/fotos/${idFoto}/like`)
      .catch(err => {
        this.setState({ fotos: listaOriginal })
        Notificacao.exibe('Ops..', err.message)
      })
  }


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

