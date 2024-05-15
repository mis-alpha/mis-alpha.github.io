import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';

const RollingBanner = ({ bannerStyle, textStyle }) => {
  const scrollViewRef = useRef();
  const [cryptoData, setCryptoData] = useState([]);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    debugger
    const fetchData = async () => {
     const url = 'http://localhost:3000/api/crypto';
     try {
       const response = await fetch(url);
       const data = await response.json();
       debugger
       const processedData = data.map(item => ({
         symbol: item.symbol,
         price: item.price // Ensure your server sends price directly formatted
     }));
       setCryptoData(processedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let scrollPos = 0;
    const contentWidth = cryptoData.reduce((total, ticker) => total + 50 + ticker.symbol.length * 10, 0);
    const step = 1;
    const interval = setInterval(() => {
      scrollPos += step;
      if (scrollPos >= contentWidth - screenWidth) {
        scrollPos = 0;
      }
      scrollViewRef.current.scrollTo({ x: scrollPos, animated: false });
    }, 16);

    return () => clearInterval(interval);
  }, [cryptoData, screenWidth]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
    >
      {cryptoData.map(ticker => (
        <View key={ticker.symbol} style={[styles.item, bannerStyle]}>
          <Text style={[styles.text, textStyle]}>{ticker.symbol}: ${ticker.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    marginHorizontal: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});

export default RollingBanner;
