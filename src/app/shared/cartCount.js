import React, {Component} from 'react';
import {StyleSheet, ScrollView, Image, TouchableOpacity, Text, View} from 'react-native';
import {connect} from 'react-redux';
import { getCartItems } from '../../app/store/actions/products';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


class SimilarProduct extends Component {
  componentDidMount() {
    this.props.getCartItems()
  }
  render() {
    const {cartList} = this.props;
    console.log(cartList)
    return (
      <View>
       <LinearGradient
            start={{x: 0, y: 0.9}}
            end={{x: 1, y: 0.1}}
            colors={['#3B2D46', '#7B5996']}
            style={styles._cartItems}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Catalogue', {
                  screen: 'Cart',
                })
              }
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="cart-outline"
                size={20}
                style={{marginRight: 5, color: '#fff'}}
              />
              <View>
                <Text style={styles._totalCartPrice}><FontAwesome name="rupee" size={12} color="#fff" /> {''}{cartList && cartList.attributes.itemTotal}</Text>
                <Text style={styles._totalCartPrice}>{cartList && cartList.attributes.itemCount} Items</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {cartList: state.products.cartList};
};

export default connect(mapStateToProps, {getCartItems})(SimilarProduct);

const styles = StyleSheet.create({
  _cartItems: {
    backgroundColor: 'red',
    width: 85,
    paddingVertical: 5,
    marginTop: -30,
    height: 45,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
  },

  _flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  _totalCartPrice: {
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
    fontSize: 12,
  },

  _bottomHeader: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 55,
    borderWidth: 1,
    borderColor: '#eee',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    flex: 2,
  },
});