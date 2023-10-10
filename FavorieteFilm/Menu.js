// import React, { useState } from 'react';
// import { View, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const Menu = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     // Implement your menu opening/closing logic here
//   };

//   return (
//     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
//       <TouchableOpacity onPress={toggleMenu}>
//         <Icon name={isMenuOpen ? 'close-outline' : 'menu-outline'} size={30} color="black" />
//       </TouchableOpacity>
//       {/* Other content in the header */}
//     </View>
//   );
// };

// export default Menu;

// Menu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = ({ isVisible, onClose, onGoToWatchlist, onGoToWatched }) => {
  if (!isVisible) {
    return null; // Don't render anything if not visible
  }

  return (
    <View style={styles.menu}>
      <TouchableOpacity onPress={onGoToWatchlist} style={styles.menuItem}>
        <Text style={styles.menuText}>Go to Watchlist</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onGoToWatched} style={styles.menuItem}>
        <Text style={styles.menuText}>Go to Watched</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text>Close</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 110, // Adjust the top position as needed
    left: 0, // Adjust the right position as needed
    width: '100%', // Adjust the width as needed
    height: '100%', // Adjust the width as needed
    backgroundColor: 'rgba(0, 3, 20, 8)',
    borderRadius: 10,
    padding: 10,
    zIndex: 1, // Ensure the menu is above other content
  },
  menuItem: {
    padding: 10,
    alignItems: 'center',
    // borderBottomColor: 'rgba(10, 10, 10, 3)',
    borderBottomColor: 'white',
    // color: 'white',
  },
  menuText: {
    color: 'white',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
});

export default Menu;
