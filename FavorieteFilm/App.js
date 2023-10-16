import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Dimensions } from 'react-native';
import axios from 'axios';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MovieList from './MovieList';
import WatchList from './WatchList';
import Menu from './Menu';
import MovieDetails from './MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons'; 

const Stack = createStackNavigator();

const App = () => {
  const [randomMovies, setRandomMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = useNavigation();

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
      console.log(response.data.results)
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
  };

  const goToMovieDetails = (movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  return (
    <SafeAreaView style={styles.container} scrollEnabled={isMenuOpen} nestedScrollEnabled={isMenuOpen}>
      <View style={styles.header}>
        <View style={{ flex: 1}}>
          <SearchBar
            // style={styles.shadow}
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
        />
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MovieList data={movies} onMoviePress={goToMovieDetails} />
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
    marginBottom: 10,
  },
  searchBarContainer: {
    backgroundColor: 'transparent', 
    borderBottomColor: 'transparent', 
    borderTopColor: 'transparent'
  },
  searchBarInputContainer: {
    shadowColor: 'white',
    shadowOffset: {width: 2.5, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 5, 
    backgroundColor : "black",
    borderBottomColor: 'transparent', 
    borderTopColor: 'transparent', 
    borderRadius: 20, 
    height: 40 
  },
  menuIcon: {
    padding: 10,
  },
});

export default () => {
  return (
    <NavigationContainer theme={{ colors: { background: 'rgba(0, 3, 20, 8)' } }}>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgba(0, 3, 20, 8)', 
            borderBottomColor: 'rgba(20, 20, 20, 3)',
            borderBottomWidth: 2,
            // position: 'absolute',
            // top: Dimensions.get('window').height - 60,
            // left: 0,
            // right: 0,
          },
          headerTintColor: 'white', 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        >
        <Stack.Screen name="Home" component={App} options={{ headerShown: false, ...TransitionPresets.FadeFromBottomAndroid }}/>
        <Stack.Screen name="MovieDetails" component={MovieDetails} options={{ ...TransitionPresets.FadeFromBottomAndroid }}/>
        <Stack.Screen name="WatchList" component={WatchList} options={{ ...TransitionPresets.FadeFromBottomAndroid }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};