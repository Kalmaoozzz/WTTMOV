import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const TopStores = ({ stores, handleEdit, handleDeleteStore }) => {
  const confirmDeleteStore = (id) => {
    Alert.alert(
      'Confirma la eliminación',
      '¿Estás seguro de que deseas eliminar esta tienda?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => handleDeleteStore(id) }
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.tableContainer}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.cell, { width: 50 }]}>ID</Text>
          <Text style={[styles.cell, { width: 200 }]}>Nombre</Text>
          <Text style={[styles.cell, { width: 250 }]}>Dirección</Text>
          <Text style={[styles.cell, { width: 150 }]}>Teléfono</Text>
          <Text style={[styles.cell, { width: 100 }]}>Acciones</Text>
        </View>
        {stores.map(store => (
          <View key={store.id_tienda} style={styles.tableRow}>
            <Text style={[styles.cell, { width: 50 }]}>{store.id_tienda}</Text>
            <Text style={[styles.cell, { width: 200 }]}>{store.nombre}</Text>
            <Text style={[styles.cell, { width: 250 }]}>{store.direccion}</Text>
            <Text style={[styles.cell, { width: 150 }]}>{store.telefono}</Text>
            <View style={[styles.cell, { width: 100 }]}>
              <TouchableOpacity onPress={() => handleEdit(store)}>
                <FontAwesome name="edit" size={20} color="#7375E6" style={{ marginRight: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmDeleteStore(store.id_tienda)}>
                <Text style={styles.toggleButton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const StoreManagement = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stores, setStores] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [newStore, setNewStore] = useState({
    id_tienda: null,
    nombre: '',
    direccion: '',
    telefono: '',
  });

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const response = await fetch('https://your-api-endpoint/tiendas');
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error('Error al cargar los datos de las tiendas:', error);
    }
  };

  const saveStores = async (stores) => {
    try {
      await fetch('https://your-api-endpoint/tiendas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stores),
      });
    } catch (error) {
      console.error('Error al guardar los datos de las tiendas:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleEdit = (store) => {
    setSelectedStore(store);
    setNewStore({ ...store });
    setEditMode(true);
    setModalVisible(true);
  };

  const handleDeleteStore = (id) => {
    const updatedStores = stores.filter(store => store.id_tienda !== id);
    setStores(updatedStores);
    saveStores(updatedStores);
  };

  const handleSaveStore = () => {
    if (newStore.nombre && newStore.direccion && newStore.telefono) {
      if (editMode) {
        const updatedStores = stores.map(store => {
          if (store.id_tienda === selectedStore.id_tienda) {
            return newStore;
          }
          return store;
        });
        setStores(updatedStores);
        setEditMode(false);
        saveStores(updatedStores);
      } else {
        const newId = stores.length > 0 ? Math.max(...stores.map(store => store.id_tienda)) + 1 : 1;
        newStore.id_tienda = newId;
        setStores([...stores, newStore]);
        saveStores([...stores, newStore]);
      }
      setNewStore({
        id_tienda: null,
        nombre: '',
        direccion: '',
        telefono: '',
      });
      setModalVisible(false);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const filteredStores = stores.filter(store => store.nombre.includes(searchQuery));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.adminText}>Gestiona las tiendas</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => {}}>
          <FontAwesome name="search" size={20} color="#7375E6" />
        </TouchableOpacity>
      </View>
      <TopStores
        stores={filteredStores}
        handleEdit={handleEdit}
        handleDeleteStore={handleDeleteStore}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => { setEditMode(false); setModalVisible(true); }}>
        <Text style={styles.addButtonText}>Agregar tienda</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editMode ? 'Editar tienda' : 'Agregar nueva tienda'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nombre"
              value={newStore.nombre}
              onChangeText={text => setNewStore({ ...newStore, nombre: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Dirección"
              value={newStore.direccion}
              onChangeText={text => setNewStore({ ...newStore, direccion: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Teléfono"
              value={newStore.telefono}
              onChangeText={text => setNewStore({ ...newStore, telefono: text })}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSaveStore}>
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.footer}>© 2023 Todos los derechos reservados por wtt</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  adminText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  searchButton: {
    marginLeft: 10,
  },
  tableContainer: {
    flexDirection: 'column',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  toggleButton: {
    color: '#7375E6',
    fontWeight: 'bold',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#7375E6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#7375E6',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: '#888',
  },
});

export default StoreManagement;
