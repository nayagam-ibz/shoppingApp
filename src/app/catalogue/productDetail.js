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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getProductDetail} from '../../app/store/actions/products';
import {connect} from 'react-redux';
import Styles from '../../../assets/style';
import Loader from '../shared/loader';
import {FlatListSlider} from 'react-native-flatlist-slider';
import PreviewSlider from '../shared/previewSlider' 
import ShareOptions from '../shared/shareOptions' 
import SimilarProduct from '../shared/similarProduct'
import ProductDetailFilter from '../shared/productDetailFilter'


const  details = ['Type', 'Collection', 'Manufacturer', 'Brand', 'Material', 'Fit', 'Gender', 'Model'];

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
  state = {loading: true}

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      const { id } = this.props.route.params;
      this.props.getProductDetail(id).then((data) => {
        this.setState({loading: false})
      })
    })
  }

  componentWillUnmount() {
    if (this.focusListener != null && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }

  _navigate = () => {
    this.props.navigation.navigate('Cart');
  };

  render() {
    const {productDetail, route} = this.props;
    const { navigation } = route.params;
    const productFilter = productDetail && productDetail.optionTypes;
    const value = 0
    return (
      <SafeAreaView style={Styles._container}>
        <Loader loading={this.state.loading} />
        {productDetail && (
          <View>
            <ScrollView>
              <View>
                <View style={{marginBottom: 10}}>
                  <FlatListSlider
                    data={images}
                    component={<PreviewSlider />}
                    autoscroll={false}
                    indicatorActiveWidth={9}
                    indicatorActiveColor="orange"
                    indicatorStyle={{width:9, height:9, borderRadius: 20}}
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
                    <ShareOptions itemObject={productDetail && productDetail}/>
                  </View> 
                </View>
                <View style={Styles._pdhorizontal10}>
                  <Text style={[Styles._itemName, {fontSize: 16}]}>{productDetail.name}</Text>
                  <View style={Styles._spaceBetween}>
                    <View style={[Styles._rowView, {paddingVertical: 8}]}>
                      <MaterialCommunityIcons name="currency-inr" size={14} color='#333' style={{marginLeft: -4}}/>
                      <Text style={[Styles._itemPrice, {fontSize: 16}]}>
                        {productDetail.price ? productDetail.price : value.toFixed(2)}
                      </Text>
                    </View>
                    <View style={Styles._rowView}>
                      <Text style={[Styles._inStock, {color: '#7a7a7a'}]}>AVAILABILITY : </Text>
                      <Text style={Styles._inStock}>{productDetail.availability}</Text>
                    </View>
                  </View> 
                </View>
                <View style={Styles._vrLine} />
                  <ProductDetailFilter productFilter={productFilter}/>
                <View style={Styles._vrLine} />
                <View style={Styles._pdhorizontal10}>
                  <Text style={Styles._itemTitle}>Product Details</Text>
                  {productDetail.productProperties && productDetail.productProperties.map((item, index) => {
                    let title = details[index] 
                    return(
                      <View style={Styles._detailRow} key={index}>
                        <Text style={Styles._detTitle}>{title}</Text>
                        <Text style={Styles._detName}>{item.value}</Text>
                      </View>
                      )
                    })
                  }
                </View> 
                <View style={Styles._vrLine} /> 
                <View style={Styles._pdhorizontal10}>
                  <Text style={Styles._itemTitle}>PRODUCT DESCRIPTION</Text>
                  <Text style={Styles._detDes}>{productDetail.description}</Text>
                </View>
                <View style={Styles._vrLine} />
                <View style={{paddingVertical: 10, paddingLeft:10, marginBottom: 50}}>
                  <Text style={Styles._itemTitle}>YOU MAY ALSO LIKE</Text>
                  <SimilarProduct />
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
          </View>  
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {productDetail: state.products.productDetail};
};

export default connect(mapStateToProps, {getProductDetail})(ProductDetail);

