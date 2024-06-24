import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'; // Importar el icono Feather de la biblioteca de iconos

const SettingScreen = () => {
    const navigation = useNavigation();
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        if (!nombres || !apellidos || !usuario || !email || !password) {
            console.log("Por favor, complete todos los campos.");
            return false;
        }
        if (password.length < 6) {
            console.log("La contraseña debe tener al menos 6 caracteres.");
            return false;
        }
        // Agrega más validaciones según tus requisitos
        return true;
    };

    const handleRegister = () => {
        if (validateForm()) {
            console.log("Registrando...");
            console.log("Nombres:", nombres);
            console.log("Apellidos:", apellidos);
            console.log("Usuario:", usuario);
            console.log("Correo electrónico:", email);
            console.log("Contraseña:", password);
            // Aquí puedes realizar la lógica de registro con los datos ingresados
            // Puedes realizar validaciones y enviar los datos al servidor, por ejemplo
            navigation.navigate("Home"); // Navegación a la pantalla "Home" al registrar
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            
            <View style={styles.inputContainer}>
                <Feather name="user" size={24} color="black" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nombres"
                    value={nombres}
                    onChangeText={setNombres}
                />
            </View>
            <View style={styles.inputContainer}>
                <Feather name="user" size={24} color="black" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Apellidos"
                    value={apellidos}
                    onChangeText={setApellidos}
                />
            </View>
            <View style={styles.inputContainer}>
                <Feather name="user" size={24} color="black" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    value={usuario}
                    onChangeText={setUsuario}
                />
            </View>
            <View style={styles.inputContainer}>
                <Feather name="mail" size={24} color="black" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
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
                onPress={handleRegister}
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
                >Registrarse</Text>
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

export default SettingScreen;
