import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CartScreen from '../screens/cart';
import { useSelector } from 'react-redux';
import HomeScreen from '../screens/home';
import OrderScreen from '../screens/order';
import ProfileScreen from '../screens/profile';

const Tab = createBottomTabNavigator();

const Bottomtab = () => {
  const cartItems = useSelector((state: any) => state.cart.items || []);

  // Calculate total quantity
  const totalQuantity = cartItems.reduce(
    (sum: number, item: any) => sum + (item.quantity || 0),
    0,
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 10,
          color: 'black',
        },
      }}
    >
      <Tab.Screen
        component={HomeScreen}
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Icon
                name="home"
                color={focused ? '#4facfe' : 'black'}
                size={24}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Icon
                name="shopping-cart"
                color={focused ? '#4facfe' : 'black'}
                size={24}
              />
              {totalQuantity > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {totalQuantity > 9 ? '9+' : totalQuantity}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          tabBarLabel: 'My Orders',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Icon
                name="list-alt"
                color={focused ? '#4facfe' : 'black'}
                size={24}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Icon
                name="account-circle"
                color={focused ? '#4facfe' : 'black'}
                size={24}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Bottomtab;

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#f44336',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
