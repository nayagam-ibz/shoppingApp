import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFavourite, addRemoveFavourite } from '../../app/store/actions/products';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomHeader from '../header/header';
import Styles from '../../../assets/style';
import Loader from '../shared/loader';

class ListFavouriteItems extends Component {
	state = { loading: false}
	componentDidMount () {
	  this.unsubscribe= this.props.navigation.addListener('focus', () => {
	  	this.setState({loading: true})
			this.props.getFavourite().then((data) => {
				if(data.payload.data.status === "ok"){
					this.setState({loading: false})
				}
			})
	  })
	}

	componentWillUnmount () {
	  this.unsubscribe()
	}

	removeFavourite = (id) => {
		this.setState({loading: true})
		this.props.addRemoveFavourite(id).then((data) => {
			if(data.payload.data.message === "Successfully removed"){
				this.setState({loading: false})
				this.props.getFavourite()
			}
		})
	}

	onNavigation = (id) => {
		this.props.navigation.navigate('Categories', {
			screen: 'ProductDetail',
			params: {id: id, navigation: 'Home'},
		});
	}
		
	render() {
		const {favouriteList} = this.props;
		const value = 0
		return (
			<View style={Styles._container}>
				<CustomHeader navigation={this.props.navigation} isHeader="Wishlist" isBack="isBack" name="Account" />
				<Loader loading={this.state.loading} />
				{favouriteList && favouriteList.length > 0 
					? 
						<ScrollView>
							<View style={Styles._itemWrapper}>
								<Text style={[Styles._itemTitle, {paddingHorizontal: 10, marginTop: 10}]}>
									{favouriteList.length} Items
								</Text>
								<FlatList
									data={favouriteList}
									keyExtractor={(item, index) => index}
									numColumns={2}
									renderItem={({item}) => (
										<TouchableOpacity style={{flex: 1}} onPress={()=> this.onNavigation(item.productId)}>
											<View style={Styles._listItem}>
												<View style={Styles._itemWidget}>
	                        
	                        {item.product.images && item.product.images.length > 0 ? 
				                    [item.product.images[11]].map((item, index) => {
				                    	return(
				                      	<View key={index}>
				                       	  <Image source={{uri: item.url}} style={Styles._dasProductImage} /> 
				                        </View>
				                    	)
				                    }) 
				                    : 
				                    <Image
															source={require('../../../assets/images/unknow-image.png')}
															style={{width: 120, height: 120}}
														/>
												  }
													<TouchableOpacity style={Styles._itemFavourite} onPress={() => this.removeFavourite(item.productId)}>
														<Entypo name="heart" size={18} color="red" style={{paddingTop: 2}} />
													</TouchableOpacity>
												</View>
												<View style={{height: 70, paddingVertical: 5}}>
													<Text style={[Styles._itemName,{width: '100%'}]} numberOfLines={1}>{item.product && item.product.name}</Text>
													<View style={[Styles._rowView, {paddingVertical: 5}]}>
														<MaterialCommunityIcons name="currency-inr" size={14} color='#333' style={{marginLeft: -4}} />
													  <Text style={Styles._itemPrice}>
													    {item.product.price ? item.product.price : value.toFixed(2)}
													  </Text>
													</View>
												</View>
											</View>
										</TouchableOpacity>
									)}
								/>
							</View>
						</ScrollView>
          : 
          <View style={Styles._emptyView}> 
	          <Text style={Styles._emptyTitle}>Your Wishlist is empty </Text>
	          <Text style={Styles._emptySubTitle}>Save items that you like in your wishlist. Review them anytime and easily move them to the bag. </Text>
	          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={Styles._shopBtn}>
	          	<Text style={Styles._shopBtnText}>Shop Now</Text>
	          </TouchableOpacity>   
	        </View>  
			  }
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {favouriteList: state.products.favouriteList};
};

export default connect(mapStateToProps, {getFavourite, addRemoveFavourite})(ListFavouriteItems);