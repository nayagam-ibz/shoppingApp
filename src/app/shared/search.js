import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

class Search extends Component {
  render() {
    return (
      <View style={styles._searchView}>
        <EvilIcons
          name="search"
          color="#7a7a7a"
          size={25}
          style={styles._searchIcon}
        />
        <TextInput
          style={styles._searchStyle}
          autoCorrect={false}
          placeholder="What are you looking for?"
        />
      </View>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  _searchView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    elevation: 2,
  },

  _searchStyle: {
    flex: 1,
    backgroundColor: '#fff',
    height: 38,
    borderRadius: 40,
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-Medium',
    paddingLeft: 35,
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },

  _searchIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 15,
  },
});