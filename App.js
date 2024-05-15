import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RollingBanner from './components/Ticker';
import Articles from './components/Articles';
import Feeds from './components/Feeds';


export default function App() {

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <RollingBanner />
      </View>
      <Articles />
      <Feeds />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    height: 30, // Adjust height according to your banner's need
    backgroundColor: '#000000', // Light grey background for the banner area
  },
  articlesContainer: {
    flex: 1, // Takes the remaining space
  }

});
