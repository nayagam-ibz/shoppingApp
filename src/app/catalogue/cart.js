import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../header/header';
import AddItem from '../shared/addItem';
import {getCart} from '../../app/store/actions/products';
import {connect} from 'react-redux';
import Styles from '../../../assets/style';
import Loader from '../shared/loader';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxRating: [1, 2, 3, 4, 5],
      loading: false,
    };
  }

  componentDidMount() {
    this.props.getCart();
    setTimeout(() => this.setState({loading: false}), 2000);
  }

  _navigate = () => {
    this.props.navigation.navigate('Checkout');
  };

  render() {
    const {cartList} = this.props;
    return (
      <SafeAreaView style={Styles._container}>
        <Loader loading={this.state.loading} />
        <CustomHeader
          navigation={this.props.navigation}
          isHeader="Cart"
          isBack="isBack"
          name="ProductDetail"
        />
        <ScrollView>
          <View style={Styles._productList}>
            <FlatList
              data={cartList && cartList}
              keyExtractor={(item, index) => index}
              contentContainerStyle={Styles.container}
              renderItem={({item}) => (
                <View style={Styles._cartView}>
                  <Image
                    source={require('../../../assets/images/women.jpg')}
                    resizeMode="stretch"
                    style={Styles._productImage}
                  />
                  <View style={{marginLeft:8, flex: 1}}>
                    <View style={Styles._cartRow}>
                      <Text style={Styles._itemName}>{item.name} </Text>
                    </View>
                    <Text style={Styles._cartAttirubute}>
                      <Text style={{color: '#7a7a7a'}}>COLOR : </Text>{' '}
                      {item.size}{' '}
                    </Text>
                    <Text style={Styles._cartAttirubute}>
                      <Text style={{color: '#7a7a7a'}}>SIZE :</Text>{' '}
                      {item.color}{' '}
                    </Text>
                    <View style={[Styles._spaceBetween, {paddingVertical: 10}]}>
                      <Text style={[Styles._itemPrice, {fontSize: 15}]}>
                        <FontAwesome
                          name="rupee"
                          size={15}
                          color="#3B2D46"
                        />{' '}
                        {item.price}
                      </Text>
                      <AddItem />
                      <TouchableOpacity>
                        <MaterialCommunityIcons
                          name="delete-variant"
                          size={22}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
        <View style={[Styles._checkEnd, {height: 100}]}>
          <View style={[Styles._spaceBetween, {paddingVertical: 12}]}>
            <Text style={Styles._pricText}>TOTAL PRICE</Text>
            <Text style={[Styles._pricText, {fontSize: 16}]}>
              {' '}
              <FontAwesome name="rupee" size={15} color="#3B2D46" /> 239.98
            </Text>
          </View>
          <TouchableOpacity style={Styles._cartBtn} onPress={this._navigate}>
            <Text style={[Styles._cartText, {textAlign: 'center'}]}>
              CHECK OUT
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {cartList: state.products.cartList};
};

export default connect(mapStateToProps, {getCart})(Cart);