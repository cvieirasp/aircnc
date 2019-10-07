import React, { useState, useEffect } from 'react';
import { Alert, AsyncStorage, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import socketio from 'socket.io-client';
import SpotList from '../components/SpotList';
import logo from '../assets/logo.png';

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    },
    button: {
        height: 42,
        backgroundColor: '#F05A5B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginHorizontal: 10,
        marginTop: 15,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.5:3333', { query: { user_id } });
            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved?'aprovada':'rejeitada'}.`);
            });
        })
    },[]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const arrayTechs = storagedTechs ? storagedTechs.split(',').map(tech => tech.trim()) : [];
            setTechs(arrayTechs);
        })
    },[]);

    async function handleExit() {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('user');
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={handleExit}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}