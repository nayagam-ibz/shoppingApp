import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../header/header';
import {getCart} from '../../app/store/actions/products';
import {connect} from 'react-redux';
import Styles from '../../../assets/style';
import StepIndicator from '../shared/stepIndicator'

class Checkout extends React.Component {
  state = {
    modalVisible: false, step1: true , step2: true , step3: true

  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  componentDidMount() {
    this.props.getCart();
  }

  goOrders = () => {
    this.setState({modalVisible: false});
    this.props.navigation.navigate('Signin');
  };

  goProductDetail = () => {
    this.setState({modalVisible: false});
    this.props.navigation.navigate('Home');
  }

  backNavigation = () => {
    this.props.navigation.navigate('ShippingAddress')
    this.setState({step3: false})
  }

  render() {
    const {cartList} = this.props;
    const {modalVisible} = this.state;
    return (
      <View style={styles._container}>
        <View style={[Styles._headerGradient, Styles._flexRow,  {height: 45, backgroundColor:'#3B2D46'}]}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => this.backNavigation()}>
              <Entypo name="chevron-small-left" size={35} color="#fff" style={{marginLeft: -10}}/>
            </TouchableOpacity>
          </View>
          <View style={{flex: 5}}>
            <Text style={[ Styles._subTitleApp,{color: '#fff'}]}>Payment</Text>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <SafeAreaView>
          <StepIndicator step1={this.state.step1} step2={this.state.step2} step3={this.state.step3}/>
          <View style={styles._paymentView}>
            <Text>List Payment </Text> 
          </View>
        </SafeAreaView>
        <View style={styles._flexEnd}>
          <View style={styles._spaceBetween}>
            <Text style={styles._itemText}>Items</Text>
            <Text style={styles._itemText}> <FontAwesome name="rupee" size={14} color="#7a7a7a" /> 239.98</Text>
          </View>
          <View style={[styles._spaceBetween, {paddingVertical: 2}]}>
            <Text style={styles._itemText}>Delivery</Text>
            <Text style={styles._itemText}><FontAwesome name="rupee" size={14} color="#7a7a7a" /> 18</Text>
          </View>
          <View style={[styles._spaceBetween, {marginBottom: 10, marginTop: 10}]}>
            <Text style={styles._pricText}>TOTAL PRICE</Text>
            <Text style={styles._pricText}><FontAwesome name="rupee" size={15} color="#3B2D46" /> 239.98</Text>
          </View>
          <TouchableOpacity
            style={styles._cartBtn}
            onPress={() => this.setModalVisible(true)}>
            <Text style={[styles._cartText, {textAlign: 'center'}]}>PAY</Text>
          </TouchableOpacity>
        </View>

        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles._centeredView}>
            <View style={styles._modalView}>
              <View
                style={{
                  width: 280,
                  height: 130,
                  marginTop: -20,
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                <Image
                  source={require('../../../assets/images/unnamed.png')}
                  style={{height: '100%', width: '100%'}}
                  resizeMode="stretch"
                />
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 30,
                  }}>
                  <AntDesign name="checkcircleo" size={60} color="#fff" />
                </View>
              </View>
              <View style={styles._sucessMessage}>
                <Text style={styles._sucessTitle}>Success!</Text>
                <Text style={styles._sucessSubTitle}>
                  Your order will be delivered soon. It can be tracked in thie
                  "Orders" section
                </Text>
                <TouchableOpacity
                  style={[styles._cartBtn, {paddingHorizontal: 30}]}
                  onPress={this.goProductDetail}>
                  <Text style={[styles._cartText, {textAlign: 'center'}]}>
                    CONTINUE SHOPPING
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goOrders}>
                  <Text style={[styles._goOrdes, {textAlign: 'center'}]}>
                    Go To Orders
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {cartList: state.products.cartList};
};

export default connect(mapStateToProps, {getCart})(Checkout);

const styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },

  _spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  _flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  _flexEnd: {
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    borderColor: '#eee',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
  },

  _cartBtn: {
    backgroundColor: 'orange',
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 3,
    marginBottom: 5,
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

  _paymentView: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  _addressTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 10,
  },

  _addressView: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 3,
    elevation: 0.5,
    flexDirection: 'row',
    marginTop: 10,
  },

  _addressName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: '#3B2D46',
    marginBottom: 10,
  },

  _addressText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: '#7a7a7a',
    lineHeight: 20,
  },

  _onChangeText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#7a7a7a',
  },

  _itemText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#7a7a7a',
  },

  _modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 20,
  },

  _centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  _sucessMessage: {
    alignItems: 'center',
  },

  _sucessTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: '#3B2D46',
    marginTop: 15,
  },

  _sucessSubTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#7a7a7a',
    textAlign: 'center',
    paddingVertical: 15,
  },

  _goOrdes: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: '#3B2D46',
    marginTop: 10,
  },

  _sucessIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
  },
});
