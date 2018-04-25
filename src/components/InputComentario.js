

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';


export default class InputComentario extends Component {
    constructor() {
        super()
        this.state = {
            valorComentario: ''
        }
    }

    render() {
        const { comentarioCallback,idFoto } = this.props

        return (
            <View style={styles.comentarioWrapper}>
                <TextInput style={styles.input} placeholder="Digite um comentário..."
                    underlineColorAndroid="transparent"
                    ref={input => this.inputComentario = input}
                    onChangeText={text => this.setState({ valorComentario: text })} />


                <TouchableOpacity
                    onPress={() => {
                        comentarioCallback(idFoto,this.state.valorComentario)
                        this.inputComentario.clear()
                        this.setState({valorComentario: ''})
                    }}>
                    <Image style={styles.botaoComentario} source={require('../../resources/img/send.png')} />
                </TouchableOpacity>

            </View>
        );
    }


}

const styles = new StyleSheet.create({
    input: {
        height: 40,
        flex: 1

    },
    botaoComentario: {
        height: 28,
        opacity: 0.5,
        width: 28
    },
    comentarioWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',

    }

})