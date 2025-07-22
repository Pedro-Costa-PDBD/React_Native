import React, {Component} from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            numero: 0,
            botao: 'Iniciar',
            ultimo: null
        };
        this.tempo = null
        this.inicio = this.inicio.bind(this);
        this.limpar = this.limpar.bind(this);
    }
    
    inicio(){
        if (this.tempo != null){
            clearInterval(this.tempo);
            this.tempo = null;
            this.setState({botao:'Iniciar'});
        }
        else {
            this.tempo = setInterval(() => {
                this.setState({numero: this.state.numero + 0.1})
            }, 100);
        }
        this.setState({botao:'Parar'});
    }
    limpar(){
        if(this.tempo != null){
            clearInterval(this.tempo);
            this.tempo = null;
        }
        this.setState({
            tempo1: this.state.numero,
            numero: 0,
            botao: 'Iniciar',
        })
    }

    render (){
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Cronômetro</Text>
                <Image source={require('./src/cronometro.png')} style={styles.crono}/>
                <Text style={styles.tempo}>{this.state.numero.toFixed(1)}</Text>

                <View style={styles.areabotao}>
                   
                   <TouchableOpacity style={styles.btn} onPress={this.inicio}>
                        <Text style={styles.botaotexto}>{this.state.botao}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={this.limpar}>
                        <Text style={styles.botaotexto}>Limpar</Text>
                    </TouchableOpacity> 

                </View>

                <View>

                    <Text style={styles.textotempo}>
                        {this.state.tempo1 != null && this.state.tempo1 > 0 ? 'Último tempo:'
                        + this.state.tempo1.toFixed(3): ''}
                    </Text>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'orange',
        justifyContent: 'center',
    },
    crono:{
        width: 400,
        height: 250,
    },
    titulo:{
        fontSize: 50,
        fontWeight: '600',
    },
    tempo:{
        marginTop: -160,
        fontSize: 60,
        fontWeight: '700',
    },
    botaotexto:{
        fontSize: 24,
        fontWeight:'500',
    },
    btn:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
        backgroundColor: 'white',
        borderRadius: 11,
    },
    areabotao:{
        flexDirection: 'row',
        marginTop: 100,
    },
    textotempo:{
        fontSize: 30,
    },
})

export default App;