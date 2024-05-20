import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const SigninScreen = () => {
  const navigation = useNavigation(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      Alert.alert('Thành công', 'Đăng nhập thành công!');
      navigation.navigate('Home'); 
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi', 'Đăng nhập thất bại!');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../image/login_logo.png')}
        style={styles.image}
        resizeMode="contain"
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
      <View style={styles.buttonContainer}>      
        <Button title="Đăng nhập"  onPress={handleLogin} />
        <Button
          title="Đăng kí"
          style={styles.button}
          onPress={() => navigation.navigate('Signup')} 
        />
        <Button
          title="Đổi mật khẩu"
          style={styles.button}
          onPress={() => navigation.navigate('UpdatePass')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  input: {
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  
});

export default SigninScreen;
