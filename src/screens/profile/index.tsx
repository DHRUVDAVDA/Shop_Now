import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../store/userSlice';
import { clearCart } from '../../store/cartSlice';
import { useNavigation } from '@react-navigation/native';
import { clearOrders } from '../order/Order';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state: any) => state.user);
  const isGuest = user?.isGuest || !user?.isLoggedIn;

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('AUTH_TOKEN');
          dispatch(logout());
          dispatch(clearCart());
          clearOrders();
          navigation.reset({
            index: 0,
            routes: [{ name: 'login' as never }],
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.profileBox}>
          <Icon name="account-circle" size={90} color="#4facfe" />

          <Text style={styles.name}>{user?.username || 'Guest User'}</Text>
          <Text style={styles.email}>{user?.email || 'Not logged in'}</Text>
        </View>

        {isGuest ? (
          <TouchableOpacity
            style={[styles.logoutBtn, styles.loginBtn]}
            onPress={() => navigation.navigate('login' as never)}
          >
            <Icon name="login" size={22} color="#fff" />
            <Text style={styles.logoutText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Icon name="logout" size={22} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#f7f8fa',
  },
  profileBox: {
    alignItems: 'center',
    marginTop: 60,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  loginBtn: {
    backgroundColor: '#4facfe', // blue for action
  },
  logoutBtn: {
    backgroundColor: '#ff5f6d',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 40,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});
