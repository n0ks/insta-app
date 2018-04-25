import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions,
    Button,
    Image,
    AsyncStorage
} from 'react-native'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            login: '',
            senha: '',
            validacao: ''
        }
    }
    efetuaLogin = () => {
        //if (!this.state.usuario || !this.state.senha) return;

        const url = 'http://192.168.0.137:8080/api/public/login'
        const { login, senha } = this.state
        const body = JSON.stringify({ login, senha })
        const headers = new Headers({ 'Content-Type': 'application/json' })


        fetch(url, { method: 'POST', body, headers })
            .then(res => {
                if (!res.ok)
                    throw new Error("Não foi possível efetuar login")

                return res.text()
            }).then(token => {

                AsyncStorage.setItem('usuario', JSON.stringify({ login: this.state.login, token })
                )

                AsyncStorage.getItem('usuario')
                    .then(usuario => JSON.parse(usuario))
                    .then(usuario => console.warn(usuario.login))
            })
            .catch(error => this.setState({ validacao: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        placeholder="Usuario..."
                        onChangeText={login => this.setState({ login })}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none" />

                    <TextInput style={styles.input}
                        placeholder="Senha..."
                        onChangeText={senha => this.setState({ senha })}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        secureTextEntry={true} />

                    <Button style={styles.btn} title="Login" onPress={this.efetuaLogin} />
                </View>
                {
                    this.state.validacao.length > 0 &&
                    <Text style={styles.error}>{this.state.validacao}</Text>
                }
            </View>
        );
    }

}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    form: {
        width: Dimensions.get('screen').width * 0.8
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10

    },
    error: {
        marginTop: 10,
        color: '#D8000C',
        backgroundColor: '#FFBABA',
        padding: 10,
        borderRadius: 5

    }
})

