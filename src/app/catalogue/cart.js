
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getCartItems } from '../../app/store/actions/products';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Authentication from '../shared/authentication'; 
import RBSheet from 'react-native-raw-bottom-sheet';
import StepIndicator from '../shared/stepIndicator';
import CustomHeader from '../header/header';
import Styles from '../../../assets/style';
import Loader from '../shared/loader';
import { connect } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, step1: true, listCartItems: null };
  }

  componentDidMount() {
    this.props.getCartItems().then((data) => {
      const cartItems = data.payload.data.data.attributes.line_items
      this.setState({listCartItems: cartItems, loading: false})
    })
  }

   backNavigation = (id) => {
    this.props.navigation.navigate('ProductDetail', {
      params: {id: id},
    });
  }

  _plusQty = (id) => {
    const cartItemsArray =  this.state.listCartItems
     let array = cartItemsArray.map((item) => {
       if(id === item.id) {
         item.quantity = item.quantity + 1 
       }
      return{...item}
     })
   this.setState({listCartItems: array})
  };


  _minusQty(id, min_qty) {
    let qty = min_qty;
    if (qty > 0) {
      const cartItemsArray =  this.state.listCartItems
       let array = cartItemsArray.map((item) => {
         if(id === item.id) {
          item.quantity = item.quantity - 1 
         }
        return{...item}
       })
      this.setState({listCartItems: array})
    }
  }

  render() {
    const {listCartItems} = this.state
    const id = this.props.route.params?.id ?? '';
     return (
      <SafeAreaView style={Styles._container}>
        <Loader loading={this.state.loading} />
        <View style={[Styles._headerGradient, Styles._flexRow,  {height: 45, backgroundColor:'#3B2D46'}]}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => this.backNavigation(id)}>
              <Entypo name="chevron-small-left" size={35} color="#fff" style={{marginLeft: -10}}/>
            </TouchableOpacity>
          </View>
          <View style={{flex: 5}}>
            <Text style={[Styles._subTitleApp,{color: '#fff'}]}>ADDRESS</Text>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <ScrollView>
          <StepIndicator step1={this.state.step1}/>
          <View style={Styles._productList}>
            <FlatList
              data={ listCartItems && listCartItems}
              keyExtractor={(item, index) => item.id}
              renderItem={({item}) => (
                <View style={{paddingHorizontal: 10, backgroundColor:'#fff', marginBottom: 5}}>
                  <View style={{paddingVertical: 12, flexDirection:'row'}}>
                    <View style={{width: 120, height: 150}}>
                      {item.product.images && item.product.images.length > 0 ? 
                        [item.product.images[11]].map((item, index) => {
                          return(
                            <View key={index}>
                              <Image source={{uri: item.url}} style={{ backgroundColor:'#ddd', borderRadius: 3,  width: windowWidth * 0.33,height: windowHeight * 0.22}} /> 
                            </View>
                          )
                        }) 
                        : 
                        <Image
                          source={require('../../../assets/images/unknow-image.png')}
                          style={{ backgroundColor:'#ddd', borderRadius: 3,  width: windowWidth * 0.33,height: windowHeight * 0.22}}
                        /> 
                      }
                    </View>
                    <View style={{marginLeft:8, width:'65%'}}>
                      <Text style={[Styles._itemName, {height: 40}]}>{item.product.name}</Text>
                      <View>
                        <View style={Styles._cartAttirubute}>
                          <Text style={Styles._optionTypes}>COLOR : </Text>
                          <View style={{marginLeft: 10}}> 
                            { item.variant.option_values.map((item, index) => {
                                if(item.option_type.name === "color"){
                                  return(
                                   <Text key={index} style={Styles._variationValues}>{item.name}</Text>
                                  )
                                }
                              })
                            }
                          </View>  
                        </View>

                        <View style={Styles._cartAttirubute}>
                          <Text style={Styles._optionTypes}>SIZE : </Text>
                          <View style={{marginLeft: 10}}>  
                            { item.variant.option_values.map((item, index) => {
                                if(item.option_type.name === "size"){
                                  return(
                                    <Text  key={index} style={Styles._variationValues}>{item.name}</Text>
                                  )
                                }
                              })
                            }
                          </View>  
                        </View>
                      </View>
                      <Text style={[Styles._itemPrice, {fontSize: 15, paddingVertical: 10, marginBottom: 4, marginLeft: -3}]}>
                       <MaterialCommunityIcons name="currency-inr" size={15} color='#333'/>
                        {item.price}
                      </Text>
                      <View style={Styles._spaceBetween}>
                        <View style={Styles._counterView}>
                          <TouchableOpacity onPress={() => this._minusQty(item.id, item.quantity)} style={Styles._addItems}>
                            <AntDesign name="minus" size={12} color="#333" />
                          </TouchableOpacity>
                          <View style={Styles._addCounter}>
                            <Text>{item.quantity}</Text>
                          </View>
                          <TouchableOpacity style={Styles._addItems} onPress={() => this._plusQty(item.id)}>
                            <AntDesign name="plus" size={12} color="#333" />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{marginRight: 10}}>
                          <MaterialCommunityIcons
                            name="delete-variant"
                            size={22}
                            color="red"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>  
                </View>  
              )}
            />
          </View>
        </ScrollView>
        <View style={[Styles._checkEnd, {height: 80}]}>
          <Text style={Styles._orerCount}>{listCartItems && listCartItems.length } Items selected for order</Text> 
          <TouchableOpacity style={[Styles._addToBtn,{width: '100%', backgroundColor:'orange'}]} onPress={() => this.props.navigation.navigate('ShippingAddress')}>
            <Text  style={[Styles._btnText, {color:'#fff'}]}> PLACE ORDER</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {cartList: state.products.cartList};
};

export default connect(mapStateToProps, {getCartItems})(Cart);