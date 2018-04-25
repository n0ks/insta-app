import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    Dimensions,
    Button,
    TouchableOpacity,
    AsyncStorage,
    Text
} from 'react-native';

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            usuario: '',
            senha: '',
            validacao: ''
        }
    }
    efetuaLogin = () => {
        //if (!this.state.usuario || !this.state.senha) return;

        const request = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha
            }),
            headers: new Headers({
                "Content-type": "application/json"
            })
        }
        const uri = 'http://192.168.0.137:8080/api/public/login'

        fetch(uri, request)
            .then(res => {
                if (!res.ok) throw new Error("Não foi possível efetuar login");

                return res.text()
            })
            .then(data => {

                const usuario = {
                    nome: this.state.usuario,
                    token: data
                }

                AsyncStorage.setItem('USUARIO', JSON.stringify(usuario))

                AsyncStorage.getItem('USUARIO')
                    .then(usuario => JSON.parse(usuario))
                    .then(usuario => console.warn(usuario.nome))
            })
            .catch(err => {
                this.setState({ validacao: err.message })
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput style={styles.input} defaultValue="rafael" autoCapitalize="none" placeholder="Usuário" underlineColorAndroid="transparent" onChangeText={texto => this.setState({ usuario: texto })} />
                    <TextInput style={styles.input} secureTextEntry={true} autoCapitalize="none" placeholder="Senha" underlineColorAndroid="transparent" onChangeText={texto => this.setState({ senha: texto })} />
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
