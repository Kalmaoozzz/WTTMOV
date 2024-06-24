import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TopEquipos = ({ equipos, handleEditEquipo, handleDeleteEquipo }) => {
  const confirmDeleteEquipo = (id) => {
    Alert.alert(
      'Confirma la eliminación',
      '¿Estás seguro de que deseas eliminar este equipo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => handleDeleteEquipo(id) }
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
          <Text style={[styles.cell, { width: 150 }]}>Tipo</Text>
          <Text style={[styles.cell, { width: 200 }]}>Número de Serie</Text>
          <Text style={[styles.cell, { width: 100 }]}>Estado</Text>
          <Text style={[styles.cell, { width: 150 }]}>Ubicación</Text>
          <Text style={[styles.cell, { width: 100 }]}>Acciones</Text>
        </View>
        {equipos.map(equipo => (
          <View key={equipo.id_equipo} style={styles.tableRow}>
            <Text style={[styles.cell, { width: 50 }]}>{equipo.id_equipo}</Text>
            <Text style={[styles.cell, { width: 200 }]}>{equipo.nombre}</Text>
            <Text style={[styles.cell, { width: 150 }]}>{equipo.tipo}</Text>
            <Text style={[styles.cell, { width: 200 }]}>{equipo.numero_serie}</Text>
            <Text style={[styles.cell, { width: 100 }]}>{equipo.estado}</Text>
            <Text style={[styles.cell, { width: 150 }]}>{equipo.ubicacion}</Text>
            <View style={[styles.cell, { width: 100 }]}>
              <TouchableOpacity onPress={() => handleEditEquipo(equipo)}>
                <FontAwesome name="edit" size={20} color="#7375E6" style={{ marginRight: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmDeleteEquipo(equipo.id_equipo)}>
                <Text style={styles.toggleButton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const EquiposManagement = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [equipos, setEquipos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [newEquipo, setNewEquipo] = useState({
    id_equipo: null,
    nombre: '',
    tipo: '',
    numero_serie: '',
    estado: '',
    ubicacion: 'almacen_softteam',
  });

  useEffect(() => {
    loadEquipos();
  }, []);

  const loadEquipos = async () => {
    try {
      const response = await fetch('https://your-api-endpoint/equipos');
      const data = await response.json();
      setEquipos(data);
    } catch (error) {
      console.error('Error al cargar los datos de los equipos:', error);
    }
  };

  const saveEquipos = async (equipos) => {
    try {
      await fetch('https://your-api-endpoint/equipos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(equipos),
      });
    } catch (error) {
      console.error('Error al guardar los datos de los equipos:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleEditEquipo = (equipo) => {
    setSelectedEquipo(equipo);
    setNewEquipo({ ...equipo });
    setEditMode(true);
    setModalVisible(true);
  };

  const handleDeleteEquipo = (id) => {
    const updatedEquipos = equipos.filter(equipo => equipo.id_equipo !== id);
    setEquipos(updatedEquipos);
    saveEquipos(updatedEquipos);
  };

  const handleSaveEquipo = () => {
    if (newEquipo.nombre && newEquipo.tipo && newEquipo.numero_serie && newEquipo.estado) {
      if (editMode) {
        const updatedEquipos = equipos.map(equipo => {
          if (equipo.id_equipo === selectedEquipo.id_equipo) {
            return newEquipo;
          }
          return equipo;
        });
        setEquipos(updatedEquipos);
        setEditMode(false);
        saveEquipos(updatedEquipos);
      } else {
        const newId = equipos.length > 0 ? Math.max(...equipos.map(equipo => equipo.id_equipo)) + 1 : 1;
        newEquipo.id_equipo = newId;
        setEquipos([...equipos, newEquipo]);
        saveEquipos([...equipos, newEquipo]);
      }
      setNewEquipo({
        id_equipo: null,
        nombre: '',
        tipo: '',
        numero_serie: '',
        estado: '',
        ubicacion: 'almacen_softteam',
      });
      setModalVisible(false);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const filteredEquipos = equipos.filter(equipo => equipo.nombre.includes(searchQuery));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.adminText}>Gestiona los equipos</Text>
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
      <TopEquipos
        equipos={filteredEquipos}
        handleEditEquipo={handleEditEquipo}
        handleDeleteEquipo={handleDeleteEquipo}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => { setEditMode(false); setModalVisible(true); }}>
        <Text style={styles.addButtonText}>Agregar equipo</Text>
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
              {editMode ? 'Editar equipo' : 'Agregar nuevo equipo'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nombre"
              value={newEquipo.nombre}
              onChangeText={text => setNewEquipo({ ...newEquipo, nombre: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Tipo"
              value={newEquipo.tipo}
              onChangeText={text => setNewEquipo({ ...newEquipo, tipo: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Número de Serie"
              value={newEquipo.numero_serie}
              onChangeText={text => setNewEquipo({ ...newEquipo, numero_serie: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Estado"
              value={newEquipo.estado}
              onChangeText={text => setNewEquipo({ ...newEquipo, estado: text })}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSaveEquipo}>
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

export default EquiposManagement;
