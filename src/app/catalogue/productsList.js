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
import CategoryMenus from '../shared/categoryMenus';
import {getSubProduct} from '../../app/store/actions/products';
import {connect} from 'react-redux';
import Loader from '../shared/loader';
import Filter from '../shared/filter';
import Styles from '../../../assets/style';

class CataloguMenuDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			sortyBy: 'Featured',
			modalVisible: false,
		};
		this.applyFilter = this.applyFilter.bind(this);
	}

	componentDidMount() {
		const id = this.props.route.params?.id ?? '';
		this.props.getSubProduct(id).then((data) => {
      this.setState({loading: false})
		});
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

	onNavigation = (res) => {
		this.props.navigation.navigate('ProductDetail', {
			id: res,
			navigation: 'Categories',
		});
	};

	applyFilter(filter, filterApplied = '') {
		console.log(filter);
		console.log(filterApplied);
	}

	render() {
		const {allSubProducts, allCategories, initialData} = this.props;
		const title = this.props.route.params?.title ?? '';
		const id = this.props.route.params?.id ?? '';
		const value = 0
		return (
			<View style={Styles._container}>
				<Loader loading={this.state.loading} />
				<CustomHeader
					navigation={this.props.navigation}
					isHeader="home"
					isBack="isBack"
					openModal="openModal"
					name="Catalogue"
					headertitle={title}
					filterIcon={true}
					headerModal={() => this.setModalVisible(true)}
				/>
				<SearchProdcut />
				<ScrollView>
					<CategoryMenus title={title} itemId={id} />
					<View style={Styles._itemWrapper}>
						<View style={[Styles._spaceBetween, {marginBottom: 10}]}>
							<Text style={[Styles._itemTitle, {paddingLeft: 10}]}>
								{allSubProducts && allSubProducts.length} Items
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
								data={allSubProducts && allSubProducts}
								keyExtractor={(item, index) => index}
								contentContainerStyle={Styles.container}
								numColumns={2}
								renderItem={({item}) => (
									<View style={{flex: 1}}>
										<TouchableOpacity
											style={Styles._listItem}
											onPress={() => this.onNavigation(item.id)}>
											<View style={Styles._itemWidget}>
												<Image
													source={require('../../../assets/images/img1.png')}
													style={Styles._dasProductImage}
												/>
												<TouchableOpacity style={Styles._itemFavourite}>
													<Entypo
														name={
															item.favourite === true
																? 'heart'
																: 'heart-outlined'
														}
														size={18}
														color={
															item.favourite === true ? 'orange' : '#3B2D46'
														}
														style={{paddingTop: 2}}
													/>
												</TouchableOpacity>
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
					height={250}
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
							<Filter
								form="salesMenuListFilter"
								handleClose={() => this.setModalVisible(false)}
								applyFilter={this.applyFilter}
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
		allCategories: state.products.allCategories,
		allSubProducts: state.products.allSubProducts,
		initialData: state.products.initialData,
	};
};

export default connect(mapStateToProps, {getSubProduct})(CataloguMenuDetail);