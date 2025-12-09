import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

export const Loader = ({ visible }: { visible: boolean }) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="black" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // dimmed background
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    elevation: 5,
  },
});
