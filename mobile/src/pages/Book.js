import React, { useState } from 'react';
import { Alert, AsyncStorage, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import api from '../services/api';

const styles = StyleSheet.create({
    container: {
        margin: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginTop: 20,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: '#F05A5B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    buttonCancel: {
        height: 42,
        backgroundColor: '#CCC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default function Book({ navigation }) {
    const [date, setDate] = useState('');
    const spot_id = navigation.getParam('id');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`/spots/${spot_id}/bookings`, { date }, { headers: { user_id }});
        Alert.alert('Solicitação de reserva enviada.');
        navigation.navigate('List');
    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput style={styles.input} placeholder="Insira a data de reserva" placeholderTextColor="#999"
                autoCapitalize="words" autoCorrect={false}
                value={date} onChangeText={text => setDate(text)} />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}