import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  FadeInLeft,
  FadeInRight,
  ZoomIn,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { getToken } from './Splash';
import { useSelector } from 'react-redux';

const SplashScreen = () => {
  const navigation = useNavigation();
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

  useEffect(() => {
    const checkAuth = async () => {
      setTimeout(() => {
        if (isLoggedIn) {
          navigation.replace('bottomtab');
        } else {
          navigation.replace('login');
        }
      }, 2200);
    };

    checkAuth();
  }, []);

  return (
    <LinearGradient
      colors={['#ffffff', '#bdbdbd']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animated.View entering={ZoomIn.duration(700)} style={styles.inner}>
        <Animated.Text
          entering={FadeInLeft.duration(800)}
          style={styles.shopText}
        >
          SHOP
        </Animated.Text>

        <Animated.Text
          entering={FadeInRight.duration(800)}
          style={styles.nowText}
        >
          NOW
        </Animated.Text>
      </Animated.View>

      <Animated.Text
        entering={FadeInRight.delay(800).duration(600)}
        style={styles.tagline}
      >
        Easy shopping, fast checkout
      </Animated.Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  shopText: {
    fontSize: 64,
    fontWeight: '900',
    color: '#333333',
    letterSpacing: 2,
  },
  nowText: {
    fontSize: 64,
    fontWeight: '900',
    color: '#4facfe',
    marginLeft: 8,
    letterSpacing: 2,
  },
  tagline: {
    position: 'absolute',
    bottom: 90,
    color: '#444',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

export default SplashScreen;
