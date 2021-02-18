import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	FlatList,
	Dimensions,
	Modal,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../header/header';
import SearchProdcut from '../shared/search';
import Categories from '../shared/categories';
import {getProduct} from '../../app/store/actions/products';
import {connect} from 'react-redux';
import Loader from '../shared/loader';
import Filter from '../shared/filter';
import Styles from '../../../assets/style';

class CataloguMenuDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			maxRating: [1, 2, 3, 4, 5],
			loading: true,
			sortyBy: 'Featured',
			modalVisible: false,
		};
	}

	componentDidMount() {
		this.props.getProduct();
		setTimeout(() => this.setState({loading: false}), 2000);
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

	handleClose = () => {
		this.setState({modalVisible: false});
	};

	render() {
		const {maxRating} = this.state;
		const {productsList, initialData} = this.props;
		const headertitle = this.props.route.params && this.props.route.params.user;
		return (
			<View style={Styles._container}>
				<Loader loading={this.state.loading} />
				<CustomHeader
					navigation={this.props.navigation}
					isHeader="home"
					isBack="isBack"
					name="Catalogue"
					headertitle={headertitle}
					filterIcon={true}
					filterModal={() => this.setModalVisible(true)}
				/>
				<SearchProdcut />
				<ScrollView>
					<Categories initialData={initialData && initialData.categories}/>
					<View style={Styles._itemWrapper}>
						<View style={[Styles._spaceBetween, {marginBottom:10}]}>
							<Text style={[Styles._itemTitle, {paddingLeft: 10}]}>
								{productsList && productsList.length} Items
							</Text>
							<TouchableOpacity
								onPress={this.openSheet}
								style={Styles._flexRow}>
								<Text style={Styles._sortText}>Sort by</Text>
								<Text>:</Text>
								<Text style={Styles._sortValue}>{this.state.sortyBy}</Text>
							</TouchableOpacity>
						</View>

						<View style={{paddingLeft: 0}}>
							<FlatList
								data={productsList && productsList}
								keyExtractor={(item, index) => index}
								contentContainerStyle={Styles.container}
								numColumns={2}
								renderItem={({item}) => (
									<View style={{flex: 1}}>
										<TouchableOpacity
											style={Styles._listItem}
											onPress={() =>
												this.props.navigation.navigate('ProductDetail')
											}>
											<View style={Styles._itemWidget}>
												<Image
													source={require('../../../assets/images/img1.png')}
													style={{
														width: '100%',
														height: 180,
														borderRadius: 3,
														resizeMode: 'contain',
													}}
												/>
											</View>
											<TouchableOpacity style={Styles._itemFavourite}>
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
												<View style={Styles._ratingView}>
													{this.state.maxRating.map((rating, key) => {
														return (
															<View activeOpacity={0.7} key={rating}>
																<Image
																	source={
																		rating <= item.ratingCount
																			? require('../../../assets/images/star_filled.png')
																			: require('../../../assets/images/star_corner.png')
																	}
																	style={Styles._ratingStyle}
																/>
															</View>
														);
													})}
												</View>
												<Text style={Styles._itemName}>{item.name}</Text>
												<Text style={Styles._itemPrice}><FontAwesome name="rupee" size={15} color="#7B5996" />{' '}{item.price}</Text>
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
					openDuration={200}
					closeDuration={200}
					closeOnPressMask={true}
					closeOnDragDown={true}
					customStyles={{
						container: {
							borderTopLeftRadius: 15,
							borderTopRightRadius: 15,
						},
					}}>
					<View style={Styles._catList}>
						<FlatList
							data={initialData && initialData.sortby}
							keyExtractor={(item, index) => index}
							contentContainerStyle={Styles.container}
							renderItem={({item}) => (
								<TouchableOpacity
									style={Styles._selectItem}
									onPress={() => this.selctItem(item.name)}>
									<Text style={Styles._selectText}>{item.name}</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				</RBSheet>
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}>
					<View style={Styles._centeredView}>
						<View style={Styles._fullView}>
							<Filter handleClose={this.handleClose} />
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		productsList: state.products.productsList,
		initialData: state.products.initialData,
	};
};

export default connect(mapStateToProps, {getProduct})(CataloguMenuDetail);