import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { login } from '../../store/userSlice';
import { clearCart } from '../../store/cartSlice';
import useNetworkStatus from '../../components/networkStatus';
import { saveToken } from './Login';

const MOCK_USERS = [
  {
    username: 'Test User',
    email: 'test@zignuts.com',
    password: '123456',
    token: 'mock_token_test_zignuts',
  },
  {
    username: 'Practical User',
    email: 'practical@zignuts.com',
    password: '123456',
    token: 'mock_token_practical_zignuts',
  },
];

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('test@zignuts.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const isConnected = useNetworkStatus();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    if (!isConnected) {
      Alert.alert('No Internet', 'Please check your internet connection');
      return;
    }

    setLoading(true);

    try {
      const user = MOCK_USERS.find(
        u =>
          u.email.toLowerCase().trim() === email.toLowerCase().trim() &&
          u.password === password,
      );

      if (!user) {
        Alert.alert('Login Failed', 'Invalid email or password');
        return;
      }

      dispatch(
        login({
          username: username || user.username,
          email: user.email,
          password: user.password,
          isGuest: false,
          isLoggedIn: true,
          token: user.token,
        }),
      );
      dispatch(clearCart());

      navigation.navigate('bottomtab' as never);
    } catch (error: any) {
      Alert.alert('Login Failed', error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['white', 'grey']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back 👋</Text>

        <TextInput
          mode="outlined"
          label="Username (optional)"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Logging in...' : 'Log In'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('bottomtab' as never)}
        >
          <Text style={styles.linkText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'grey',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  linkText: {
    color: 'white',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
