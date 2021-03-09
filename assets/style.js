import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },

  _listItem: {
    maxWidth: Dimensions.get('window').width / 2,
    flex: 0.3,
    borderRadius: 4,
    marginRight: 0,
    paddingLeft: 10,
  },

  _itemWrapper: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 10,
  },

  _pdhorizontal10: {
    paddingHorizontal: 10
  },


  _itemsRow: {
    marginBottom: 20,
    flexDirection: 'row',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  _flexColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  _rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  _flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  _spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  _itemWidget: {
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    height: 200,
  },

  _itemFavourite: {
    backgroundColor: '#fff',
    width: 25,
    height: 25,
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 0,
  },

  _dasProductImage: {
    width: '100%',
    height: 180,
    borderRadius: 3,
    resizeMode: 'contain',
  },

  _itemTitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textTransform: 'uppercase',
    paddingBottom: 15
  },

  _seeAllText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#7a7a7a',
  },

  _itemName: {
    color: '#333',
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },

  _itemPrice: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Montserrat-Medium',
  },

  _ratingView: {
    flexDirection: 'row',
    paddingVertical: 8,
  },

  _ratingStyle: {
    width: 12,
    height: 12,
    marginRight: 5,
    resizeMode: 'cover',
  },

  _information_widget: {
    backgroundColor: 'red',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    width: 100,
    marginRight: 5,
  },

  _information_text: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: '#7a7a7a',
    paddingTop: 2,
  },

  _image_view: {
    width: '100%',
    height: 35,
    backgroundColor: '#eee',
    borderRadius: 3,
  },

  _catalogueList: {
    marginTop: 10,
  },

  _cataloguRow: {
    backgroundColor: '#fff',
    paddingLeft: 15,
    borderRadius: 3,
    justifyContent: 'space-between',
    height: 110,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  _size10: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    marginRight: 5
  },

  _catImage: {
    width: 150,
    height: 110,
  },

  _imageStyle: {
    width: 150,
    height: 110,
    resizeMode: 'contain',
  },

  _catalogueText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#3B2D46',
    fontSize: 16,
    textTransform: 'uppercase',
  },

  _catList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  _catTitle: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 5,
    textTransform: 'uppercase',
  },

  _menuPadding: {
    paddingVertical: 5,
    marginBottom: 8,
  },

  _catSubTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: '#7a7a7a',
  },

  _selectItem: {
    paddingVertical: 10,
    textAlign: 'center',
    alignItems: 'center',
  },

  _selectText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#7a7a7a',
  },

  _sortText: {
    color: '#7a7a7a',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    marginRight: 5,
  },

  _sortValue: {
    color: '#3B2D46',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    marginLeft: 5,
  },

  _modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 10,
    height: '90%',
  },

  _centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  _fullView: {
    height: '100%',
    marginTop: 'auto',
    backgroundColor: '#F3F3F3',
  },

  _subTitleApp: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textTransform: 'uppercase',
  },

  _clearText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
  },

  _formGroup: {
    marginBottom: 40,
  },

  _flexEnd: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderColor: '#eee',
    borderRadius: 3,
  },

  _cartBtn: {
    backgroundColor: 'orange',
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 3,
    marginBottom: 5,
    width: '100%',
  },

  _btnText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#fff',
  },

  _ratingCart: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },

  _detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },

  _detTitle: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#333',
    fontSize: 11.5,
    width: 120,
    textTransform: 'uppercase',
  },

  _detName: {
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    color: '#7a7a7a',
  },

  _detDes: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#7a7a7a',
    lineHeight: 20,
  },

  _inStock: {
    fontSize: 11,
    fontFamily: 'Montserrat-SemiBold',
    color: 'green',
  },

  _reviewText: {
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    color: '#7a7a7a',
  },

  _checkEnd: {
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    height: 65,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
  },

  _styleView: {
    width: 35,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  _styleText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: '#3B2D46',
  },

  _styleTitle: {
    fontFamily: 'Montserrat-Medium',
    color: '#7a7a7a',
    fontSize: 11,
    textTransform: 'uppercase',
    marginBottom: 5,
  },

  _productTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: '#3B2D46',
    paddingBottom: 10
  },

  _productText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#7a7a7a',
    lineHeight: 20,
  },

  _vrLine: {
    backgroundColor: '#ddd',
    height: 5,
    marginVertical: 15
  },

  _addToBtn: {
    paddingVertical: 12,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },

  _bynowBtn: {
    backgroundColor: 'orange',
    paddingVertical: 12,
    borderRadius: 3,
    alignItems: 'center',
  },

  _productList: {
    paddingVertical: 2,
  },

  _imageView: {
    width: 100,
    height: 100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  _productImage: {
    height: 90,
    width: 90,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  _pricText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#3B2D46',
  },

  _cartAttirubute: {
    fontSize: 11,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
  },
  _cartView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  _cartRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    marginTop: -5,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 10,
  },

  shareBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  _headerAuthText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: '#3B2D46',
  },

  _formGroup: {
    marginBottom: 15,
  },

  _cartBtn: {
    backgroundColor: 'orange',
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 3,
    marginBottom: 5,
    width: '100%',
  },

  _cartText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#fff',
  },

  _regiText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },

  _sigText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: 'orange',
    paddingVertical: 10
  },
});

module.exports = styles;