import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_KEY } from '../login/Login';

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token', error);
    return null;
  }
};
