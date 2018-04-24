

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';
import InputComentario from './InputComentario';
import Likes from './Likes';
const screen = Dimensions.get('screen');

export default class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foto: this.props.foto

    }
  }


  like = () => {

    let novaLista = [];

    if (!this.state.foto.likeada) {
      novaLista = [
        ...this.state.foto.likers,
        { login: 'meusuario' }
      ]
    } else {
      novaLista = this.state.foto.likers
        .filter(liker => liker.login != 'meusuario')
    }

    const fotoAtualizada = {
      ...this.state.foto,
      likeada: !this.state.foto.likeada,
      likers: novaLista

    }
    this.setState({ foto: fotoAtualizada });
  }



  exibeLegendas = (foto) => {
    if (foto.comentario == '')
      return;

    return (

      <Text style={styles.comentariosWrapper}>
        <Text style={styles.comentarioUser}>{foto.login}</Text>
        <Text>{foto.loginUsuario}: {foto.comentario}</Text>

      </Text>
    )
  }

  adicionaComentario = (valorComentario) => {
    if (!valorComentario) return;

    const novaLista = [
      ...this.state.foto.comentarios, {

        id: Math.random() * 20 | 0,
        login: 'meusuario',
        texto: valorComentario
      }
    ]
    /*   console.warn(...novaLista); */

    const fotoAtualizada = {
      ...this.state.foto,
      comentarios: novaLista
    }

    this.setState({ foto: fotoAtualizada })
  }

  render() {
    const { foto } = this.state;

    return (
      <View>
        {/* HEADER */}
        <View style={styles.header}>
          <Image source={{ uri: 'https://www.abeautifulsite.net/uploads/2014/08/bit-face.png?width=600&key=c6d70b7b067981cded2d49fc8a5e3ca1dc9dc9fdaab2ac05db4cb96481a36a77' }}
            style={styles.fotoDePerfil} />
          <Text style={styles.userText}>{foto.loginUsuario.replace(/\b\w/g, letra => letra.toUpperCase())}</Text>
        </View>
        {/* HEADER */}

        <Image source={{ uri: foto.urlFoto }}
          style={styles.foto} />

        {/* RODAPE */}
        <Likes likeCallback={this.like} foto={foto} />
        {this.exibeLegendas(foto)}
        {/* RODAPE */}

        <View style={styles.comentariosWrapper}>
          {foto.comentarios.map(comentario =>
            <Text key={comentario.id}>
              <Text style={styles.userComentario}>{comentario.login}:  </Text>
              <Text style={styles.userComentarioTexto}>{comentario.texto}</Text>
            </Text>
          )}

          <InputComentario
            comentarioCallback={this.adicionaComentario}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,

  },
  fotoDePerfil: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 50,


  },
  userText: {
    color: '#262626',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#e44458',
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold'

  },
  foto: {
    width: screen.width,
    height: screen.width
  },

  curtidas: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#000'
  },

  userComentario: {
    fontWeight: 'bold',

  },
  userComentarioTexto: {
    margin: 10
  },
  comentariosWrapper: {
    padding: 10
  }

});

