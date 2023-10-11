import React from 'react';
import { View, Text, FlatList } from 'react-native';

const Watchlist = ({ watchlist }) => {
  return (
    <View>
      <Text>Watchlist</Text>
      <FlatList
        data={watchlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            {/* Render movie details here */}
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Watchlist;
