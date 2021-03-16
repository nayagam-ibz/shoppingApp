import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Share from 'react-native-share';
import ImgToBase64 from 'react-native-image-base64';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

class ShareOptions extends React.Component {
  state = {like: false}
  myShare = async () => {
    const {itemsObject} = this.props;
    ImgToBase64.getBase64String(
      'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2414313/2018/3/13/11520926368526-HERENOW-Men-Red--Black-Regular-Fit-Checked-Casual-Shirt-8881520926368447-1.jpg',
    ).then((base64String) => {
      const shareImage = `data:image/png;base64,${base64String}`;
      const shareOptions = {
        message: `Check this out ${ itemsObject && itemsObject.name} https://www.myShop.com MyShop`,
        url: shareImage,
      };
      try {
        const ShareResponse = Share.open(shareOptions);
      } catch (error) {
        console.log('Error => ', error);
      }
    });
  };

  _myFavourite = () => {
    this.setState({like: !this.state.like})
  };

  render() {
    const {like} = this.state
    const { itemObject } = this.props
    return (
      <View style={styles._socialView}>
        <TouchableOpacity style={styles.shareBtn} onPress={this.myShare}>
          <Ionicons name="share-social" size={20} color="#3B2D46" />
        </TouchableOpacity>
        {itemObject.isFavorite === true && (
          <TouchableOpacity style={styles.shareBtn} onPress={this._myFavourite}>
            <Entypo name="heart" size={22} color='red'/>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default ShareOptions;

const styles = StyleSheet.create({
  shareBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  _socialView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});