import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewComponent, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { useNavigation } from '@react-navigation/native';

const Menu = ({ isVisible, onClose, onGoToWatchlist, onGoToWatched}) => {
  if (!isVisible) {
    return null; 
  }
  const navigation = useNavigation();
  const navigateToWatchlist = () => {
    navigation.navigate('WatchList');
    onClose();
  };

  return (
    <ScrollView style={styles.menu} scrollEnabled={false}>
      <View style={styles.menuContainer}>
      <View style={styles.menuItemContainer}>
        <TouchableOpacity onPress={navigateToWatchlist} style={styles.menuItem}>
          <Text style={styles.menuText}>Watchlist</Text>
          <FontAwesomeIcon icon={faList} style={styles.menuText}/>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItemContainer}>
        <TouchableOpacity onPress={onGoToWatched} style={styles.menuItem}>
          <Text style={styles.menuText}>Profile</Text>
          <FontAwesomeIcon icon={faUser} style={styles.menuText}/>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 115, // Adjust the top position as needed
    left: 0, // Adjust the right position as needed
    width: '100%', // Adjust the width as needed
    height: '100%', // Adjust the width as needed
    backgroundColor: 'rgba(0, 3, 20, 8)',
    borderRadius: 10,
    padding: 10,
    zIndex: 1, // Ensure the menu is above other content
  },
  menuContainer: {
    marginTop: 30,
  },
  menuItemContainer: {
    borderBottomColor: 'rgba(20, 20, 20, 3)',
    borderBottomWidth: 2,
    marginBottom: 30, // Adjust Distance Between Items
    width: '70%',
    left: '15%',
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 5, // Adjust Distance Between Border And Item
  },
  menuText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Menu;
