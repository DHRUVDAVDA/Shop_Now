import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addToCart } from '../../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetailScreen = () => {
  const route = useRoute<any>();
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (isLoggedIn) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity, // from state
        }),
      );
      navigation.goBack();
    } else {
      Alert.alert('Login Required', 'Please login to add items to your cart.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => navigation.navigate('login') },
      ]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Product Details</Text>
            <View style={{ width: 28 }} />
          </View>

          <Animated.View
            entering={FadeInUp.duration(400)}
            style={styles.imageContainer}
          >
            <Image source={{ uri: product.image }} style={styles.image} />
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(500)}
            style={styles.detailsContainer}
          >
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>

            <Text style={styles.description}>{product.description}</Text>

            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decreaseQty} style={styles.qtyButton}>
                <Icon name="remove" size={22} color="black" />
              </TouchableOpacity>

              <Text style={styles.qtyText}>{quantity}</Text>

              <TouchableOpacity onPress={increaseQty} style={styles.qtyButton}>
                <Icon name="add" size={22} color="black" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Icon name="shopping-cart" size={22} color="white" />
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  category: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4facfe',
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 25,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  qtyButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 15,
    color: 'black',
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#4facfe',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});
