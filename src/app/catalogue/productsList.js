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
	Modal,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomHeader from '../header/header';
import SearchProdcut from '../shared/search';
import Categories from '../shared/categories';
import {getProduct} from '../../app/store/actions/products';
import {connect} from 'react-redux';
import Loader from '../shared/loader';
import Filter from '../shared/filter';
import LinearGradient from 'react-native-linear-gradient';

const sortby = [
	{id: 1, name: "What's New"},
	{id: 2, name: 'Popularity'},
	{id: 3, name: 'Better Discount'},
	{id: 4, name: 'Price: High to low'},
	{id: 5, name: 'Price: Low To High'},
];

class CataloguMenuDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			maxRating: [1, 2, 3, 4, 5],
			loading: false,
			sortyBy: 'Featured',
			modalVisible: false,
		};
	}

	componentDidMount() {
		this.props.getProduct();
	}

	openSheet = () => {
		this.RBSheet.open();
	};

	selctItem = (res) => {
		this.setState({sortyBy: res});
		this.RBSheet.close();
	};

	setModalVisible = (visible) => {
		this.setState({modalVisible: visible});
	};

	render() {
		const {maxRating} = this.state;
		const {productsList} = this.props;
		const headertitle = this.props.route.params.user;
		return (
			<View style={styles._container}>
				<Loader loading={this.state.loading} />
				<CustomHeader
					navigation={this.props.navigation}
					isHeader="home"
					isBack="isBack"
					name="Catalogue"
					headertitle={headertitle}
					filterIcon={true}
					filterOption={() => this.setModalVisible(true)}
				/>
				<SearchProdcut />
				<ScrollView>
					<Categories />
					<View style={styles._itemWrapper}>
						<View style={[styles._spaceBetween, {paddingVertical: 15}]}>
							<Text style={[styles._itemTitle, {paddingLeft: 10}]}>
								{productsList && productsList.length} Items
							</Text>
							<TouchableOpacity
								onPress={this.openSheet}
								style={styles._flexRow}>
								<Text style={styles._sortText}>Sort by</Text>
								<Text>:</Text>
								<Text style={styles._sortValue}>{this.state.sortyBy}</Text>
							</TouchableOpacity>
						</View>

						<View style={{paddingLeft: 0}}>
							<FlatList
								data={productsList && productsList}
								keyExtractor={(item, index) => index}
								contentContainerStyle={styles.container}
								numColumns={2}
								renderItem={({item}) => (
									<View style={{flex: 1}}>
										<TouchableOpacity
											style={styles._listItem}
											onPress={() =>
												this.props.navigation.navigate('ProductDetail')
											}>
											<View style={styles._itemWidget}>
												<Image
													source={require('../../../assets/images/img1.png')}
													style={{width: '100%', height: 180, borderRadius: 3}}
												/>
											</View>
											<TouchableOpacity style={styles._itemFavourite}>
												<Entypo
													name={
														item.favourite === true ? 'heart' : 'heart-outlined'
													}
													size={18}
													color={item.favourite === true ? 'orange' : '#3B2D46'}
													style={{paddingTop: 2}}
												/>
											</TouchableOpacity>
											<View style={{paddingHorizontal: 5}}>
												<View style={styles._ratingView}>
													{this.state.maxRating.map((rating, key) => {
														return (
															<View activeOpacity={0.7} key={rating}>
																<Image
																	source={
																		rating <= item.rating_count
																			? require('../../../assets/images/star_filled.png')
																			: require('../../../assets/images/star_corner.png')
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
										</TouchableOpacity>
									</View>
								)}
							/>
						</View>
					</View>
				</ScrollView>
				<RBSheet
					ref={(ref) => {
						this.RBSheet = ref;
					}}
					height={220}
					openDuration={500}
					closeDuration={500}
					closeOnPressMask={true}
					closeOnDragDown={true}
					customStyles={{
						container: {
							borderTopLeftRadius: 15,
							borderTopRightRadius: 15,
						},
					}}>
					<View style={styles._catList}>
						<FlatList
							data={sortby}
							keyExtractor={(item, index) => index}
							contentContainerStyle={styles.container}
							renderItem={({item}) => (
								<TouchableOpacity
									style={styles._selectItem}
									onPress={() => this.selctItem(item.name)}>
									<Text style={styles._selectText}>{item.name}</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				</RBSheet>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}>
					<View style={styles._centeredView}>
						<View style={styles._fullView}>
							<LinearGradient
								start={{x: 0, y: 0.9}}
								end={{x: 1, y: 0.1}}
								colors={['#3B2D46', '#7B5996']}
								style={[
									styles._headerGradient,
									{height: 50, justifyContent: 'center', paddingHorizontal: 10},
								]}>
								<View style={styles._spaceBetween}>
									<TouchableOpacity onPress={() => this.setModalVisible(false)}>
										<Entypo
											name="chevron-small-left"
											size={35}
											color="#fff"
											style={{marginLeft: -10}}
										/>
									</TouchableOpacity>
									<Text style={[styles._subTitleApp, {color: '#fff'}]}>
										Filter
									</Text>
									<TouchableOpacity>
										<Text style={styles._clearText}>Clear</Text>
									</TouchableOpacity>
								</View>
							</LinearGradient>
							<View
								style={{paddingHorizontal: 10, paddingVertical: 10, flex: 1}}>
								<Filter />
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {productsList: state.products.productsList};
};

export default connect(mapStateToProps, {getProduct})(CataloguMenuDetail);

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
		borderColor: '#eee',
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
		color: '#000',
		fontFamily: 'Montserrat-Medium',
		fontSize: 11,
		paddingVertical: 5,
	},

	_itemPrice: {
		fontSize: 13,
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
		fontSize: 18,
		fontFamily: 'Montserrat-Medium',
	},

	_clearText: {
		fontSize: 12,
		fontFamily: 'Montserrat-Medium',
		color: '#fff',
	},
});