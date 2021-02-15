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
import {getProductDetail} from '../../app/store/actions/products';
import {connect} from 'react-redux';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxRating: [1, 2, 3, 4, 5],
      size: 'XXS',
      color: '#34283E',
    };
  }

  componentDidMount() {
    this.props.getProductDetail();
  }

  _navigate = () => {
    this.props.navigation.navigate('Cart');
  };

  _pickerColor = (res) => {
    console.log(res);
    this.setState({color: res});
  };

  _pickerSize = (res) => {
    console.log(res);
    this.setState({size: res});
  };

  render() {
    const {size, color} = this.state;
    const {productDetail} = this.props;
    const item = productDetail && productDetail;
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

          {item && item && (
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
                  <Text style={styles._inStock}>{item.availability}</Text>
                </View>
                <Text style={styles._itemName}>{item.name}</Text>
                <Text style={styles._itemPrice}>{item.price}</Text>
                <View style={{marginTop: 10}}>
                  <Text style={styles._styleTitle}>Colors</Text>
                  <View
                    style={[
                      styles._sizeView,
                      {flexDirection: 'row', alignItems: 'center'},
                    ]}>
                    {item &&
                      item.colors.map((item, index) => {
                        return (
                          <TouchableOpacity
                            onPress={() => this._pickerColor(item.color)}
                            key={index}
                            style={{
                              borderWidth: 2,
                              marginRight: 8,
                              borderColor:
                                color === item.color ? 'orange' : item.color,
                              borderRadius: 3,
                            }}>
                            <View
                              style={[
                                styles._styleView,
                                {backgroundColor: item.color},
                              ]}
                            />
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                </View>
                <View style={{marginTop: 10}}>
                  <Text style={styles._styleTitle}>Sizes</Text>
                  <View style={[styles._sizeView, styles._spaceBetween]}>
                    {item &&
                      item.sizes.map((item, index) => {
                        return (
                          <TouchableOpacity
                            style={{
                              borderWidth: 1,
                              borderRadius: 3,
                              borderColor:
                                size === item.size ? 'orange' : '#ddd',
                              alignItems: 'center',
                            }}
                            key={index}
                            onPress={() => this._pickerSize(item.size)}>
                            <View style={styles._styleView}>
                              <Text style={styles._styleText}>{item.size}</Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                </View>
              </View>
              <View style={styles._vrLine} />
              <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
                <View style={styles._productDetails}>
                  <Text style={styles._productTitle}>Product Details</Text>
                  <View style={styles._detailRow}>
                    <Text style={styles._detTitle}>Type</Text>
                    <Text style={styles._detName}>{item.type}</Text>
                  </View>
                  <View style={styles._detailRow}>
                    <Text style={styles._detTitle}>Collection</Text>
                    <Text style={styles._detName}>{item.collection}</Text>
                  </View>
                  <View style={styles._detailRow}>
                    <Text style={styles._detTitle}>Manufacturer</Text>
                    <Text style={styles._detName}>{item.manufacturer}</Text>
                  </View>
                  <View style={styles._detailRow}>
                    <Text style={styles._detTitle}>Brand</Text>
                    <Text style={styles._detName}>{item.brand}</Text>
                  </View>
                  <View style={styles._detailRow}>
                    <Text style={styles._detTitle}>Material</Text>
                    <Text style={styles._detName}>{item.material}</Text>
                  </View>
                  <View style={styles._detailRow}>
                    <Text style={styles._detTitle}>Fit</Text>
                    <Text style={styles._detName}>{item.fit}</Text>
                  </View>
                  <View style={styles._detailRow}>
                    <Text style={styles._detTitle}>Gender</Text>
                    <Text style={styles._detName}>{item.gender}</Text>
                  </View>
                  <View style={styles._detailRow}>
                    <Text style={styles._detTitle}>Model</Text>
                    <Text style={styles._detName}>{item.model}</Text>
                  </View>
                </View>
              </View>
              <View style={styles._vrLine} />
              <View
                style={{
                  paddingHorizontal: 10,
                  marginBottom: 100,
                  paddingVertical: 10,
                }}>
                <View style={styles._productDetails}>
                  <Text style={styles._productTitle}>Product Description</Text>
                  <Text style={styles._detDes}>{item.description}</Text>
                </View>
              </View>
            </View>
          )}
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

const mapStateToProps = (state) => {
  return {productDetail: state.products.productDetail};
};

export default connect(mapStateToProps, {getProductDetail})(ProductDetail);

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

  _detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  _detTitle: {
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    marginRight: 10,
    color: '#3B2D46',
    width: 100,
  },

  _detName: {
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    color: '#7a7a7a',
  },

  _detDes: {
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    color: '#7a7a7a',
    lineHeight: 20,
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
    width: 40,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
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