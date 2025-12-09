import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface ProductCardProps {
  item: {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
  };
  onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, onPress }) => {
  return (
    <Animated.View entering={FadeInUp.duration(400)} style={styles.card}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.touchable}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  category: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  price: {
    color: '#4facfe',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default ProductCard;
