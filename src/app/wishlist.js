import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	FlatList,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeader from './header/header';
import {getFavourite} from '../app/store/actions/products';
import {connect} from 'react-redux';
import Loader from './shared/loader';
import Styles from '../../assets/style';

class Favourite extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: true};
		this.navigation_toggle = this.navigation_toggle.bind(this);
	}
	componentDidMount() {
		this.props.getFavourite().then((data) => {
			if(data.payload.data.status === "ok")
				this.setState({loading: false})
			});
		}

	navigation_toggle(res) {
		this.props.navigation.navigate('Catalogue');
	}

	render() {
		const {favouriteList} = this.props;
		const value = 0
		return (
			<View style={Styles._container}>
				<Loader loading={this.state.loading} />
				<CustomHeader navigation={this.props.navigation} isHeader="Wishlist" name="Home" />
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
									<TouchableOpacity style={{flex: 1}} onPress={()=> this.props.navigation.navigate("Cart")}>
										<View style={Styles._listItem}>
											<View style={Styles._itemWidget}>
												<Image
													source={require('../../assets/images/img1.png')}
													style={{width: '100%', height: 180, borderRadius: 3}}
												/>
												<View style={Styles._itemFavourite}>
													<Entypo name="heart" size={18} color="orange" style={{paddingTop: 2}} />
												</View>
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