import AsyncStorage from "@react-native-async-storage/async-storage";

export const TOKEN_KEY = 'AUTH_TOKEN';

export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving token', error);
  }
};