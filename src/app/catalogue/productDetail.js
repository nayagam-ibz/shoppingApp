import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getProductDetail} from '../../app/store/actions/products';
import {connect} from 'react-redux';
import Styles from '../../../assets/style';
import Loader from '../shared/loader';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxRating: [1, 2, 3, 4, 5],
      loading: true
    };
  }

  componentDidMount() {
    this.props.getProductDetail();
    setTimeout(() => this.setState({loading: false}), 2000);
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
      <SafeAreaView style={Styles._container}>
        <Loader loading={this.state.loading} />
        <ScrollView>
          <View style={{flex: 0.8, backgroundColor: '#fff'}}>
            <Image
              style={{width: '100%', height: 280, resizeMode: 'contain'}}
              source={require('../../../assets/images/img1.png')}
            />
          </View>

          {item && item && (
            <View style={{flex: 1}}>
              <View style={{paddingHorizontal: 10}}>
                <View style={[Styles._spaceBetween, {paddingVertical: 8}]}>
                  <View style={Styles._ratingCart}>
                    {this.state.maxRating.map((rating, key) => {
                      return (
                        <View activeOpacity={0.7} key={rating}>
                          <Image
                            source={
                              rating <= 4
                                ? require('../../../assets/images/star_filled.png')
                                : require('../../../assets/images/star_corner.png')
                            }
                            style={Styles._ratingStyle}
                          />
                        </View>
                      );
                    })}
                    <Text style={Styles._reviewText}> 8 reviews</Text>
                  </View>
                  <Text style={Styles._inStock}>{item.availability}</Text>
                </View>
                <Text style={Styles._itemName}>{item.name}</Text>
                <Text style={Styles._itemPrice}><FontAwesome name="rupee" size={16} color="#7B5996" /> {item.price}</Text>
                <View style={{marginTop: 10}}>
                  <Text style={Styles._styleTitle}>Colors</Text>
                  <View
                    style={[
                      Styles._sizeView,
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
                                Styles._styleView,
                                {backgroundColor: item.color},
                              ]}
                            />
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                </View>
                <View style={{marginTop: 10}}>
                  <Text style={Styles._styleTitle}>Sizes</Text>
                  <View style={[Styles._sizeView, Styles._spaceBetween]}>
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
                            <View style={Styles._styleView}>
                              <Text style={Styles._styleText}>{item.size}</Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                </View>
              </View>
              <View style={Styles._vrLine} />
              <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
                <View style={Styles._productDetails}>
                  <Text style={Styles._productTitle}>Product Details</Text>
                  <View style={Styles._detailRow}>
                    <Text style={Styles._detTitle}>Type</Text>
                    <Text style={Styles._detName}>{item.type}</Text>
                  </View>
                  <View style={Styles._detailRow}>
                    <Text style={Styles._detTitle}>Collection</Text>
                    <Text style={Styles._detName}>{item.collection}</Text>
                  </View>
                  <View style={Styles._detailRow}>
                    <Text style={Styles._detTitle}>Manufacturer</Text>
                    <Text style={Styles._detName}>{item.manufacturer}</Text>
                  </View>
                  <View style={Styles._detailRow}>
                    <Text style={Styles._detTitle}>Brand</Text>
                    <Text style={Styles._detName}>{item.brand}</Text>
                  </View>
                  <View style={Styles._detailRow}>
                    <Text style={Styles._detTitle}>Material</Text>
                    <Text style={Styles._detName}>{item.material}</Text>
                  </View>
                  <View style={Styles._detailRow}>
                    <Text style={Styles._detTitle}>Fit</Text>
                    <Text style={Styles._detName}>{item.fit}</Text>
                  </View>
                  <View style={Styles._detailRow}>
                    <Text style={Styles._detTitle}>Gender</Text>
                    <Text style={Styles._detName}>{item.gender}</Text>
                  </View>
                  <View style={Styles._detailRow}>
                    <Text style={Styles._detTitle}>Model</Text>
                    <Text style={Styles._detName}>{item.model}</Text>
                  </View>
                </View>
              </View>
              <View style={Styles._vrLine} />
              <View
                style={{
                  paddingHorizontal: 10,
                  marginBottom: 100,
                  paddingVertical: 10,
                }}>
                <View style={Styles._productDetails}>
                  <Text style={Styles._productTitle}>Product Description</Text>
                  <Text style={Styles._detDes}>{item.description}</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        <View style={Styles._checkEnd}>
          <View style={Styles._spaceBetween}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Categories')}>
              <AntDesign name="arrowleft" size={22} color="#3B2D46" />
            </TouchableOpacity>
            <TouchableOpacity style={Styles._addToBtn} onPress={this._navigate}>
              <Text style={Styles._cartText}>ADD TO CART</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="heart-outlined" size={22} color="#3B2D46" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {productDetail: state.products.productDetail};
};

export default connect(mapStateToProps, {getProductDetail})(ProductDetail);

