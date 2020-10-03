import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useCachedResources from './useCachedResources.ts';

export default function App() {
    const isLoadingComplete = useCachedResources();
  return (
        <View style={styles.container}>
          <Text style={styles.title}>Open up App.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
      fontFamily: 'nunitosans-lightitalic',
      fontSize: 40,
      letterSpacing: 0.2,
      color: '#000000'
  },
  normal: {
    fontFamily: 'roboto-regular',
    fontSize: 12,
    lineHeight: 24,
    color: '#646464'
  },
  subtitle: {
    fontFamily: 'roboto-regular',
    fontSize: 18,
    lineHeight: 60,
    color: '#646464'
  },
});
