import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash, faTrash } from '@fortawesome/free-solid-svg-icons';
import MovieRating from './MovieRating';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlistData = async () => {
    try {
      const apiUrl = 'http://localhost:3000/watchlist';

      const response = await axios.get(apiUrl);

      const watchlistData = response.data;
      setWatchlist(watchlistData);
      console.log(watchlistData);
    } catch (error) {
      console.error('Error fetching watchlist data:', error);
    }
  };

  const deleteMovie = async (movie) => {
    try {
      await axios.delete(`http://localhost:3000/watchlist/${movie.movie_id}`);
      fetchWatchlistData(); // Refresh the watchlist after deleting
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const markAsWatched = async (movie) => {
    try {
      await axios.put(`http://localhost:3000/watchlist/${movie.movie_id}`);
      fetchWatchlistData(); // Refresh the watchlist after updating
    } catch (error) {
      console.error('Error updating movie watched status:', error);
    }
  };

const rateMovie = async (movie, newScore) => {
  try {
    const response = await axios.put(`http://localhost:3000/watchlist/${movie.movie_id}/rate`, { score: newScore });

    if (response.status === 200) {
      fetchWatchlistData(); // Refresh the watchlist after updating the rating.
    } else {
      console.error('Movie rating failed:', response.data);
    }
  } catch (error) {
    console.error('Error rating movie:', error);
  }
};

  useEffect(() => {
    fetchWatchlistData();
  }, []);

  return (
    <View style={styles.container}>
      {watchlist.length === 0 ? (
        <Text style={styles.emptyText}>Your Watchlist Is Empty</Text>
      ) : (
        <FlatList
          data={watchlist}
          keyExtractor={(item) => item.movie_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieContainer}>
              <MovieRating score={item.score} onRateMovie={(newScore) => rateMovie(item, newScore)} iconSize="36"/>
              <View style={styles.titleContainer}>
                <Text style={styles.movieText}>{item.title}</Text>
                {item.watched ? (
                  <View style={styles.watchedContainer}>
                    <FontAwesomeIcon icon={faEye} style={styles.watchedIcon} />
                    <Text style={styles.watchedText}>Watched</Text>
                  </View>
                ) : (
                  <View style={styles.notWatchedContainer}>
                    <FontAwesomeIcon icon={faEyeSlash} style={styles.notWatchedIcon} />
                    <Text style={styles.notWatchedText}>Not Watched</Text>
                  </View>
                )}
              </View>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original${item.poster}`,
                }}
                style={styles.poster}
              />
              <Text style={styles.movieDescription}>{item.description}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => deleteMovie(item)} style={styles.button}>
                  <FontAwesomeIcon icon={faTrash} style={styles.buttonText} />
                  <Text style={styles.buttonText}>Delete Movie</Text>
                </TouchableOpacity>
                {!item.watched && ( // Conditionally render "Mark as Watched" button
                  <TouchableOpacity onPress={() => markAsWatched(item)} style={styles.button}>
                    <FontAwesomeIcon icon={faEye} style={styles.buttonText} />
                    <Text style={styles.buttonText}>Mark as Watched</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  movieContainer: {
    position: 'relative',
    borderBottomColor: 'rgba(20, 20, 20, 3)',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  watchedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notWatchedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  watchedIcon: {
    color: 'rgba(0, 255, 0, 0.4)',
    fontSize: 24,
    marginRight: 4,
  },
  notWatchedIcon: {
    color: 'rgba(255, 0, 0, 0.4)',
    fontSize: 24,
    marginRight: 4,
  },
  watchedText: {
    color: 'rgba(0, 255, 0, 0.4)',
    fontSize: 18,
  },
  notWatchedText: {
    color: 'rgba(255, 0, 0, 0.4)',
    fontSize: 18,
  },
  movieText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  movieDescription: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,

  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'grey',
    marginRight: 4,
    fontSize: 15,
  },
  emptyText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Watchlist;
