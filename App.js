import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'; // Importa NavigationContainer
import MyTabs from './Navegation'; // Importa el componente MyTabs

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
