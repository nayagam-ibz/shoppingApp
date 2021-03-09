import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Styles from '../../../assets/style';
import { addRemoveFavourite, CurrentUser } from '../../app/store/actions/products';
import { connect } from 'react-redux';																																														

class AddRemoveFavourite extends Component {

	constructor() {
    super();
    this.state = {
      selectedIds:[]
    };
  }
	onChangeFavourite = (id) => {
		const { item } = this.props
		var selectedIds = [...this.state.selectedIds]
    if(selectedIds.includes(id))
     selectedIds = selectedIds.filter(_id => _id !== id)
   else 
     selectedIds.push(id)

   this.setState({selectedIds})
	}
	render() {
		const {favId} = this.props;
		return (
			<View>
				<TouchableOpacity style={Styles._itemFavourite} onPress={() => this.onChangeFavourite(favId)}>
					<Entypo name="heart-outlined" size={18} color='#3B2D46' style={{paddingTop: 2}} />
					<Text>{this.state.selectedIds.includes(item.id) ? "styles.selected" : "null"}</Text>
				</TouchableOpacity>

				<RBSheet ref={(ref) => {this.RBSheet = ref;}}
						height={400}
						openDuration={300} closeOnPressMask={true} closeOnDragDown={true}
						customStyles={{
					    wrapper: {
					      backgroundColor: 'rgba(0,0,0,.7)',
					    },
					    draggableIcon: {
					      backgroundColor: '#fff',
					    },
					  }}>
						<Authentication sheetClose={this.sheetClose}/>
					</RBSheet>
			</View>		

		);
	}
}



const mapStateToProps = (state) => {
  return {}
};

export default connect(mapStateToProps, {addRemoveFavourite})(AddRemoveFavourite);

