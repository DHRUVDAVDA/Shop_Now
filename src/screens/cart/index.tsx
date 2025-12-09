import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from '../../store/cartSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '../../components/loader';
import { saveOrder } from '../order/Order';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { items } = useSelector(
    (state: any) => state.cart || { items: [], total: 0 },
  );
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const displayTotal = items.reduce(
    (s: number, i: any) => s + i.price * i.quantity,
    0,
  );

  const onCheckOut = async () => {
    setIsLoader(true);

    setTimeout(async () => {
      try {
        const order = {
          id: Date.now(),
          items,
          total: displayTotal,
          date: new Date().toLocaleDateString(),
        };

        await saveOrder(order);

        dispatch(clearCart());

        Alert.alert('', 'Order placed successful!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Order');
            },
          },
        ]);
      } catch (error) {
        Alert.alert('Error', 'Failed to place order');
      } finally {
        setIsLoader(false);
      }
    }, 1500);
  };

  const renderItem = ({ item }: any) => (
    <Animated.View entering={FadeInUp.duration(500)} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>

        <View style={styles.qtyRow}>
          <TouchableOpacity
            onPress={() => dispatch(decreaseQty(item.id))}
            style={styles.qtyBtn}
          >
            <Icon name="remove" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.qtyText}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => dispatch(increaseQty(item.id))}
            style={styles.qtyBtn}
          >
            <Icon name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => dispatch(removeFromCart(item.id))}
        style={styles.deleteBtn}
      >
        <Icon name="delete" size={22} color="#ff5f6d" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Loader visible={isLoader} />
      <View style={styles.container}>
        <Text style={styles.header}>My Cart</Text>

        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="shopping-cart" size={80} color="#aaa" />
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 120 }}
              showsVerticalScrollIndicator={false}
            />

            <View style={styles.footer}>
              <View>
                <Text style={styles.totalText}>Subtotal</Text>
                <Text style={styles.totalAmount}>
                  ${displayTotal.toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  onCheckOut();
                }}
                style={styles.checkoutBtn}
              >
                <Text style={styles.checkoutText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    // paddingTop: 60,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  info: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    color: '#4facfe',
    fontWeight: '700',
    marginTop: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyBtn: {
    backgroundColor: '#4facfe',
    borderRadius: 50,
    padding: 5,
    marginHorizontal: 10,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteBtn: {
    justifyContent: 'center',
    paddingRight: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
  },
  totalText: {
    fontSize: 14,
    color: '#777',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  checkoutBtn: {
    backgroundColor: '#4facfe',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#777',
    fontSize: 18,
    marginTop: 10,
  },
});
