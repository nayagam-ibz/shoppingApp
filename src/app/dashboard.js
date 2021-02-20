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
import CatalogList from './shared/catalogList';
import CustomHeader from './header/header';
import SearchProdcut from './shared/search';
import {getProduct} from '../app/store/actions/products';
import {connect} from 'react-redux';
import Loader from './shared/loader';
import Styles from '../../assets/style';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {maxRating: [1, 2, 3, 4, 5], loading: true};
		this.navigation_toggle = this.navigation_toggle.bind(this);
	}

	componentDidMount() {
		this.props.getProduct().then((data) => {
			if (data.payload.data) {
				this.setState({loading: false});
			}
		});
	}

	navigation_toggle(res) {
		this.props.navigation.navigate('Catalogue');
	}

	onNavigation = (res) => {
		this.props.navigation.navigate('Catalogue', {
			screen: 'ProductDetail',
			params: {id: res, navigation: 'Home'},
		});
	};

	render() {
		const {maxRating} = this.state;
		const {productsList} = this.props;
		return (
			<View style={Styles._container}>
				<Loader loading={this.state.loading} />
				<CustomHeader
					navigation={this.props.navigation}
					isHeader="home"
					notificationIcon={true}
				/>
				<SearchProdcut />
				<ScrollView>
					<CatalogList navigation_toggle={this.navigation_toggle} />
					<View style={Styles._itemWrapper}>
						<Text
							style={[
								Styles._itemTitle,
								{paddingVertical: 10, paddingLeft: 10},
							]}>
							Featured
						</Text>
						<View style={{paddingLeft: 0}}>
							<FlatList
								data={productsList && productsList}
								keyExtractor={(item, index) => index}
								contentContainerStyle={Styles.container}
								numColumns={2}
								renderItem={({item}) => (
									<TouchableOpacity
										style={{flex: 1}}
										onPress={() => this.onNavigation(item.id)}>
										<View style={Styles._listItem}>
											<View style={Styles._itemWidget}>
												<Image
													source={require('../../assets/images/img1.png')}
													style={{
														width: '100%',
														height: 200,
														borderRadius: 3,
														resizeMode: 'contain',
													}}
												/>
											</View>
											<View style={Styles._itemFavourite}>
												<Entypo
													name={
														item.favourite === true ? 'heart' : 'heart-outlined'
													}
													size={18}
													color={item.favourite === true ? 'orange' : '#3B2D46'}
													style={{paddingTop: 2}}
												/>
											</View>
											<View>
												<View style={Styles._ratingView}>
													{this.state.maxRating.map((rating, key) => {
														return (
															<View activeOpacity={0.7} key={rating}>
																<Image
																	source={
																		rating <= item.ratingCount
																			? require('../../assets/images/star_filled.png')
																			: require('../../assets/images/star_corner.png')
																	}
																	style={Styles._ratingStyle}
																/>
															</View>
														);
													})}
												</View>
												<Text style={Styles._itemName}>{item.name}</Text>
												<Text style={Styles._itemPrice}>
													{item.displayPrice}
												</Text>
											</View>
										</View>
									</TouchableOpacity>
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