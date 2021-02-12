import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

class CatalogList extends Component {
  render() {
    return (
      <View style={styles._catalogue}>
        <View style={[styles._spaceBetween, {paddingVertical: 10}]}>
          <Text style={styles._itemTitle}>Catalogue</Text>
          <TouchableOpacity
            style={styles._flexRow}
            onPress={() => this.props.navigation_toggle()}>
            <Text style={styles._seeAllText}>See All</Text>
            <Entypo name="chevron-small-right" size={20} color="#7a7a7a" />
          </TouchableOpacity>
        </View>
        <View style={styles._spaceBetween}>
          <View style={styles._catalogWidget}>
            <ImageBackground
              source={require('../../../assets/images/ca.jpeg')}
              style={styles._bg_image}
              imageStyle={{borderRadius: 5}}>
              <View style={styles.overlay} />
              <View>
                <Text style={styles._catalogText}>Womans's Fashion</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles._catalogWidget}>
            <ImageBackground
              source={require('../../../assets/images/img2.png')}
              style={styles._bg_image}
              imageStyle={{borderRadius: 5}}>
              <View style={styles.overlay} />
              <View>
                <Text style={styles._catalogText}>Mens's Fashion</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles._catalogWidget}>
            <ImageBackground
              source={require('../../../assets/images/kids.png')}
              style={styles._bg_image}
              imageStyle={{borderRadius: 5}}>
              <View style={styles.overlay} />
              <View>
                <Text style={styles._catalogText}>Kid’s fashion</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles._catalogWidget}>
            <ImageBackground
              source={require('../../../assets/images/ca.jpeg')}
              style={styles._bg_image}
              imageStyle={{borderRadius: 5}}>
              <View style={styles.overlay} />
              <View>
                <Text style={styles._catalogText}>Cosmetics</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }
}

export default CatalogList;

const styles = StyleSheet.create({
  _flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  _spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  _seeAllText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#7a7a7a',
  },

  _itemTitle: {
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
  },

  _catalogue: {
    paddingHorizontal: 10,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#3C2E48',
    opacity: 0.5,
    borderRadius: 5,
  },

  _catalogWidget: {
    width: 75,
    height: 70,
  },

  _bg_image: {
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    flex: 0.9,
  },

  _catalogText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
});