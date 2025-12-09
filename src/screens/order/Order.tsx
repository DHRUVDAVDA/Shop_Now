import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Order {
  id: number;
  items: any[];
  total: number;
  date: string;
}

const ORDERS_KEY = 'USER_ORDERS';

export const saveOrder = async (order: Order) => {
  try {
    const existingOrders = await AsyncStorage.getItem(ORDERS_KEY);
    const orders = existingOrders ? JSON.parse(existingOrders) : [];

    orders.push(order);

    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving order:', error);
  }
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const existing = await AsyncStorage.getItem(ORDERS_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

export const clearOrders = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ORDERS_KEY);
  } catch (error) {
    console.error('Error clearing orders:', error);
  }
};
