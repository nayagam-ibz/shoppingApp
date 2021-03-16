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
import CustomHeader from '../header/header';
import SearchProdcut from '../shared/search';
import CategoryMenus from '../shared/categoryMenus';
import {getSubProduct} from '../../app/store/actions/products';
import {connect} from 'react-redux';
import Loader from '../shared/loader';
import Filter from '../shared/filter';
import ProductView from '../shared/productView'
import Styles from '../../../assets/style';

class CataloguMenuDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {  sortyBy: 'Featured', modalVisible: false };
		this.applyFilter = this.applyFilter.bind(this);
	}

	componentDidMount () {
	  this.unsubscribe= this.props.navigation.addListener('focus', () => {
	  	this.setState({loading: true})
      const id = this.props.route.params?.id ?? '';
			this.props.getSubProduct(id).then((data) => {
	      this.setState({loading: false})
			});
	  })
	}

	componentWillUnmount () {
	  this.unsubscribe()
	}


	openSheet = () => {
		this.RBSheet.open();
	};

	selctItem = (res) => {
		this.setState({sortyBy: res});
		this.RBSheet.close();
	};

	triggerModal = (visible) => {
		this.setState({modalVisible: visible});
	};

	onNavigation = (res) => {
		this.props.navigation.navigate('ProductDetail', {
			id: res,
			navigation: 'ProductsList',
		});
	};

	applyFilter(filter, filterApplied = '') {
		console.log(filter);
		console.log(filterApplied);
	}

	render() {
		const {allSubProducts, initialData} = this.props;
		const title = this.props.route.params?.title ?? '';
		const id = this.props.route.params?.id ?? '';
		const value = 0
		return (
			<View style={Styles._container}>
				<Loader loading={this.state.loading} />
				<CustomHeader
					navigation={this.props.navigation}
					isHeader="home" isBack="isBack" headertitle={title}
					openModal="openModal" name="Catalogue" filterIcon={true}
					headerModal={() => this.triggerModal(true)}
				/>
				<SearchProdcut />
				<ScrollView>
					<CategoryMenus title={title} itemId={id} />
					<View style={Styles._itemWrapper}>
						<View style={[Styles._spaceBetween, {marginBottom: 10}]}>
							<Text style={[Styles._itemTitle, {paddingLeft: 10}]}>
								{allSubProducts && allSubProducts.length} Items
							</Text>
							<TouchableOpacity onPress={this.openSheet} style={Styles._flexRow}>
								<Text style={Styles._sortText}>Sort by</Text>
								<Text>:</Text>
								<Text style={Styles._sortValue}>{this.state.sortyBy}</Text>
							</TouchableOpacity>
						</View>
						<ProductView productsList={allSubProducts} onNavigation={this.onNavigation} navigation={this.props.navigation}/> 
					</View>
				</ScrollView>
				<RBSheet ref={(ref) => {this.RBSheet = ref;}}
					height={250} openDuration={500} closeDuration={500}
					closeOnPressMask={true} closeOnDragDown={true}
					customStyles={{container: {borderTopLeftRadius: 15,borderTopRightRadius: 15,}}}>
					<View style={Styles._catList}>
						<FlatList
							data={initialData && initialData.sortby}
							keyExtractor={(item, index) => index}
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
								handleClose={() => this.triggerModal(false)}
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
		allSubProducts: state.products.allSubProducts,
		initialData: state.products.initialData,
	};
};

export default connect(mapStateToProps, {getSubProduct})(CataloguMenuDetail);