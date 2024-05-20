import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { FIREBASE_DB } from '../FireBaseConfig';

const AddServiceScreen = () => {

  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');  
  const [error, setError] = useState('');


  const handleAddService = async () => {
    try {
      const servicesRef = collection(FIREBASE_DB, 'Services');
      const serviceData = {
        serviceName,
        servicePrice: parseFloat(servicePrice),
        createdAt: serverTimestamp(), 
        updatedAt: serverTimestamp(), 
      };

      await addDoc(servicesRef, serviceData);
      Alert.alert('Thành công', 'Đã thêm dịch vụ!');
    } catch (error) {
      console.error('Error adding service:', error);
      Alert.alert('Lỗi', 'Thêm dịch vụ thất bại!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thêm dịch vụ</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên dịch vụ"
        value={serviceName}
        onChangeText={(text) => setServiceName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Giá dịch vụ"
        value={servicePrice}
        onChangeText={(text) => {
          if (text === '' || /^\d*\.?$/.test(text)) {
            setServicePrice(text);
          }
        }}
        keyboardType="numeric" 
        onBlur={() => { 
          if (!/^\d*\.?$/.test(servicePrice)) {
            setError('Giá trị không hợp lệ. Vui lòng nhập số.'); 
          } else {
            setError('');
          }
        }}
        errorMessage={error} 
      />
      <Button title="Thêm" style={styles.button} onPress={handleAddService} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#007bff',
  },
});

export default AddServiceScreen;
