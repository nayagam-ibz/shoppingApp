import React, {Component} from 'react';
import {
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	Image,
	FlatList,
	ScrollView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomHeader from './header/header';
import SearchProdcut from './shared/search';
import {connect} from 'react-redux';
import Loader from './shared/loader';
import Styles from '../../assets/style';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const  colors = ['#EED9BC', '#EEDAD3', '#fdecba', '#abcdef', '#F8F9F9', '#F2F4F4', '#FEF9E7', '#FAE5D3', '#D5F5E3', '#D6EAF8'];
class Catalogue extends Component {
	constructor(props) {
		super(props);
		this.state = {title: '', loading: false};
	}

	componentDidMount() {
		setTimeout(() => this.setState({loading: false}), 2000);
	}

	openSheet = (name, id) => {
		this.setState({title: name});
		this.RBSheet.open();
	};

	onNavigation = (id, title) => {
		this.RBSheet.close();
		setTimeout(() => {
			this.props.navigation.navigate('Categories', {id: id, title: title});
		}, 200);
	};

	render() {
		const {allCategories} = this.props;
		const {title} = this.state;
		return (
			<SafeAreaView style={{backgroundColor:'#fff'}}>
				<Loader loading={this.state.loading} />
				<CustomHeader
					navigation={this.props.navigation}
					isHeader="home"
					isBack="isBack"
					headertitle="Categories"
					name="Home"
				/>
				<SearchProdcut />
				<ScrollView style={[Styles._catalogueList, {marginBottom: 80}]}>
          {allCategories &&
						allCategories.map((item, index) => {
							return (
								<View key={index}>
									{item.taxons.map((item, index) => {
										let col = colors[index] 
										return (
											<View key={index}>
											 <TouchableOpacity
												  key={index}
													style={[Styles._cataloguRow, {backgroundColor: col}]}
													onPress={() => this.openSheet(item.name, item.id)}>
													<View>
													  <View style={{flexDirection:'row', alignItems:'center', marginBottom: 5}}>
												      <Text style={Styles._catalogueText}>{item.name}</Text>
												      <EvilIcons name="chevron-down"size={22} color="#7a7a7a"/>
												    </View>  
														<View style={{flexDirection:'row', alignItems:'center'}}>
															{item.taxons.slice(0,3).map((item, index) => {
																return (
																	<Text style={Styles._size10} key={index}>
																		{item.name}
																	</Text>
																);
															})}
														</View>
										      </View>
												 <View style={Styles._catImage}>
													<Image
														style={Styles._imageStyle}
														source={require('../../assets/images/kids.png')}
													/>
												</View>
												</TouchableOpacity>	
											</View>
										);
									})}
								</View>
							);
						})
					}
				</ScrollView>
				<RBSheet ref={(ref) => {this.RBSheet = ref;}}
					height={350}
					openDuration={500} closeOnPressMask={true} closeOnDragDown={true}
					customStyles={{container: {borderTopLeftRadius: 15, borderTopRightRadius: 15}}}>
					<View style={Styles._catList}>
						<Text style={Styles._catTitle}>{title}</Text>
						{allCategories &&
							allCategories.map((item, index) => {
								return (
									<View key={index}>
										{item.taxons.map((item, index) => {
											if (item.name === title) {
												return (
													<View key={index}>
														{item.taxons.map((item, index) => {
															return (
																<TouchableOpacity
																  key={index}
																	key={item.id}
																	style={Styles._menuPadding}
																	onPress={() =>
																		this.onNavigation(item.id, title)
																	}>
																	<Text style={Styles._catSubTitle}>
																		{item.name}
																	</Text>
																</TouchableOpacity>
															);
														})}
													</View>
												);
											}
										})}
									</View>
								);
							})}
					</View>
				</RBSheet>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		allCategories: state.products.allCategories,
	};
};

export default connect(mapStateToProps, {})(Catalogue);