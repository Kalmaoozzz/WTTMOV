import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa tus componentes de pantalla
import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingScreen";
import StackScreen from "./screens/StackScreen";
import AdminScreen from "./screens/AdminScreen";
import PerfilScreen from "./screens/PerfilScreen";
import StoreManagement from "./screens/TiendasScreen"; // Importa la pantalla de gestión de tiendas
import EquiposScreen from "./screens/EquiposScreen";




const HomeStackNavigator = createNativeStackNavigator();

function MyStack() {
    return (
        <HomeStackNavigator.Navigator initialRouteName="Home">
            <HomeStackNavigator.Screen
                name="Registro"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <HomeStackNavigator.Screen
                name="Stack"
                component={StackScreen}
                options={{ headerBackTitleVisible: false }}
            />
        </HomeStackNavigator.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: 'red',
            }}
        >
            <Tab.Screen
                name="Home"
                component={MyStack}
                options={{
                    tabBarLabel: 'Iniciar Sesion',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" size={size} color={color} />
                    ),
                    tabBarBadge: 10,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Registro"
                component={SettingStack} // Cambiado de SettingScreen a SettingStack
                options={{
                    headerShown: false,
                    tabBarLabel: 'Registrarse',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Usuarios"
                component={AdminStack} // Cambiado de SettingScreen a AdminStack
                options={{
                    headerShown: false,
                    tabBarLabel: 'Usuarios',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" size={size} color={color} />
                    ),
                }}
            />
          
            <Tab.Screen
                name="Tiendas"
                component={StoreManagementStack} // Añade el stack de navegación de StoreManagement
                options={{
                    headerShown: false,
                    tabBarLabel: 'Tiendas',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="store" size={size} color={color} />
                    ),
                }}
            />
           <Tab.Screen
                name="Equipos"
                component={EquiposScreen} // Añade el stack de navegación de StoreManagement
                options={{
                    headerShown: false,
                    tabBarLabel: 'Equipos',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="store" size={size} color={color} />
                    ),
                }}
            />
             <Tab.Screen
                name="Perfil"
                component={PerfilNavigator} // Añadido el stack de navegación del perfil
                options={{
                    headerShown: false,
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
        
    );
}

const SettingStackNavigator = createNativeStackNavigator();

function SettingStack() {
    return (
        <SettingStackNavigator.Navigator initialRouteName="Setting">
            <SettingStackNavigator.Screen
                name="RegistroSetting"
                component={SettingScreen}
                options={{ headerShown: false }}
            />
        </SettingStackNavigator.Navigator>
    );
}

const PerfilStackNavigator = createNativeStackNavigator();

function PerfilNavigator() {
    return (
        <PerfilStackNavigator.Navigator initialRouteName="Perfil">
            <PerfilStackNavigator.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{ headerShown: false }}
            />
        </PerfilStackNavigator.Navigator>
    );
}

const AdminStackNavigator = createNativeStackNavigator();

function AdminStack() {
    return (
        <AdminStackNavigator.Navigator initialRouteName="Admin">
            <AdminStackNavigator.Screen
                name="Admin"
                component={AdminScreen}
                options={{ headerShown: false }}
            />
        </AdminStackNavigator.Navigator>
    );
}

const StoreManagementStackNavigator = createNativeStackNavigator();

function StoreManagementStack() {
    return (
        <StoreManagementStackNavigator.Navigator initialRouteName="StoreManagement">
            <StoreManagementStackNavigator.Screen
                name="StoreManagement"
                component={StoreManagement}
                options={{ headerShown: false }}
            />
        </StoreManagementStackNavigator.Navigator>
    );
}




export default MyTabs;
