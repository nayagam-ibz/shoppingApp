import React, {Component} from 'react';
import {
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	Image,
	Dimensions,
	StyleSheet,
	FlatList,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomHeader from './header/header';
import SearchProdcut from './shared/search';
import {getCatalogue, getCatalogueMenu} from '../app/store/actions/products';
import {connect} from 'react-redux';

class Catalogue extends Component {
	constructor(props) {
		super(props);
		this.state = {getTitle: ''};
	}

	componentDidMount() {
		this.props.getCatalogue();
	}

	openSheet = (name, id) => {
		this.setState({getTitle: name});
		this.RBSheet.open();
		this.props.getCatalogueMenu();
	};

	onNavigation = (res) => {
		this.RBSheet.close();
		this.props.navigation.navigate('Categories', {user: res});
	};

	render() {
		const {catalogueList, catalogueMenu} = this.props;
		return (
			<SafeAreaView>
				<CustomHeader navigation={this.props.navigation} isHeader="home" isBack="isBack" headertitle = "Catalogue" />
				<SearchProdcut />
				<View style={styles._catalogueList}>
					<FlatList
						data={catalogueList && catalogueList}
						keyExtractor={(item, index) => item.id}
						contentContainerStyle={styles.container}
						renderItem={({item}) => (
							<TouchableOpacity
								style={styles._cataloguRow}
								onPress={() => this.openSheet(item.name, item.id)}>
								<Text style={styles._catalogueText}>{item.name}</Text>
								<View style={styles._catImage}>
									<Image
										style={styles._imageStyle}
										source={require('../../assets/images/women.jpg')}
									/>
								</View>
							</TouchableOpacity>
						)}
					/>
				</View>
				<RBSheet
					ref={(ref) => {
						this.RBSheet = ref;
					}}
					height={380}
					openDuration={500}
					closeOnPressMask={true}
					closeOnDragDown={true}
					customStyles={{
						container: {
							borderTopLeftRadius: 15,
							borderTopRightRadius: 15,
						},
					}}>
					<View style={styles._catList}>
						<Text style={styles._catTitle}>{this.state.getTitle}</Text>
						<View style={{marginTop: 10}}>
							{catalogueMenu &&
								catalogueMenu.map((item) => {
									return (
										<TouchableOpacity
											key={item.id}
											style={styles._menuPadding}
											onPress={() => this.onNavigation(item.name)}>
											<Text style={styles._catSubTitle}>{item.name}</Text>
										</TouchableOpacity>
									);
								})}
						</View>
					</View>
				</RBSheet>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		catalogueList: state.products.catalogueList,
		catalogueMenu: state.products.catalogueMenu,
	};
};

export default connect(mapStateToProps, {getCatalogue, getCatalogueMenu})(
	Catalogue,
);

const styles = StyleSheet.create({
	_catalogueList: {
		marginTop: 10,
		paddingHorizontal: 10,
	},

	_cataloguRow: {
		backgroundColor: '#fff',
		paddingLeft: 10,
		borderRadius: 3,
		justifyContent: 'space-between',
		height: 75,
		flexDirection: 'row',
		marginBottom: 15,
		elevation: 2,
	},

	_catImage: {
		backgroundColor: '#f3f3f3',
		width: 110,
		height: 75,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
	},

	_imageStyle: {
		width: 110,
		height: 75,
		resizeMode: 'contain',
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
	},

	_catalogueText: {
		paddingTop: 28,
		fontFamily: 'Montserrat-Medium',
		color: '#3B2D46',
	},

	_catList: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},

	_catTitle: {
		fontFamily: 'Montserrat-SemiBold',
		color: '#7B5996',
		fontSize: 14,
		textAlign: 'center',
		paddingTop: 10,
	},

	_menuPadding: {
		paddingVertical: 5,
		marginBottom: 8,
	},

	_catSubTitle: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 13,
		color: '#7a7a7a',
	},
});