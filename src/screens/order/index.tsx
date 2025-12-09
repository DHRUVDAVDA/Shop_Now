import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getOrders, Order } from './Order';
import { useFocusEffect } from '@react-navigation/native';

const OrderScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    const data = await getOrders();
    setOrders(data.reverse());
  };

  useFocusEffect(() => {
    loadOrders();
  });

  const renderOrder = ({ item }: { item: Order }) => {
    const itemsCount = item.items.reduce(
      (sum: number, it: any) => sum + (it.quantity || 1),
      0,
    );

    return (
      <Animated.View entering={FadeInUp.duration(500)} style={styles.card}>
        {item.items[0]?.image ? (
          <Image source={{ uri: item.items[0].image }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Icon name="inventory" size={32} />
          </View>
        )}

        <View style={styles.info}>
          <Text style={styles.title}>Order #{item.id}</Text>
          <Text style={styles.date}>Date: {item.date}</Text>
          <Text style={styles.itemsCount}>{itemsCount} items</Text>
          <Text style={styles.price}>Total: ${item.total.toFixed(2)}</Text>
        </View>

        <View style={styles.statusIcon}>
          <Icon name="receipt-long" size={22} color="#4facfe" />
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>My Orders</Text>

        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="receipt-long" size={80} color="#aaa" />
            <Text style={styles.emptyText}>No orders yet</Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={item => item.id.toString()}
            renderItem={renderOrder}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
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
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  itemsCount: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  price: {
    color: '#4facfe',
    fontWeight: '700',
    marginTop: 4,
  },
  statusIcon: {
    justifyContent: 'center',
    paddingRight: 5,
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
