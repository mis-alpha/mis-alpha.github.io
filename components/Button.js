import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Custom Button component
const CustomButton = ({ onPress, title, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#232429', // Default background color
    padding: 10,
    margin: 10,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#ffffff', // Default text color
    fontSize: 12
  }
});

export default CustomButton;
