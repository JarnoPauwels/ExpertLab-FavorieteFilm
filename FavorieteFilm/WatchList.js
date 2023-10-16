import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlistData = async () => {
    try {
      const apiUrl = 'http://localhost:3000/watchlist';

      const response = await axios.get(apiUrl);

      const watchlistData = response.data;

      setWatchlist(watchlistData);
    } catch (error) {
      console.error('Error fetching watchlist data:', error);
    }
  };

  useEffect(() => {
    fetchWatchlistData();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Watchlist</Text> */}
      <FlatList
        data={watchlist}
        keyExtractor={(item) => item.movie_id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.movieText}>{item.title}</Text>
            <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster}`,
            }}
            style={styles.poster}
            />
            <Text style={styles.movieDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  movieText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  movieDescription: {
    color: 'white',
    fontSize: 16,
  },
  poster: {
    width: '100%', 
    aspectRatio: 2 / 3,
    resizeMode: 'contain',
  },
});

export default Watchlist;
