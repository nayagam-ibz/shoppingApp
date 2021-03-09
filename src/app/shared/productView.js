import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addRemoveFavourite, CurrentUser } from '../../app/store/actions/products';
import Entypo from 'react-native-vector-icons/Entypo';
import Authentication from '../shared/authentication';
import RBSheet from 'react-native-raw-bottom-sheet';
import Styles from '../../../assets/style';
import { connect } from 'react-redux';

class ProductView extends Component {
	_addRemoveFavourite = (id) => {
    return CurrentUser().then((token) => {
			if (!token) {
				this.RBSheet.open();
				return;
			}else {
       this.props.addRemoveFavourite(id)
			}
		})
	}

	sheetClose = () => {
		this.RBSheet.close();
	} 

	render() {
		const {productsList, favourite} = this.props;
		const value = 0
		return (
			<View style={Styles._container}>
				<FlatList
					data={productsList}
					keyExtractor={(item, index) => index}
					numColumns={2}
					renderItem={({item}) => (
						<View style={{flex: 1}}>
							<TouchableOpacity
								style={Styles._listItem}
								onPress={() => this.props.onNavigation(item.id)}>
								<View style={Styles._itemWidget}>
								  {item.images && item.images.length > 0 ? 
                    item.images.map((item, index) => {
                    	return(
                      	<View key={index}>
                       	  <Image source={{uri: item.url}} style={Styles._dasProductImage} />  
                        </View>
                    	)
                    }) 
                    : 
                    <Image
											source={require('../../../assets/images/unknow-image.png')}
											style={{width: 80, height: 80}}
										/>
								  }
									<TouchableOpacity style={Styles._itemFavourite} onPress={() => this._addRemoveFavourite(item.id)}>
										<Entypo name={favourite && favourite.currentProduct.id === item.id ? 'heart':'heart-outlined' } size={18} color='#3B2D46' style={{paddingTop: 2}} />
									</TouchableOpacity>
								</View>
								<View style={{height: 70, paddingVertical: 5}}>
									<Text style={[Styles._itemName,{width: '100%'}]} numberOfLines={1}>Jacket With Liner</Text>
									<View style={[Styles._rowView, {paddingVertical: 5}]}>
										<MaterialCommunityIcons name="currency-inr" size={14} color='#333' style={{marginLeft: -4}} />
									  <Text style={Styles._itemPrice}>
									    {item.price ? item.price : value.toFixed(2)}
									  </Text>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					)}
				/>
				<RBSheet ref={(ref) => {this.RBSheet = ref;}}
					height={400}
					openDuration={300} closeOnPressMask={true} closeOnDragDown={true}
					customStyles={{
				    wrapper: {backgroundColor: 'rgba(0,0,0,.7)'},
				    draggableIcon: {backgroundColor: '#fff',}}}>
					<Authentication sheetClose={this.sheetClose}/>
				</RBSheet>
			</View>
		);
	}
}


const mapStateToProps = (state) => {
  return {favourite: state.products.favourite};
};

export default connect(mapStateToProps, {addRemoveFavourite})(ProductView);

