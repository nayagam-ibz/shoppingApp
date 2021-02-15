import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

function DrawerContent(props) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={{paddingHorizontal: 20, paddingVertical: 40}}>
            <Text style={styles._userName}>Oleh Chabanov</Text>
            <Text style={styles._userCaption}>+38 (099) 123 45 67</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Home');
              }}
              style={styles._drawerRow}>
              <MaterialCommunityIcons
                name="home"
                size={20}
                color="#7B5996"
                style={styles._drawerIcons}
              />
              <Text style={styles._drwerTitle}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Myorders');
              }}
              style={styles._drawerRow}>
              <MaterialCommunityIcons
                name="truck-fast-outline"
                size={20}
                color="#7B5996"
                style={styles._drawerIcons}
              />
              <Text style={styles._drwerTitle}>My Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Catalogue');
              }}
              style={styles._drawerRow}>
              <Ionicons
                name="layers-outline"
                size={20}
                color="#7B5996"
                style={styles._drawerIcons}
              />
              <Text style={styles._drwerTitle}>Catalogue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Favourite');
              }}
              style={styles._drawerRow}>
              <Entypo
                name="heart-outlined"
                size={20}
                color="#7B5996"
                style={styles._drawerIcons}
              />
              <Text style={styles._drwerTitle}>My Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Account');
              }}
              style={styles._drawerRow}>
              <MaterialCommunityIcons
                name="account"
                size={20}
                color="#7B5996"
                style={styles._drawerIcons}
              />
              <Text style={styles._drwerTitle}>My Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Home');
              }}
              style={styles._drawerRow}>
              <Feather
                name="log-out"
                size={20}
                color="#7B5996"
                style={styles._drawerIcons}
              />
              <Text style={styles._drwerTitle}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  _userName: {
    fontSize: 16,
    marginTop: 3,
    fontFamily: 'Montserrat-Medium',
    color: '#222',
  },
  _userCaption: {
    fontSize: 12,
    marginTop: 5,
    color: '#222',
    fontFamily: 'Montserrat-Medium',
  },

  _drawerRow: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  _drwerTitle: {
    fontSize: 13,
    color: '#222',
    fontFamily: 'Montserrat-Medium',
  },

  _drawerIcons: {
    width: 40,
  },
});