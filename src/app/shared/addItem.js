import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

class AddItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {qty: 0};
  }

  _minusQty() {
    let qty = this.state.qty;
    if (qty > 1) {
      this.setState({qty: qty - 1});
    } else {
      this.setState({qty: 0});
    }
  }

  _plusQty = (id) => {
    let qty = this.state.qty + 1;
    this.setState({qty: qty});
  };

  render() {
    return (
      <View>
        <View style={styles._counterView}>
          <TouchableOpacity
            onPress={() => this._minusQty()}
            style={styles._addItems}>
            <AntDesign name="minus" size={12} color="#333" />
          </TouchableOpacity>
          <View style={styles._addCounter}>
            <Text>{this.state.qty}</Text>
          </View>
          <TouchableOpacity
            style={styles._addItems}
            onPress={() => this._plusQty()}>
            <AntDesign name="plus" size={12} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AddItems;

const styles = StyleSheet.create({
  _counterView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  _addItems: {
    width: 25,
    height: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },

  _addCounter: {
    width: 30,
    textAlign: 'center',
    alignItems: 'center',
    height: 18,
    justifyContent: 'center',
    fontFamily: 'Montserrat-Medium',
  },
});