import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from 'react-native';

const MovieList = ({ data }) => {
  const windowWidth = useWindowDimensions().width;
  const numColumns = Math.floor(windowWidth / 350); // Adjust 150 as needed

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <View style={styles.movieItem}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
            }}
            style={styles.poster}
          />
          {/* <Text style={styles.title}>{item.title}</Text> */}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  movieItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // marginBottom: 20,
    padding: 10,
  },
  poster: {
    width: '100%', // Occupies the full width of the column
    aspectRatio: 2 / 3, // Adjust the aspect ratio as needed
    resizeMode: 'contain',
    // shadowColor: 'rgba(20, 20, 20, 3)',
    // shadowOffset: {width: 2.5, height: 3},
    // shadowOpacity: 1,
    // shadowRadius: 0,
    // marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MovieList;
