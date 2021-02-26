import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	FlatList,
	Modal,
} from 'react-native';
import {getCategories, getProducts} from '../app/store/actions/products';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Notification from './shared/notification';
import SearchProdcut from './shared/search';
import CustomHeader from './header/header';
import Styles from '../../assets/style';
import Loader from './shared/loader';
import { connect } from 'react-redux';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {loading: true, modalVisible: false};
	}

	componentDidMount() {
		this.props.getCategories().then((data) => {
		  this.props.getProducts(19).then((data) => {
			  this.setState({loading: false});
		  })
		});
	}

	navigationToggle() {
		this.props.navigation.navigate('Catalogue', {
			screen: 'Catalogue',
		});
	}

	onNavigation = (res) => {
		this.props.navigation.navigate('Catalogue', {
			screen: 'ProductDetail',
			params: {id: res, navigation: 'Home'},
		});
	};

	setModalVisible = (visible) => {
		this.setState({modalVisible: visible});
	};

	render() {
		const {productsList, initialData, allCategories} = this.props;
		const value = 0
		return (
			<View style={Styles._container}>
				<Loader loading={this.state.loading} />
				<CustomHeader
					navigation={this.props.navigation}
					isHeader="home"
					openModal="openModal"
					notificationIcon={true}
					headerModal={() => this.setModalVisible(true)}
				/>
				<SearchProdcut />
				<ScrollView>
					{allCategories && allCategories && (
						<View style={styles._catalogue}>
							<View style={[styles._spaceBetween, {paddingVertical: 10}]}>
								<Text style={styles._itemTitle}>Catalogue</Text>
								<TouchableOpacity
									style={styles._flexRow}
									onPress={this.navigationToggle}>
									<Text style={styles._seeAllText}>See All</Text>
									<Entypo
										name="chevron-small-right"
										size={22}
										color="#7a7a7a"
									/>
								</TouchableOpacity>
							</View>
							<View>
								{allCategories.map((item, index) => {
									return (
										<View style={styles._spaceBetween} key={index}>
											{item.taxons.slice(0, 4).map((item, index) => {
												return (
													<TouchableOpacity
													  key={index}
														style={styles._catalogWidget}
														onPress={this.navigationToggle}>
														<Image
															source={require('../../assets/images/Men.jpg')}
															style={styles._cateImage}
														/>
														<Text style={styles._catalogText}>{item.name}</Text>
													</TouchableOpacity>
												);
											})}
										</View>
									);
								})}
							</View>
						</View>
					)}
					{productsList && productsList && (
						<View style={Styles._itemWrapper}>
							<Text
								style={[
									Styles._itemTitle,
									{paddingVertical: 10, paddingLeft: 10},
								]}>
								Best Sellers
							</Text>
							<View style={{paddingLeft: 0}}>
								<FlatList
									data={productsList}
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
														style={Styles._dasProductImage}
													/>
												</View>
												<View style={{paddingVertical: 5}}>
													<Text style={Styles._itemName}>{item.name}</Text>
													<View style={Styles._rowView}>
													  <FontAwesome
															name="rupee"
															size={14}
															color="#3B2D46"
															style={{marginTop: 3, marginRight: 2}}
														/>
														<Text style={Styles._itemPrice}>
															{item.master.costPrice ? item.master.costPrice : value.toFixed(2)}
														</Text>
													</View>
												</View>
											</View>
										</TouchableOpacity>
									)}
								/>
							</View>
						</View>
					)}
				</ScrollView>
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}>
					<View style={Styles._centeredView}>
						<View style={Styles._fullView}>
							<Notification
								handleClose={() => this.setModalVisible(false)}
								notification={initialData && initialData.notification}
							/>
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
		allCategories: state.products.allCategories,
	};
};

export default connect(mapStateToProps, {getCategories, getProducts})(
	Dashboard,
);

const styles = StyleSheet.create({
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

	_seeAllText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 14,
		color: '#7a7a7a',
	},

	_itemTitle: {
		fontSize: 13,
		fontFamily: 'Montserrat-SemiBold',
		textTransform: 'uppercase',
	},

	_catalogue: {
		paddingHorizontal: 10,
	},

	_cateImage: {
		width: 70,
		height: 70,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: '#7a7a7a',
	},

	_catalogText: {
		fontSize: 13,
		marginTop: 2,
		fontFamily: 'Montserrat-Medium',
		textAlign: 'center',
	},
});