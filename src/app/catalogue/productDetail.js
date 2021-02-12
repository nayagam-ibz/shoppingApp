import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Size = ['XXS', 'XS', 'S', 'M', 'L', 'XL'];
const Colors = ['red', 'green', 'yellow', 'orange', 'black', 'blue'];

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxRating: [1, 2, 3, 4, 5],
    };
  }

  _navigate = () => {
    this.props.navigation.navigate('cart');
  };

  render() {
    return (
      <View style={styles._container}>
        <ScrollView>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Image
              style={{width: '100%', height: 340}}
              source={{
                uri:
                  'https://www.pngitem.com/pimgs/m/519-5199934_toms-shoes-target-corporation-gift-clothing-png-transparent.png',
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <View style={{paddingHorizontal: 10}}>
              <View style={[styles._spaceBetween, {paddingVertical: 8}]}>
                <View style={styles._ratingCart}>
                  {this.state.maxRating.map((rating, key) => {
                    return (
                      <View activeOpacity={0.7} key={rating}>
                        <Image
                          source={
                            rating <= 4
                              ? require('../../../assets/images/star_filled.png')
                              : require('../../../assets/images/star_corner.png')
                          }
                          style={styles._ratingStyle}
                        />
                      </View>
                    );
                  })}
                  <Text style={styles._reviewText}> 8 reviews</Text>
                </View>
                <Text style={styles._inStock}>In Stock</Text>
              </View>
              <Text style={styles._itemName}>
                A Stylish Women Open Front Long Sleeve Chunky Knit Cardigant{' '}
              </Text>
              <Text style={styles._itemPrice}>$89.99</Text>
              <View style={{marginTop: 10}}>
                <Text style={styles._styleTitle}>Colors</Text>
                <View style={[styles._sizeView, styles._spaceBetween]}>
                  {Colors &&
                    Colors.map((item) => {
                      return (
                        <TouchableOpacity
                          key={item}
                          style={[
                            styles._styleView,
                            {backgroundColor: item},
                          ]}></TouchableOpacity>
                      );
                    })}
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={styles._styleTitle}>Sizes</Text>
                <View style={[styles._sizeView, styles._spaceBetween]}>
                  {Size &&
                    Size.map((item) => {
                      return (
                        <TouchableOpacity key={item} style={styles._styleView}>
                          <Text style={styles._styleText}>{item}</Text>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              </View>
            </View>
            <View style={styles._vrLine} />
            <View style={{paddingHorizontal: 10, marginBottom: 100}}>
              <View style={styles._productDetails}>
                <Text style={styles._productTitle}>Product Details</Text>
                <Text style={styles._productText}>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without{' '}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles._flexEnd}>
          <View style={styles._spaceBetween}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Categories')}>
              <AntDesign name="arrowleft" size={22} color="#3B2D46" />
            </TouchableOpacity>
            <TouchableOpacity style={styles._cartBtn} onPress={this._navigate}>
              <Text style={styles._cartText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="heart-outlined" size={22} color="#3B2D46" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Cart;

const styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },

  _spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  _ratingCart: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },

  _ratingStyle: {
    width: 12,
    height: 12,
    marginRight: 5,
    resizeMode: 'cover',
  },

  _inStock: {
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    color: 'green',
  },

  _reviewText: {
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    color: '#7a7a7a',
  },

  _itemName: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: '#3B2D46',
  },

  _itemPrice: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 5,
  },

  _flexEnd: {
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    height: 60,
    borderWidth: 1,
    borderColor: '#eee',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },

  _cartBtn: {
    backgroundColor: 'orange',
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 3,
  },

  _cartText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#fff',
  },

  _styleView: {
    borderWidth: 1,
    borderColor: '#ddd',
    width: 45,
    height: 30,
    alignItems: 'center',
    borderRadius: 3,
    paddingVertical: 6,
  },

  _styleText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: '#3B2D46',
  },

  _styleTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#3B2D46',
    marginBottom: 5,
  },

  _productTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: '#3B2D46',
    paddingVertical: 10,
  },

  _productText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#7a7a7a',
    lineHeight: 20,
  },

  _vrLine: {
    backgroundColor: '#ddd',
    height: 5,
    marginTop: 20,
  },
});