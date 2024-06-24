import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'; // Importar el icono Feather de la biblioteca de iconos

const HomeScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        // Validaciones
        if (!username.trim() || !password.trim()) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }

        // Aquí puedes realizar la lógica de inicio de sesión con los datos ingresados
        console.log("Usuario:", username);
        console.log("Contraseña:", password);
        // Navegar a la siguiente pantalla o realizar otras acciones según lo necesites
        navigation.navigate('Stack'); // Redirigir a la página Stack
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicio de Sesión</Text>
            
            <View style={styles.inputContainer}>
                <Feather name="user" size={24} color="black" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>
            <View style={styles.inputContainer}>
                <Feather name="lock" size={24} color="black" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Feather name={showPassword ? "eye-off" : "eye"} size={24} color="blue" style={styles.icon} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handleLogin}
                style={{
                backgroundColor:"red",
                padding:18,
                marginTop:"5%",
                width:"50",
                alignSelf:"center",
                borderRadius:10,
                }}
                >
                <Text
                style={{
                fontSize:15,
                textAlign:"center",
                color:"white",
                }}
                >Iniciar Sesion</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    button: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 15,
        color: "white",
    },
});

export default HomeScreen;
