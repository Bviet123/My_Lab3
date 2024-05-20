import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';


const UpdatePasswordScreen = ({ navigation }) => {
  

  const handleUpdatePassword = async () => {
    
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../image/repass.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.header}>Cập nhật mật khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu hiện tại"
        secureTextEntry={true}
        onChangeText={(text) => setCurrentPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu mới"
        secureTextEntry={true}
        onChangeText={(text) => setNewPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu mới"
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button title="Cập nhật" style={styles.button} onPress={handleUpdatePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
    alignItems: 'center', 
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20, 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  input: {
    width: '100%', 
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 4,
    backgroundColor: '#007bff', 
  },
});

export default UpdatePasswordScreen;
