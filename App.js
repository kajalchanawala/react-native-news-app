/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStackNavigator from './src/router';
import { StatusBar } from 'react-native';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <RootStackNavigator />
    </SafeAreaProvider>
  );
}

export default App;
