import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import MovieList from './MovieList';
import Menu from './Menu';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

const App = () => {
  const [randomMovies, setRandomMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to fetch random movies from TMDb API
  const fetchRandomMovies = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular',
        {
          params: {
            api_key: '6c8d50afeac2bf001a563ef891496f00',
          },
        }
      );
      setRandomMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching random movies:', error);
    }
  };

  // Function to fetch movies based on search query
  const searchMovies = async (query) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/search/movie',
        {
          params: {
            api_key: '6c8d50afeac2bf001a563ef891496f00',
            query,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
    setIsLoading(false);
  };

  // Use useEffect to fetch random movies when the component mounts
  useEffect(() => {
    fetchRandomMovies();
  }, []);

  // Use useEffect to trigger searchMovies when searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      searchMovies(searchQuery);
    } else {
      // If searchQuery is empty, show random movies
      setMovies(randomMovies);
    }
  }, [searchQuery, randomMovies]);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Implement your menu opening/closing logic here
  };

  const goToWatchlist = () => {
    // Implement navigation logic to Watchlist
    // You can use React Navigation or your preferred navigation library.
  };

  // Function to navigate to Watched
  const goToWatched = () => {
    // Implement navigation logic to Watched
    // You can use React Navigation or your preferred navigation library.
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <SearchBar
            placeholder="Search for movies..."
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
            onSubmitEditing={() => searchMovies(searchQuery)}
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
            inputStyle={{ backgroundColor: 'transparent', color: 'white' }}
            searchIcon={{ size: 24, color: 'rgb(169, 169, 169)' }}
            clearIcon={{ size: 24, color: 'white' }}
          />
        </View>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuIcon}>
          <Icon name={isMenuOpen ? 'close-outline' : 'menu-outline'} size={35} color="white" />
        </TouchableOpacity>
      </View>
      {isMenuOpen && (
        <Menu
          isVisible={isMenuOpen}
          onClose={toggleMenu}
          onGoToWatchlist={goToWatchlist}
          onGoToWatched={goToWatched}
        />
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MovieList data={movies} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 50,
    marginTop: 0,
    backgroundColor: 'rgba(0, 3, 20, 8)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  searchBarContainer: {
    backgroundColor: 'transparent', 
    borderBottomColor: 'transparent', 
    borderTopColor: 'transparent'
  },
  searchBarInputContainer: {
    backgroundColor: 'black', 
    borderBottomColor: 'transparent', 
    borderTopColor: 'transparent', 
    shadowColor: 'rgba(10, 10, 10, 3)',
    shadowOffset: {width: 2.5, height: 3},
    shadowOpacity: 1,
    shadowRadius: 0,
    borderRadius: 20, 
    height: 40 
  },
  menuIcon: {
    padding: 10,
  },
});

export default App;
