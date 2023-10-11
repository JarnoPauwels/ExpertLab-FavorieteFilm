import React, { useState, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { withNavigation } from 'react-navigation'; 

const MovieDetails = ({ route, navigation }) => {
  const { movie } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
    });
  }, [navigation, movie.title]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      {/* <TouchableOpacity onPress={}>
        <Text style={styles.overview}>Add to Watchlist</Text>
      </TouchableOpacity> */}
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
    backgroundColor: 'rgba(0, 3, 20, 8)',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  overview: {
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
