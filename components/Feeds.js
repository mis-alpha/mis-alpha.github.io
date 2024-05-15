import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import FeedCard from './Feedcard';
import CustomButton from './Button';


const Feeds = () => {
    const [feedPage, setFeedPage] = useState(1);
    const feedsPerPage = 9;
    
    const feeds = new Array(20).fill(null).map((_, index) => ({
      id: index,
      avatar: 'https://placekitten.com/200/200',
      name: `CryptoDan ${index + 1}`,
      time: `${index + 1}hr`,
      title: 'Bitcoin Ordinals Driving ‘Renaissance’ in BTC Activity',
      description: 'Detailed description here...',
      source: 'www.cryptoquant.com',
    }));
  
    const displayedFeeds = feeds.slice(0, feedPage * feedsPerPage);

    return (
      <ScrollView style={styles.articlesContainer}>
        {displayedFeeds.map(feed => (
          <FeedCard key={feed.id} item={feed} />
      ))}
        {displayedFeeds.length < feeds.length && (
        <CustomButton title="Show More Feeds" onPress={() => setFeedPage(feedPage + 1)} />
        )}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
   articlesContainer: {
    flex: 1, // Takes the remaining space
  }

});

export default Feeds;