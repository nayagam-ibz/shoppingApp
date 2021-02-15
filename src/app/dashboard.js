import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	ImageBackground,
	FlatList,
	Dimensions,
	TextInput,
} from 'react-native';


import Entypo from 'react-native-vector-icons/Entypo';
import CatalogList from './shared/catalogList';
import CustomHeader from './header/header';
import SearchProdcut from './shared/search';
import {getProduct} from '../app/store/actions/products';
import {connect} from 'react-redux';
import Loader from './shared/loader';
import Carousel from './shared/carousel/Carousel'

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {maxRating: [1, 2, 3, 4, 5], loading: false};
		this.navigation_toggle = this.navigation_toggle.bind(this);
	}

	componentDidMount() {
		this.setState({loading: false})
		this.props.getProduct();
	}

	navigation_toggle(res) {
		this.props.navigation.navigate('Catalogue');
	}

	render() {
		const {maxRating} = this.state;
		const {productsList} = this.props;
		return (
			<View style={styles._container}>
				<Loader loading={this.state.loading} />
				<CustomHeader navigation={this.props.navigation} isHeader="home" notificationIcon={true}/>
				<SearchProdcut />
				<ScrollView>
				  <View style={{paddingVertical: 10, paddingHorizontal: 10, borderRadius: 3, height: 105}}>
				   <Carousel />
				  </View>
					<CatalogList navigation_toggle={this.navigation_toggle} />
					<View style={styles._itemWrapper}>
						<Text
							style={[
								styles._itemTitle,
								{paddingVertical: 10, paddingLeft: 10},
							]}>
							Featured
						</Text>
						<View style={{paddingLeft: 0}}>
							<FlatList
								data={productsList && productsList}
								keyExtractor={(item, index) => index}
								contentContainerStyle={styles.container}
								numColumns={2}
								renderItem={({item}) => (
									<View style={{flex: 1}}>
										<View style={styles._listItem}>
											<View style={styles._itemWidget}>
												<Image
													source={require('../../assets/images/img1.png')}
													style={{width: '100%', height: 180, borderRadius: 3}}
												/>
											</View>
											<View style={styles._itemFavourite}>
												<Entypo
													name={
														item.favourite === true ? 'heart' : 'heart-outlined'
													}
													size={18}
													color={item.favourite === true ? 'orange' : '#3B2D46'}
													style={{paddingTop: 2}}
												/>
											</View>
											<View style={{paddingHorizontal: 5}}>
												<View style={styles._ratingView}>
													{this.state.maxRating.map((rating, key) => {
														return (
															<View activeOpacity={0.7} key={rating}>
																<Image
																	source={
																		rating <= item.rating_count
																			? require('../../assets/images/star_filled.png')
																			: require('../../assets/images/star_corner.png')
																	}
																	style={styles._ratingStyle}
																/>
															</View>
														);
													})}
												</View>
												<Text style={styles._itemName}>{item.name}</Text>
												<Text style={styles._itemPrice}>${item.price}</Text>
											</View>
										</View>
									</View>
								)}
							/>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {productsList: state.products.productsList};
};

export default connect(mapStateToProps, {getProduct})(Dashboard);

const styles = StyleSheet.create({
	_container: {
		flex: 1,
		backgroundColor: '#F3F3F3',
	},

	_listItem: {
		maxWidth: Dimensions.get('window').width / 2,
		flex: 0.3,
		marginBottom: 20,
		borderRadius: 4,
		marginRight: 0,
		paddingLeft: 10,
	},

	_itemWrapper: {
		flex: 1,
		marginTop: 10,
		paddingLeft: 0,
		paddingRight: 10,
	},

	_itemsRow: {
		marginBottom: 20,
		flexDirection: 'row',
		color: '#fff',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},

	_flexRow: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},

	_spaceBetween: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	_itemWidget: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
	},

	_itemFavourite: {
		backgroundColor: '#fff',
		width: 25,
		height: 25,
		position: 'absolute',
		right: 10,
		bottom: 62,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#fff',
		elevation: 2,
	},

	_itemTitle: {
		fontSize: 15,
		fontFamily: 'Montserrat-SemiBold',
	},

	_seeAllText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 12,
		color: '#7a7a7a',
	},

	_itemName: {
		color: '#7B5996',
		fontFamily: 'Montserrat-Medium',
		fontSize: 12.5,
		paddingVertical: 5,
	},

	_itemPrice: {
		fontSize: 14,
		fontFamily: 'Montserrat-SemiBold',
	},

	_ratingView: {
		flexDirection: 'row',
		marginTop: 5,
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
});