import React, { useState, useRef, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import axios from 'axios';

const MovieDetails = ({ route, navigation }) => {
  const { movie } = route.params;
  const [isAdded, setIsAdded] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
    });
  }, [navigation, movie.title]);

  const handlePostRequest = async () => {
    try {
      const apiUrl = 'http://localhost:3000/watchlist';

      const postData = {
        movie_id: movie.id,
        title: movie.original_title,
        description: movie.overview,
        poster: movie.poster_path,
      };

      const response = await axios.post(apiUrl, postData);

      console.log('POST request successful:', response.data);
      setIsAdded(true);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <View style={styles.addContainer}>        
        <TouchableOpacity onPress={handlePostRequest} style={styles.addButtonContainer}>
          {isAdded ? (
            <>
              <FontAwesomeIcon icon={faCheck} style={styles.addIcon} />
              <Text style={styles.addText}>Added</Text>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faPlus} style={styles.addIcon} />
              <Text style={styles.addText}>Add to Watchlist</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
            }}
            style={styles.poster}
            />
      <Text style={styles.overview}>{movie.overview}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgb(28, 33, 39)',
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  addButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addText: {
    color: 'rgba(164,166,168,1)',
    fontSize: 18,
    paddingLeft: 5,
  },
  addIcon: {
    color: 'rgba(164,166,168,1)',
    fontSize: 25,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  overview: {
    marginTop: 8,
    color: 'white',
    fontSize: 16,
  },
  poster: {
    width: '100%', 
    aspectRatio: 2 / 3,
    resizeMode: 'contain',
  },
});

export default MovieDetails;
