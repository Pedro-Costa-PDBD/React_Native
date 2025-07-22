import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity} from 'react-native';
import { db } from "./src/FirebaseConnection";
import { collection, addDoc, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';

export default function App(){
    const [usuario, setUsuario] = useState({
        nome: 'Carregando...',
        email: 'Carregando...',
        telefone: 'Carregando...',
    });

    const [novoNome, setNovoNome] = useState('');
    const [novoEmail, setNovoEmail] = useState('');
    const [novoTelefone, setNovoTelefone] = useState('');

    useEffect(() =>{
        const q = query(collection(db, 'usuario'), orderBy('nome', 'desc'), limit(1));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (!querySnapshot.empty){
                setUsuario(querySnapshot.docs[0].data());
            }
            else{
                console.log('Nenhum usuário encontrado!');
            }
        });
        return ()=> unsubscribe();
    },[]);
    // Adicionar Usuário
    async function handleRegister() {
        if(novoNome === '' || novoEmail === '' || novoTelefone === ''){
            alert('Preencha todos os campos!');
            return;
        }
        try{
            await addDoc(collection(db, 'usuario'),{
                nome: novoNome,
                email: novoEmail,
                telefone: novoTelefone,
            });
            console.log('Usuário cadastrado com sucesso!');

            setNovoNome('');
            setNovoEmail('');
            setNovoTelefone('');
        }
        catch(error){
            console.error('Error ao registrar o usuário:' +error);
        }
    }

    return(
        <View style={styles.container}>
            <Text style={{fontSize:24}}>Ultimo Cadastro:</Text>

            <Text style={{fontSize:24}}>Nome: {usuario.nome}</Text>
            <Text style={{fontSize:24}}>Email: {usuario.email}</Text>
            <Text style={{fontSize:24}}>Telefone: {usuario.telefone}</Text>
            
            {/*Input Nome */}
            <TextInput
            style={styles.input}
            placeholder='Nome'
            value={novoNome}
            onChangeText={setNovoNome} />
            {/*Input Email */}
            <TextInput
            style={styles.input}
            placeholder='Email'
            value={novoEmail}
            onChangeText={setNovoEmail}
            keyboardType='email-address' />
            {/*Input Telefone */}
            <TextInput
            style={styles.input}
            placeholder='Telefone'
            value={novoTelefone}
            onChangeText={setNovoTelefone}
            keyboardType='numeric' />

            {/*Botão Adicionar */}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input:{
        marginTop: 10,
        width: '80%',
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    button:{
        padding: 8,
        backgroundColor: '#000',
        marginTop: 18,
    },
    buttonText:{
        padding: 8,
        color: '#FFF',
    },
});