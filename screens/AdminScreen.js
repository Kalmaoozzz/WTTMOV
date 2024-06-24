import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const TopUsers = ({ users, handleEdit, handleToggleStatus, handleDeleteUser }) => {
  const confirmDeleteUser = (id) => {
    Alert.alert(
      'Confirma la eliminación',
      '¿Estás seguro de que deseas eliminar este usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => handleDeleteUser(id) }
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
          <Text style={[styles.cell, { width: 250 }]}>Email</Text>
          <Text style={[styles.cell, { width: 100 }]}>Estado</Text>
          <Text style={[styles.cell, { width: 100 }]}>Acciones</Text>
        </View>
        {users.map(user => (
          <View key={user.id} style={[styles.tableRow, user.status === 0 && styles.inactiveRow]}>
            <Text style={[styles.cell, { width: 50 }]}>{user.id}</Text>
            <Text style={[styles.cell, { width: 200 }]}>{user.name}</Text>
            <Text style={[styles.cell, { width: 250 }]}>{user.email}</Text>
            <Text style={[styles.cell, { width: 100 }]}>{user.email_verified_at ? 'Verificado' : 'No Verificado'}</Text>
            <View style={[styles.cell, { width: 100 }]}>
              <TouchableOpacity onPress={() => handleEdit(user)}>
                <FontAwesome name="edit" size={20} color="#7375E6" style={{ marginRight: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleToggleStatus(user)}>
                <Text style={styles.toggleButton}>{user.status ? 'Desactivar' : 'Activar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmDeleteUser(user.id)}>
                <Text style={styles.toggleButton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const UserManagement = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    id: null,
    name: '',
    email: '',
    email_verified_at: null,
    password: '',
    status: 1,
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch('https://b980-2800-484-7800-26c0-9197-5577-b366-4384.ngrok-free.app/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al cargar los datos de los usuarios:', error);
    }
  };

  const saveUsers = async (users) => {
    try {
      await fetch('https://b980-2800-484-7800-26c0-9197-5577-b366-4384.ngrok-free.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(users),
      });
    } catch (error) {
      console.error('Error al guardar los datos de los usuarios:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewUser({ ...user });
    setEditMode(true);
    setModalVisible(true);
  };

  const handleToggleStatus = (user) => {
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return { ...u, status: u.status === 1 ? 0 : 1 };
      }
      return u;
    });
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  const handleSaveUser = () => {
    if (newUser.name && newUser.email && newUser.password) {
      if (editMode) {
        const updatedUsers = users.map(user => {
          if (user.id === selectedUser.id) {
            return newUser;
          }
          return user;
        });
        setUsers(updatedUsers);
        setEditMode(false);
        saveUsers(updatedUsers);
      } else {
        const existingUser = users.find(user => user.email === newUser.email);
        if (existingUser) {
          alert('El email ya está en uso.');
          return;
        }
        const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
        newUser.id = newId;
        setUsers([...users, newUser]);
        saveUsers([...users, newUser]);
      }
      setNewUser({
        id: null,
        name: '',
        email: '',
        email_verified_at: null,
        password: '',
        status: 1,
      });
      setModalVisible(false);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const filteredUsers = users.filter(user => user.email.includes(searchQuery));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.adminText}>Gestiona los usuarios</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por email"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => {}}>
          <FontAwesome name="search" size={20} color="#7375E6" />
        </TouchableOpacity>
      </View>
      <TopUsers
        users={filteredUsers}
        handleEdit={handleEdit}
        handleToggleStatus={handleToggleStatus}
        handleDeleteUser={handleDeleteUser}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => { setEditMode(false); setModalVisible(true); }}>
        <Text style={styles.addButtonText}>Agregar usuario</Text>
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
              {editMode ? 'Editar usuario' : 'Agregar nuevo usuario'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nombre"
              value={newUser.name}
              onChangeText={text => setNewUser({ ...newUser, name: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              value={newUser.email}
              onChangeText={text => setNewUser({ ...newUser, email: text })}
              keyboardType="email-address"
              editable={!editMode} // Solo editable al agregar nuevo usuario
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Clave"
              value={newUser.password}
              onChangeText={text => setNewUser({ ...newUser, password: text })}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSaveUser}>
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.footer}>© 2023 Todos los derechos reservados por Fenix Technology</Text>
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
  inactiveRow: {
    backgroundColor: '#f9f9f9',
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

export default UserManagement;
