
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';


export default class Likes extends Component {

  carregaIcone = (likeada) => {
    return likeada
      ? require('../../resources/img/s2-checked.png')
      : require('../../resources/img/s2.png')
      
  }

  exibeLikes = (likers) => {
    if (likers.length == 0)
      return

    return <Text style={styles.curtidas}>{likers.length} {likers.lenght > 1 ? ' curtidas ' : ' curtida'}</Text>
  }



  render() {
    const { foto, likeCallback } = this.props
    let fotoLikeada = this.carregaIcone(foto.likeada)
    return (
      <View style={styles.rodape}>
        <TouchableOpacity onPress={() => {likeCallback(foto.id)}}>
          <Image style={styles.botaoDeLike}
            source={fotoLikeada}
          />
        </TouchableOpacity>
        { this.exibeLikes(foto.likers)}
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  rodape: {
    margin: 10,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  botaoDeLike: {
    height: 32,
    width: 32
  },
  curtidas:{
    marginLeft:10
  }

})