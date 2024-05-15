import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';

const ArticleItem = ({ time, title, source }) => {
  return (
    <View style={styles.container}>
    <View style={styles.timeContainer}>
      <Text style={styles.time}>{time}</Text>
    </View>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={{color: 'blue'}}
              onPress={() => Linking.openURL(source)}>
          decrypt.co
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',  // Align items in a row
    padding: 10,
    alignItems: 'flex-start', // Align items to the start of the container
  },
  timeContainer: {
    marginRight: 10,  // Space between time and details
    alignItems: 'flex-start',
    justifyContent: 'center',  // Center the time vertically within its container
  },
  time: {
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
    color: '#353739',
    marginRight: 10, // Give some space between the time and the title/source
    paddingTop: 3,  // Top padding to align title with time
  },
  details: {
    flex: 1, // Take up remaining space
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#232429',
    marginBottom: 4, // Space between title and source
  },
  source: {
    fontSize: 12,
    color: '#353739', // Grey color for the source text
  }
});

export default ArticleItem;