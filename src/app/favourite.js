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
import CustomHeader from './header/header';
import {getFavourite} from '../app/store/actions/products';
import {connect} from 'react-redux';
import Loader from './shared/loader';
import Styles from '../../assets/style';

class Favourite extends Component {
	constructor(props) {
		super(props);
		this.state = {maxRating: [1, 2, 3, 4, 5], loading: true};
		this.navigation_toggle = this.navigation_toggle.bind(this);
	}
	componentDidMount() {
		this.props.getFavourite();
		setTimeout(() => this.setState({loading: false}), 2000);
	}

	navigation_toggle(res) {
		this.props.navigation.navigate('Catalogue');
	}

	render() {
		const {maxRating} = this.state;
		const {allFavourite} = this.props;
		return (
			<View style={Styles._container}>
				<Loader loading={this.state.loading} />
				<CustomHeader
					navigation={this.props.navigation}
					isHeader="Favourite"
					name="Home"
				/>
				<ScrollView>
					<View style={Styles._itemWrapper}>
						<Text
							style={[
								Styles._itemTitle,
								{paddingVertical: 5, paddingLeft: 10, marginBottom: 10},
							]}>
							{allFavourite && allFavourite.length} Items
						</Text>
						<View style={{paddingLeft: 0}}>
							<FlatList
								data={allFavourite && allFavourite}
								keyExtractor={(item, index) => index}
								contentContainerStyle={Styles.container}
								numColumns={2}
								renderItem={({item}) => (
									<TouchableOpacity style={{flex: 1}} onPress={()=> this.props.navigation.navigate("Cart")}>
										<View style={Styles._listItem}>
											<View style={Styles._itemWidget}>
												<Image
													source={require('../../assets/images/img1.png')}
													style={{width: '100%', height: 180, borderRadius: 3}}
												/>
											</View>
											<View style={Styles._itemFavourite}>
												<Entypo
													name="heart"
													size={18}
													color="orange"
													style={{paddingTop: 2}}
												/>
											</View>
											<View style={{paddingHorizontal: 5}}>
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
												<Text style={Styles._itemPrice}><FontAwesome name="rupee" size={15} color="#3B2D46" />{' '}{item.price}</Text>
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
	return {allFavourite: state.products.allFavourite};
};

export default connect(mapStateToProps, {getFavourite})(Favourite);