import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { getDocs, collection, query, getFirestore, onSnapshot } from 'firebase/firestore';
import { app } from '../FireBaseConfig';

const HomeScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(getFirestore(app), 'Services'), (querySnapshot) => {
      const serviceList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredServices = serviceList.filter((service) =>
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setServices(filteredServices);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [searchTerm]); 

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <View style={styles.serviceNameContainer}>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('DetailService', { serviceId: item.id })}>
          <Text style={styles.detailButton}>Chi tiết</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.servicePrice}>Price: {item.servicePrice}</Text>
    </View>
  );

  const renderLoading = () => (
    <View style={styles.loading}>
      <Text>Loading services...</Text>
    </View>
  );

  const handleNavigateToAddService = () => {
    navigation.navigate('AddServiece');
  };
  const handleNavigateToLogin = () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        { text: 'Hủy', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Đăng xuất', onPress: () => navigation.navigate('Signin') },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../image/logolab3.png')}
        style={styles.image}
        resizeMode="stretch"
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Tìm kiếm dịch vụ....."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách dịch vụ</Text>
        <TouchableOpacity onPress={handleNavigateToLogin}>
          <Text style={styles.loginButton}>Đăng xuất</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigateToAddService}>
          <Image source={require('../image/Add.png')} style={styles.image2} resizeMode="stretch" />
        </TouchableOpacity>
      </View>
      {isLoading ? renderLoading() : (
        <FlatList
          data={services}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id}
          style={styles.serviceList}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  image2: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  serviceList: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  serviceItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  serviceNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  servicePrice: {
    marginTop: 5,
  },
  searchBar: {
    width: '100%',
    padding: 10,
    backgroundColor: '#e040fb', 
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailButton: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default HomeScreen;
