import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MovieList = ({ data }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      // numColumns={numColumns}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.movieItem}
          onPress={() => {
            navigation.navigate('MovieDetails', { movie: item });
          }}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
            }}
            style={styles.poster}
          />
        </TouchableOpacity>
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
    width: '100%', 
    aspectRatio: 2 / 3, 
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MovieList;
