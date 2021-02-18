import React, {Component} from 'react';
import {
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	Image,
	FlatList,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomHeader from './header/header';
import SearchProdcut from './shared/search';
import {getCatalogue, getCatalogueMenu} from '../app/store/actions/products';
import {connect} from 'react-redux';
import Loader from './shared/loader';
import Styles from '../../assets/style';

class Catalogue extends Component {
	constructor(props) {
		super(props);
		this.state = {getTitle: '', loading: true};
	}

	componentDidMount() {
		this.props.getCatalogue();
		setTimeout(() => this.setState({loading: false}), 2000);
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
			  <Loader loading={this.state.loading} />
				<CustomHeader navigation={this.props.navigation} isHeader="home" isBack="isBack" headertitle="Catalogue" name="Home" />
				<SearchProdcut />
				<View style={Styles._catalogueList}>
					<FlatList
						data={catalogueList && catalogueList}
						keyExtractor={(item, index) => item.name}
						contentContainerStyle={Styles.container}
						renderItem={({item}) => (
							<TouchableOpacity
								style={Styles._cataloguRow}
								onPress={() => this.openSheet(item.name, item.id)}>
								<Text style={Styles._catalogueText}>{item.name}</Text>
								<View style={Styles._catImage}>
									<Image
										style={Styles._imageStyle}
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
					height={400}
					openDuration={500}
					closeOnPressMask={true}
					closeOnDragDown={true}
					customStyles={{
						container: {
							borderTopLeftRadius: 15,
							borderTopRightRadius: 15,
						},
					}}>
					<View style={Styles._catList}>
						<Text style={Styles._catTitle}>{this.state.getTitle}</Text>
						<View style={{marginTop: 10}}>
							{catalogueMenu &&
								catalogueMenu.map((item) => {
									return (
										<TouchableOpacity
											key={item.id}
											style={Styles._menuPadding}
											onPress={() => this.onNavigation(item.name)}>
											<Text style={Styles._catSubTitle}>{item.name}</Text>
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

