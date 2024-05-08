import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RollingBanner from './components/Ticker';
import ArticleItem from './components/ArticleItem';
import FeedCard from './components/Feedcard';
import CustomButton from './components/Button';


export default function App() {
  const [articlePage, setArticlePage] = useState(1);
  const [feedPage, setFeedPage] = useState(1);
  const articlesPerPage = 12;
  const feedsPerPage = 9;
  
  const cryptoData = [
    { symbol: "BTC", price: 62805 },
    { symbol: "ETH", price: 3109.6 },
    { symbol: "SOL", price: 143.63 },
    { symbol: "BNB", price: 585.99 },
    { symbol: "MC", price: 2.45 },
  ];

  const articles = new Array(25).fill(null).map((_, index) => ({
    title: `Article ${index + 1}`,
    source: "https://www.example.com",
    time: `${index + 1} mins`
  }));

  const feeds = new Array(20).fill(null).map((_, index) => ({
    id: index,
    avatar: 'https://placekitten.com/200/200',
    name: `CryptoDan ${index + 1}`,
    time: `${index + 1}hr`,
    title: 'Bitcoin Ordinals Driving ‘Renaissance’ in BTC Activity',
    description: 'Detailed description here...',
    source: 'www.cryptoquant.com',
  }));

  const displayedArticles = articles.slice(0, articlePage * articlesPerPage);
  const displayedFeeds = feeds.slice(0, feedPage * feedsPerPage);

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <RollingBanner data={cryptoData} />
      </View>
      <ScrollView style={styles.articlesContainer}>
        {displayedArticles.map((article, index) => (
          <ArticleItem key={index} time={article.time} title={article.title} source={article.source} />
        ))}
        {displayedArticles.length < articles.length && (
          <CustomButton title="Show More Articles" onPress={() => setArticlePage(articlePage + 1)} />
        )}
        {displayedFeeds.map(feed => (
          <FeedCard key={feed.id} item={feed} />
        ))}
        {displayedFeeds.length < feeds.length && (
          <CustomButton title="Show More Feeds" onPress={() => setFeedPage(feedPage + 1)} />
        )}
      </ScrollView>
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
  },
  articleItem: {
    padding: 10,
    margin: 10,
    backgroundColor: '#e9ecef', // Light grey background for each article
    borderRadius: 3,
  },
  articleText: {
    fontSize: 16,
  }

});
