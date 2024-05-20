import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../FireBaseConfig';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert('Lỗi', 'Mật khẩu nhập lại không khớp!');
        return;
      }

      const usersRef = collection(FIREBASE_DB, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert('Lỗi', 'Email này đã được sử dụng!');
        return;
      }

      const userData = {
        name,
        email,
        password,
        role: "Customer",
      };

      await addDoc(usersRef, userData);
      Alert.alert('Thành công', 'Tạo tài khoản thành công!');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi', 'Tạo tài khoản thất bại!');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../image/regis_logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button title="Đăng ký" style={styles.button} onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
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

export default SignupScreen;
