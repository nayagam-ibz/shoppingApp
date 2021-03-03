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
import {FlatListSlider} from 'react-native-flatlist-slider';
import Preview from '../shared/preview' 
import ShareOptions from '../shared/shareOptions' 

const images = [
   {
    image:'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2414313/2018/3/13/11520926368526-HERENOW-Men-Red--Black-Regular-Fit-Checked-Casual-Shirt-8881520926368447-1.jpg',
   },

   {
    image:'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2414313/2018/3/13/11520926368507-HERENOW-Men-Red--Black-Regular-Fit-Checked-Casual-Shirt-8881520926368447-2.jpg',
   },

   {
    image:'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2414313/2018/3/13/11520926368495-HERENOW-Men-Red--Black-Regular-Fit-Checked-Casual-Shirt-8881520926368447-3.jpg',
   },
  {
    image:'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2414313/2018/3/13/11520926368483-HERENOW-Men-Red--Black-Regular-Fit-Checked-Casual-Shirt-8881520926368447-4.jpg',
  },
  ]


class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxRating: [1, 2, 3, 4, 5],
      loading: true
    };
  }

  componentDidMount() {
    const { id } = this.props.route.params;
    console.log(id)
    this.props.getProductDetail(id).then((data) => {
       this.setState({loading: false})
    });
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
    const {productDetail, route} = this.props;
    const { navigation } = route.params;
    const item = productDetail && productDetail.attributes
    console.log(item)
    const value = 0
    return (
      <SafeAreaView style={Styles._container}>
        <Loader loading={this.state.loading} />
        <ScrollView>
          <View style={{marginBottom: 10}}>
            <FlatListSlider
              data={images}
              component={<Preview />}
              autoscroll={false}
              indicatorContainerStyle={{position:'absolute', bottom: 20}}
            />

            <View style={{position:'absolute', left: 10, top: 15}}>
              <TouchableOpacity
                style={Styles.shareBtn}
                onPress={() => this.props.navigation.navigate(navigation)}>
                <AntDesign name="arrowleft" size={22} color="#3B2D46" />
              </TouchableOpacity>
            </View> 
            <View style={{position:'absolute', right: 3, top: 15}}>
              <ShareOptions itemObject={item && item}/>
            </View> 
          </View>
          <View style={{flex: 1}}>
            <View style={{paddingHorizontal: 10}}>
              <Text style={Styles._itemName}>{item && item.name}</Text>
              <View style={Styles._rowView}>
                <FontAwesome
                  name="rupee"
                  size={14}
                  color="#333"
                  style={{marginTop: 3, marginRight: 2}}
                />
                <Text style={Styles._itemPrice}>
                  {item && item.price ? item && item.price : value.toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={Styles._vrLine} />
            <View style={{paddingHorizontal: 10,marginBottom: 100,}}>
              <View style={Styles._productDetails}>
                <Text style={Styles._productTitle}>PRODUCT DESCRIPTION</Text>
                <Text style={Styles._detDes}>{item && item.description}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={Styles._checkEnd}>
          <View style={Styles._spaceBetween}>
            <TouchableOpacity style={[Styles._addToBtn,{width: '49%'}]} onPress={this._navigate}>
              <Text  style={[Styles._btnText, {color:'#333'}]}>ADD TO CART</Text>
            </TouchableOpacity>
           <TouchableOpacity style={[Styles._bynowBtn ,{width: '49%'}]} onPress={this._navigate}>
              <Text style={Styles._btnText}>BUY NOW</Text>
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

