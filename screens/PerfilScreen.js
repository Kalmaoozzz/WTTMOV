import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PerfilScreen = () => {
    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: 'https://example.com/user-avatar.png' }} 
                style={styles.avatar} 
            />
            <Text style={styles.name}>Nombre del Usuario</Text>
            <Text style={styles.email}>usuario@example.com</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Detalles del Usuario</Text>
                <Text style={styles.detailsText}>Dirección: Calle Falsa 123</Text>
                <Text style={styles.detailsText}>Teléfono: +1 234 567 890</Text>
                {/* Agrega más detalles según sea necesario */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 20,
    },
    detailsContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    detailsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailsText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default PerfilScreen;
