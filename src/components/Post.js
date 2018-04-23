

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

const screen = Dimensions.get('screen');

export default class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foto: this.props.foto,
      valorComentario: ''

    }
  }

  carregaIcone = (likeada) => {

    return likeada
      ? require('../../resources/img/s2-checked.png')
      : require('../../resources/img/s2.png')
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

  exibeLikes = (likers) => {
    if (likers.length == 0)
      return

    return <Text style={styles.curtidas}>{likers.length}{likers.lenght >= 1 ? 'curtidas ' : ' curtida'}</Text>


  }

  exibeLegendas = (foto) => {
    if (foto.comentario == '')
      return;

    return (

      <Text style={styles.comentario}>
        <Text style={styles.comentarioUser}>{foto.login}</Text>
        <Text>{foto.comentario}</Text>

      </Text>
    )
  }

  adicionaComentario = () => {
    if (!this.state.valorComentario) return;
    const novaLista = [
      ...this.state.foto.comentarios, {
        
        id: Math.random() * 20 | 0,
        login: 'meusuario',
        texto: this.state.valorComentario
      }
    ]
    console.warn(...novaLista);

    const fotoAtualizada = {
      ...this.state.foto,
      comentarios: novaLista
    }
      
    this.setState({ foto: fotoAtualizada, valorComentario: '' })
    this.inputComentario.clear()
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
        <View style={styles.rodape}>
          <TouchableOpacity onPress={this.like}>
            <Image style={styles.botaoDeLike}
              source={this.carregaIcone(foto.likeada)}
            />
          </TouchableOpacity>
          {this.exibeLikes(foto.likers)}
        </View>
        {this.exibeLegendas(foto)}
        {/* RODAPE */}

        <View style={styles.comentariosWrapper}>
          {foto.comentarios.map(comentario =>
            <Text key={comentario.id}>
              <Text style={styles.userComentario}>{comentario.login}:  </Text>
              <Text style={styles.userComentarioTexto}>{comentario.texto}</Text>
            </Text>
          )

          }
          <View style={styles.comentarioWrapper}>
            <TextInput style={styles.input} placeholder="Digite um comentário..."
              underlineColorAndroid="transparent"
              ref={input => this.inputComentario = input}
              onChangeText={text => this.setState({ valorComentario: text })} />


            <TouchableOpacity onPress={this.adicionaComentario}>
              <Image style={styles.botaoComentario} source={require('../../resources/img/send.png')} />
            </TouchableOpacity>

          </View>
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
  rodape: {
    margin: 10,
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#e44458',
    flexDirection: 'row',
    alignItems: 'center'
  },
  curtidas: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#000'
  },
  botaoDeLike: {
    height: 32,
    width: 32
  },

  userComentario: {
    fontWeight: 'bold',
    marginLeft: 10,
    paddingLeft: 10
  },
  userComentarioTexto: {
    margin: 10
  },
  comentariosWrapper: {
    padding: 10
  },
  input: {
    height: 40,
    flex: 1
  },
  botaoComentario: {
    height: 32,

    width: 32,

  },
  comentarioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',


  }
});

