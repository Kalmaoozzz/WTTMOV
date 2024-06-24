import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

// Componente de la barra lateral
const DrawerContent = ({ navigation }) => {
    return (
        <View style={styles.drawerContainer}>
             <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Stack')}>
                <Text style={styles.drawerItemText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Admin')}>
                <Text style={styles.drawerItemText}>Usuarios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Equipos')}>
                <Text style={styles.drawerItemText}>Equipos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Tiendas')}>
                <Text style={styles.drawerItemText}>Tiendas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Stack')}>
                <Text style={styles.drawerItemText}>Distribuidor Equipos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Stack')}>
                <Text style={styles.drawerItemText}>Cerrar Sesión</Text>
            </TouchableOpacity>
            
            
        </View>
    );
};

// Footer
const Footer = () => {
    return (
        <View style={styles.footerContainer}>
            <Text style={styles.footerText}>© 2024 Todos los derechos reservados a WTT</Text>
        </View>
    );
};

const StackScreen = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigation = useNavigation();

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const renderHeader = () => {
        return (
            <ImageBackground style={styles.headerImage}>
                <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
                    <MaterialIcons name="menu" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Bienvenido</Text>
                    <Text style={styles.companyName}>WTT</Text>
                    <Text style={styles.descriptionText}>
                        Expertos en el manejo de hardware dedicado para empresas
                    </Text>
                </View>
            </ImageBackground>
        );
    };

    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView contentContainerStyle={{paddingBottom: isDrawerOpen ? 200 : 0}}>
                <View style={styles.servicesContainer}>
                    <Text style={styles.servicesTitle}>Nuestros servicios</Text>
                    <View style={styles.serviceCardContainer}>
                        <ServiceCard
                            icon="cleaning-services"
                            title="Limpiezas"
                            description="Databanes."
                            onPress={() => navigation.navigate("Admin")}
                        />
                        <ServiceCard
                            icon="build"
                            title="Reparación"
                            description="Scanners"
                            onPress={() => navigation.navigate("Reparacion")}
                        />
                        <ServiceCard
                            icon="engineering"
                            title="Mantenimiento"
                            description="Pantallas"
                            onPress={() => navigation.navigate("Mantenimiento")}
                        />
                    </View>
                </View>

                <View style={styles.testimoniosContainer}>
                    <Text style={styles.testimoniosTitle}>Testimonios</Text>
                    <Text style={styles.testimoniosText}>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique volutpat orci eget fermentum. Nullam porta scelerisque enim, nec dictum est varius ac. Phasellus suscipit eros sed ligula mollis, nec ullamcorper nulla commodo. Fusce rhoncus lectus ac mi tincidunt, nec aliquam dui volutpat. Aliquam vitae tortor nec libero pellentesque convallis. Morbi sed leo sed elit auctor ultrices. Nulla facilisi. Nam ac pharetra urna. Nullam tempor sem vitae mi accumsan congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus commodo ligula at odio aliquet, in fermentum est aliquet. Proin eget sodales libero."
                    </Text>
                </View>

                <View style={styles.promocionesContainer}>
                    <Text style={styles.promocionesTitle}>Promociones</Text>
                    {/* Agregar contenido de promociones aquí */}
                </View>
            </ScrollView>
            {isDrawerOpen && <DrawerContent navigation={navigation} />}
            <Footer />
        </View>
    );
};

const ServiceCard = ({ icon, title, description, onPress }) => {
    return (
        <View style={[styles.serviceCard, styles.serviceCardBg]}>
            <MaterialIcons name={icon} size={40} color="black" style={styles.serviceCardIcon} />
            <Text style={styles.serviceCardTitle}>{title}</Text>
            <Text style={styles.serviceCardDescription}>{description}</Text>
            <TouchableOpacity style={styles.serviceButton} onPress={onPress}>
                <Text style={styles.serviceButtonText}>Más información</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerContainer: {
        backgroundColor: 'white',
        width: '80%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        paddingTop: 60,
    },
    drawerItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    drawerItemText: {
        color: 'black',
        fontSize: 18,
    },
    footerContainer: {
        backgroundColor: '#333',
        padding: 10,
        alignItems: 'center',
    },
    footerText: {
        color: '#fff',
        fontSize: 14,
    },
    headerImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    headerTextContainer: {
        paddingTop: 60,
        paddingBottom: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    companyName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2B2320',
    },
    descriptionText: {
        fontSize: 16,
        color: '#4D3C3B',
        textAlign: 'center',
        marginHorizontal: 20,
    },
    menuButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
        padding: 10,
    },
    servicesContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 10,
    },
    servicesTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    serviceCardContainer: {
        marginTop: 10,
    },
    serviceCard: {
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    serviceCardBg: {
        backgroundColor: '#F1EEDB',
    },
    serviceCardIcon: {
        marginBottom: 10,
    },
    serviceCardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 5,
    },
    serviceCardDescription: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    serviceButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    serviceButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    testimoniosContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 10,
    },
    testimoniosTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    testimoniosText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'justify',
        marginBottom: 10,
    },
    promocionesContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 10,
    },
    promocionesTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default StackScreen;
