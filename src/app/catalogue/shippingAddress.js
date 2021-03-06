import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
  SafeAreaView
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import StepIndicator from '../shared/stepIndicator'
import Styles from '../../../assets/style';
import { getAllAddress, deleteAddress } from '../../app/store/actions/products';
import { connect} from 'react-redux';
import Loader from '../shared/loader';

class ManageAddress extends Component {
  constructor(props) {
    super(props);
    this.state = { step1: true , step2: true, loading: true, modalVisible: false, itemId: null };
  }

  componentDidMount() {
    return this.props.getAllAddress().then((data) => {
      this.setState({loading: false})
    }).catch(error => {
      console.log(error)
      this.setState({loading: false})
    })
  }

  setModalVisible = (visible, id) => {
    this.setState({modalVisible: visible, itemId: id});
  };

  delteAddress = (id) => {
    this.props.deleteAddress(id).then((data)=> {
      this.props.getAllAddress()
      this.setState({modalVisible: false});
    })
  }

  _editAddress = (id) => {
    this.props.navigation.navigate('NewAddress',{id})   
  }

  backNavigation = () => {
    this.props.navigation.navigate('Cart')
    this.setState({step2: false})
  }

  render() {
    const {allAddress} = this.props;
    const {modalVisible, itemId} = this.state;
    return (
      <SafeAreaView style={styles._container}>
        <Loader loading={this.state.loading} />
        <View style={[Styles._headerGradient, Styles._flexRow,  {height: 45, backgroundColor:'#3B2D46'}]}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => this.backNavigation()}>
              <Entypo name="chevron-small-left" size={35} color="#fff" style={{marginLeft: -10}}/>
            </TouchableOpacity>
          </View>
          <View style={{flex: 5}}>
            <Text style={[ Styles._subTitleApp,{color: '#fff'}]}>ADDRESS</Text>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <ScrollView>
          <StepIndicator step1={this.state.step1} step2={this.state.step2}/>
          <View style={{paddingHorizontal: 10, paddingVertical: 15}}> 
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('NewAddress')}
              style={styles._newAddressBtn}>
              <Text style={[styles._cartText, {color:'#333'}]}>ADD NEW ADDRESS</Text>
            </TouchableOpacity>
          </View>         
          <FlatList
            data={allAddress && allAddress}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => (
              <View style={styles._addressRow}>
                <Text style={[styles._addUsername, {marginBottom: 10}]}>
                  {`${item.attributes.firstname}${item.attributes.lastname}`}
                </Text>
                <Text style={styles._addressGray}>{item.attributes.address1}</Text>
                <Text style={styles._addressGray}>{item.attributes.address2}</Text>
                <Text style={styles._addressGray}>
                  {`${item.attributes.city}, ${item.attributes.stateName} ${item.attributes.zipcode}`}
                </Text>
                <View style={[styles._flexRow, {marginTop: 5}]}>
                  <Text style={styles._addressGray}>Phone Number : </Text>
                  <Text style={styles._addUsername}>{item.attributes.phone}</Text>
                </View>
                <View style={styles._actionRow}>
                  <TouchableOpacity onPress={() => this._editAddress(item.id)} style={[styles._actionBtn, {marginRight: 10}]}>
                    <Text style={styles._actionText}>EDIT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles._actionBtn} onPress={() => this.setModalVisible(true, item.id)}>
                    <Text style={styles._actionText}>DELETE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          /> 
        </ScrollView>  
        <View style={Styles._checkEnd}>
          <TouchableOpacity style={[Styles._addToBtn,{width: '100%', backgroundColor:'orange'}]} onPress={() => this.props.navigation.navigate('Payment')}>
            <Text  style={[Styles._btnText, {color:'#fff'}]}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles._centeredView}>
            <View style={[styles._modalView, {borderRadius: 3}]}>
              <Text style={styles._deleteBold}>Are you sure</Text>
              <Text style={styles._deleteMedium}>Do you really want to delete this address? </Text>
              <View style={styles._actionRow}>
                <TouchableOpacity style={[styles._actionBtn, {marginRight: 10}]} onPress={() => this.setModalVisible(false)}>
                  <Text style={styles._actionText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles._actionBtn} onPress={() => this.delteAddress(itemId)}>
                  <Text style={styles._actionText}>YES, DELETE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return { allAddress: state.products.allAddress }
};

export default connect(mapStateToProps, {getAllAddress, deleteAddress})(ManageAddress);

const styles = StyleSheet.create({
  _container: {
    backgroundColor: '#F3F3F3',
    flex: 1
  },

  _spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  _flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  _addressRow: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 5,
    borderBottomColor:'#ddd'
  },

  _addUsername: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color:'#333'
  },

  _addressGray: {
    fontFamily: 'Montserrat-Regular',
    color: '#7a7a7a',
    fontSize: 13,
  },

  _actionText: {
    fontSize: 11,
    fontFamily: 'Montserrat-SemiBold',
    color: 'red',
  },

  _actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 5,
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
  },

  _cartText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },

  _modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 20,
    alignItems:'center'
  },

  _centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  _deleteBold: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },

  _deleteMedium: {
    fontFamily: 'Montserrat-Regular',
    color: '#7a7a7a',
    fontSize: 15,
    textAlign:'center'
  },

  _actionBtn: {
    paddingVertical: 5
  },

  _newAddressBtn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor:'#7a7a7a',
  }

});
