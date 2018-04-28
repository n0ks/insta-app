

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

 

  render() {
    const { foto, likeCallback, comentarioCallback } = this.props;

    return (
      <View>
        {/* HEADER */}
        <View style={styles.header}>
          <Image source={{ uri: foto.urlPerfil}}
            style={styles.fotoDePerfil} />
          <Text style={styles.userText}>{foto.loginUsuario.replace(/\b\w/g, letra => letra.toUpperCase())}</Text>
        </View>
        {/* HEADER */}

        <Image source={{ uri: foto.urlFoto }}
          style={styles.foto} />

        {/* RODAPE */}
        <Likes likeCallback={likeCallback} foto={foto} />
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
            comentarioCallback={comentarioCallback}
            idFoto={foto.id}
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

