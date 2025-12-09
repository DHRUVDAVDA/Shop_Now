import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stacks from './src/navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stacks />
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
