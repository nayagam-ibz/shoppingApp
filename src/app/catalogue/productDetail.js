import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';
import { getProductDetail, addToCart, CurrentUser} from '../../app/store/actions/products';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductDetailFilter from '../shared/productDetailFilter'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FlatListSlider} from 'react-native-flatlist-slider';
import Entypo from 'react-native-vector-icons/Entypo';
import SimilarProduct from '../shared/similarProduct';
import Authentication from '../shared/authentication'; 
import RBSheet from 'react-native-raw-bottom-sheet';
import PreviewSlider from '../shared/previewSlider'; 
import ShareOptions from '../shared/shareOptions'; 
import Styles from '../../../assets/style';
import Loader from '../shared/loader';
import { connect} from 'react-redux';

const  details = ['Type', 'Collection', 'Manufacturer', 'Brand', 'Material', 'Fit', 'Gender', 'Model'];
const win = Dimensions.get('window');

class ProductDetail extends React.Component {
  state = {loading: false}
  componentDidMount () {
    this.unsubscribe= this.props.navigation.addListener('focus', () => {
      this.setState({loading: true})
      const { id } = this.props.route.params;
      this.props.getProductDetail(id).then((data) => {
        if(data.payload.data.status === "ok") {
          this.setState({loading: false})
        }
      })
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  _addCartItems = (id) => {
    return CurrentUser().then((token) => {
      if (!token) {
        this.RBSheet.open();
        return;
      }else {
        this.props.addToCart(id.id).then((data) => {
          this.props.navigation.navigate('Cart', {id: id.id});
        })
      }
    })
  }

  sheetClose = (res) => {
    this.RBSheet.close();
  } 

  render() {
    const {productDetail, route} = this.props;
    const { navigation } = route.params;
    const productFilter = productDetail && productDetail.optionTypes;
    const varientId = productDetail && productDetail.variants.find(data => data.id)
    const value = 0
    return (
      <SafeAreaView style={Styles._container}>
        <Loader loading={this.state.loading} />
        {productDetail && (
          <View>
            <ScrollView>
              <View>
                <View style={{marginBottom: 10}}>
                    {productDetail.images.length > 0 
                      ?
                        <FlatListSlider
                          data={productDetail.images }
                          component={<PreviewSlider />}
                          autoscroll={false}
                          imageKey={'url'}
                          indicatorActiveWidth={9}
                          indicatorActiveColor="orange"
                          indicatorStyle={{width:9, height:9, borderRadius: 20}}
                          indicatorContainerStyle={{position:'absolute', bottom: 20}}
                        />
                      :
                      <View style={{flex: 1, backgroundColor:'#eee'}}> 
                        <Image
                          style={{
                            width: win.width/1,
                            height: 450,
                            resizeMode: "contain",
                            alignSelf: "center",
                            borderWidth: 1,
                            borderRadius: 20,
                          }}
                          source={require('../../../assets/images/unknow-image.png')}
                          resizeMode="cover"
                        /> 
                      </View>   
                    }
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
              <TouchableOpacity style={[Styles._addToBtn,{width: '100%', backgroundColor:'orange'}]} onPress={() => this._addCartItems(varientId)}>
                <Text  style={[Styles._btnText, {color:'#fff'}]}>ADD TO CART</Text>
              </TouchableOpacity>
            </View>
          </View>  
        )}

        <RBSheet ref={(ref) => {this.RBSheet = ref;}}
          height={400}
          openDuration={300} closeOnPressMask={true} closeOnDragDown={true}
          customStyles={{
            wrapper: {backgroundColor: 'rgba(0,0,0,.7)'},
            draggableIcon: {backgroundColor: '#fff'},
          }}>
          <Authentication sheetClose={this.sheetClose}/>
        </RBSheet>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {productDetail: state.products.productDetail};
};

export default connect(mapStateToProps, {getProductDetail, addToCart})(ProductDetail);

