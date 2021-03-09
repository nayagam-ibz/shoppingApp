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
import Entypo from 'react-native-vector-icons/Entypo';
import CustomHeader from '../header/header';
import Styles from '../../../assets/style';
import Loader from '../shared/loader';
import { getFavourite } from '../../app/store/actions/products';
import { connect } from 'react-redux';

class Favourite extends Component {
	state = { loading: true}

	componentDidMount() {
		this.props.getFavourite().then((data) => {
			if(data.payload.data.status === "ok"){
				this.setState({loading: false})
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
				{favouriteList && (
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
									<TouchableOpacity style={{flex: 1}} onPress={()=> this.onNavigation(item.id)}>
										<View style={Styles._listItem}>
											<View style={Styles._itemWidget}>
												<Image
													source={require('../../../assets/images/unknow-image.png')}
													style={{width: 80, height: 80}}
												/>
												<View style={Styles._itemFavourite}>
													<Entypo name="heart" size={18} color="orange" style={{paddingTop: 2}} />
												</View>
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
			  )}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {favouriteList: state.products.favouriteList};
};

export default connect(mapStateToProps, {getFavourite})(Favourite);