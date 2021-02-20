import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';

class DrawerContent extends Component {
  render() {
    const {initialData} = this.props;
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView>
          <View style={styles.drawerContent}>
            <View style={{paddingHorizontal: 20, paddingVertical: 40}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: initialData && initialData.url}}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: '#eee',
                  }}
                />
                <View style={{marginLeft: 15, flexDirection: 'column'}}>
                  <Text style={styles._userName}>
                    {initialData && initialData.name}
                  </Text>
                  <Text style={styles._userCaption}>
                    {initialData && initialData.email}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Home');
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
                onPress={() => this.props.navigation.navigate('Account',{screen: 'Myorders',})}
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
                  this.props.navigation.navigate('Catalogue');
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
                  this.props.navigation.navigate('Favourite');
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
                  this.props.navigation.navigate('Account');
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
                  this.props.navigation.navigate('Home');
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
}

const mapStateToProps = (state) => {
  return {
    initialData: state.products.initialData,
  };
};

export default connect(mapStateToProps, {})(DrawerContent);

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