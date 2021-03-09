import React, {Component} from 'react';
import {StyleSheet, ScrollView, Image, Text, View} from 'react-native';
import {connect} from 'react-redux';
import Styles from '../../../assets/style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class SimilarProduct extends Component {
  renderProduct(item) {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image
            source={require('../../../assets/images/unknow-image.png')}
            style={{width: 80, height: 80}}
          />
        </View>
        <View style={{height: 70, paddingVertical: 5}}>
          <Text style={[Styles._itemName, {width: '100%'}]} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={[Styles._rowView, {paddingVertical: 5}]}>
            <MaterialCommunityIcons
              name="currency-inr"
              size={14}
              color="#333"
              style={{marginLeft: -4}}
            />
            <Text style={Styles._itemPrice}>75.00</Text>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const {productsList} = this.props;
    return (
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {productsList &&
            productsList.map((item, index) => {
              return(
                  <View key={index}>
                    {this.renderProduct(item)}
                  </View>
                ) 
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {productsList: state.products.productsList};
};

export default connect(mapStateToProps, {})(SimilarProduct);

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 250,
    borderRadius: 10,
  },
  cardContainer: {
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    height: 200,
    width: 200,
    marginRight: 10,
  },
});