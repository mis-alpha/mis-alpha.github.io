import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import ArticleItem from './ArticleItem';
import CustomButton from './Button';

const Articles = () => {
  const [articlePage, setArticlePage] = useState(1);
  const [articleData, setArticleData] = useState([])
  const articlesPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:3000/api/decrypt';
      try {
        const response = await fetch(url);
        const data = await response.json();
        const articleData = data.data.map (item => ({
          title: item.title,
          time: item.createdAt,
          url: item.url,
        }));
        setArticleData(articleData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);
    
  const displayedArticles = articleData.slice(0, articlePage * articlesPerPage);

  return (
    <ScrollView style={styles.articlesContainer}>
      {displayedArticles.map((article, index) => (
        <ArticleItem key={index} time={article.time} title={article.title} source={article.url} />
      ))}
      {displayedArticles.length < articleData.length && (
        <CustomButton title="Show More Articles" onPress={() => setArticlePage(articlePage + 1)} />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

export default Articles;