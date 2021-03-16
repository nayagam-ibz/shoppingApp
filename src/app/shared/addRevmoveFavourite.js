import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Styles from '../../../assets/style';
import {
	addRemoveFavourite,
	CurrentUser,
} from '../../app/store/actions/products';
import {connect} from 'react-redux';
import Authentication from '../shared/authentication';
import RBSheet from 'react-native-raw-bottom-sheet';

class AddRemoveFavourite extends Component {
	constructor() {
		super();
		this.state = {
			selectedIds: [],
		};
	}

	_addRemoveFavourite = (id) => {
		console.log(id);
		  return CurrentUser().then((token) => {
			if (!token) {
				this.RBSheet.open();
				return;
			}else {
				let selectedIds = [...this.state.selectedIds]
		    if(selectedIds.includes(id))
		     selectedIds = selectedIds.filter(_id => _id !== id)
		    else
		     selectedIds.push(id)
		    this.setState({selectedIds})
		    this.props.addRemoveFavourite(id).then((data) => {
		    	console.log(data.payload.data)
		    })
			}
		})
	};

	sheetClose = () => {
		this.RBSheet.close();
	};

	render() {
		const {favouriteItem , favourite} = this.props;
		console.log(favourite)
		const favitem = favourite && favoriteProducts 
		return (
			<View style={{flex: 1}}>
				<TouchableOpacity
					onPress={() => this._addRemoveFavourite(favouriteItem.id)}>
					<Entypo
						name={
							this.state.selectedIds.includes(favouriteItem.id)  
								? 'heart'
								: 'heart-outlined'
						}
						size={20}
						color={
							this.state.selectedIds.includes(favouriteItem.id)
								? 'red'
								: '#3B2D46'
						}
						style={{paddingTop: 5}}
					/>
				</TouchableOpacity>
				<RBSheet
					ref={(ref) => {
						this.RBSheet = ref;
					}}
					height={400}
					openDuration={300}
					closeOnPressMask={true}
					closeOnDragDown={true}
					customStyles={{
						wrapper: {backgroundColor: 'rgba(0,0,0,.7)'},
						draggableIcon: {backgroundColor: '#fff'},
					}}>
					<Authentication sheetClose={this.sheetClose} />
				</RBSheet>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {favourite: state.products.favourite};
};

export default connect(mapStateToProps, {addRemoveFavourite})(
	AddRemoveFavourite,
);