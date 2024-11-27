/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import TodoApp from './TodoApp';



function App(): React.JSX.Element {
  return (
   <TodoApp/>
  );
}

const styles = StyleSheet.create({
 
});

export default App;
