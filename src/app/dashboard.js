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
import {SubmissionError} from 'redux-form';
import CustomHeader from './header/header';
import Styles from '../../assets/style';
import Loader from './shared/loader';
import ProductView from './shared/productView'
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
		}).catch(error => {
      this.setState({ loading:false })
      console.log(error)
      throw new SubmissionError(error);
    })
	}

	navigationToggle() {
		this.props.navigation.navigate('Categories', {
			screen: 'Categories',
		});
	}

	onNavigation = (id) => {
		this.props.navigation.navigate('Categories', {
			screen: 'ProductDetail',
			params: {id: id, navigation: 'Home'},
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
					isHeader="home" openModal="openModal" notificationIcon={true}
					headerModal={() => this.setModalVisible(true)}
				/>
				<SearchProdcut />
				<ScrollView>
					{allCategories && allCategories && (
						<View>
							<View style={styles._catalogue}>
								<View style={[styles._spaceBetween, {paddingVertical: 10}]}>
									<Text style={Styles._itemTitle}>Catalogue</Text>
									<TouchableOpacity style={styles._flexRow} onPress={() => this.navigationToggle()}>
										<Text style={styles._seeAllText}>See All</Text>
										<Entypo name="chevron-small-right" size={22} color="#7a7a7a"/>
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
															onPress={() => this.navigationToggle()}>
															<View style={styles._catalogWidget}>
																{item.images ? item.images.slice(0,1).map((item, index) => {
																	return(
																    <View key={index}>
																      <Image source={{uri: item.url}} style={styles._cateImage} />  
																     </View>
																		)
															  	})
		                              : 
		                              <Image source={require('../../assets/images/unknow-image.png')} style={{width: 45, height: 45}} />
															  }
															</View>
															<Text style={styles._catalogText}>{item.name}</Text>
														</TouchableOpacity>
													);
												})}
											</View>
										);
									})}
								</View>
							</View>
						  <View style={Styles._vrLine} />
						</View>  
					)}
					{productsList && productsList && (
						<View style={Styles._itemWrapper}>
							<Text style={[Styles._itemTitle, {paddingHorizontal: 10}]}>Best Sellers </Text>
							<ProductView productsList={productsList} onNavigation={this.onNavigation}/> 
						</View>
					)}
				</ScrollView>
				<Modal animationType="fade" transparent={true} visible={this.state.modalVisible}>
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

	_catalogue: {
		paddingHorizontal: 10,
	},

	_catalogWidget: {
		width: 70,
		height: 70,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: '#ddd',
		alignItems:'center',
		justifyContent:'center'
	},

	_cateImage: {
		width: 55,
		height: 55,
	},

	_catalogText: {
		fontSize: 12,
		marginTop: 5,
		fontFamily: 'Montserrat-Medium',
		textAlign: 'center',
		textTransform: 'uppercase'
	},
});


