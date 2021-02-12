import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../header/header';
import AddItem from '../shared/addItem';
import {getCart} from '../../app/store/actions/products';
import {connect} from 'react-redux';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxRating: [1, 2, 3, 4, 5],
    };
  }

  componentDidMount() {
    this.props.getCart();
  }

  _navigate = () => {
    this.props.navigation.navigate('checkout');
  };

  render() {
    const {cartList} = this.props;
    console.log(cartList);
    return (
      <View style={styles._container}>
        <CustomHeader
          navigation={this.props.navigation}
          isHeader="Cart"
          isBack="isBack"
          name="ProductDetail"
        />
        <ScrollView>
          <View style={styles._productList}>
            <FlatList
              data={cartList && cartList}
              keyExtractor={(item, index) => item.id}
              contentContainerStyle={styles.container}
              renderItem={({item}) => (
                <View
                  style={[
                    styles._spaceBetween,
                    {
                      backgroundColor: '#fff',
                      marginBottom: 2,
                      alignItems: 'center',
                      paddingHorizontal: 10,
                    },
                  ]}>
                  <View style={[styles._imageView, {flex: 0.5}]}>
                    <Image
                      source={require('../../../assets/images/women.jpg')}
                      resizeMode="stretch"
                      style={styles._productImage}
                    />
                  </View>
                  <View style={{flex: 2}}>
                    <View style={{paddingHorizontal: 4}}>
                      <Text style={styles._productName}>
                        A Stylish Women Open Front Long Sleeve Chunky Knit
                        Cardigant
                      </Text>
                      <Text style={styles._itemPrice}>$89.99</Text>
                    </View>
                  </View>
                  <View style={{flex: 0.2}}>
                    <View style={{paddingHorizontal: 5}}>
                      <AddItem />
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
        <View style={styles._flexEnd}>
          <View style={[styles._spaceBetween, {paddingVertical: 12}]}>
            <Text style={styles._pricText}>Total Price</Text>
            <Text style={styles._pricText}>$239.98</Text>
          </View>
          <TouchableOpacity style={styles._cartBtn} onPress={this._navigate}>
            <Text style={[styles._cartText, {textAlign: 'center'}]}>
              Check Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {cartList: state.products.cartList};
};

export default connect(mapStateToProps, {getCart})(Cart);

const styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },

  _spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  _productList: {
    paddingVertical: 2,
  },

  _flexEnd: {
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    height: 100,
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
    marginBottom: 15,
  },

  _itemPrice: {
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 5,
  },

  _pricText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#3B2D46',
  },

  _cartText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#fff',
  },

  _productName: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 11,
    lineHeight: 20,
    marginBottom: 3,
  },

  _imageView: {
    width: 100,
    height: 100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  _productImage: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});