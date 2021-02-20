import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	FlatList,
	StyleSheet,
	Modal
} from 'react-native';
import CustomHeader from '../header/header';
import {getAllAddress, deleteAddress } from '../../app/store/actions/products';
import {connect} from 'react-redux';
import Loader from '../shared/loader';

class ManageAddress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			modalVisible: false,
			itemId: null
		};
	}

	componentDidMount() {
		this.props.getAllAddress();
		setTimeout(() => this.setState({loading: false}), 2000);
	}

	setModalVisible = (visible, id) => {
		this.setState({modalVisible: visible, itemId: id});
	};

	delteAddress = (id) => {
   this.props.deleteAddress()
   this.setState({modalVisible: false});
	}

	render() {
		const {allAddress} = this.props;
		const {modalVisible, itemId} = this.state;
		return (
			<View style={styles._container}>
				<Loader loading={this.state.loading} />
				<CustomHeader
					navigation={this.props.navigation}
					isHeader="Manage Address"
					isBack="isBack"
					name="Account"
				/>
				<ScrollView style={{flex: 1}}>
					<View style={{paddingHorizontal: 10, paddingVertical: 10, flex: 1}}>
						<FlatList
							data={allAddress && allAddress}
							keyExtractor={(item, index) => index}
							renderItem={({item}) => (
								<View style={styles._addressRow}>
									<Text style={styles._addressName}>{item.addressname}</Text>
									<Text style={styles._addressGray}>{item.address}</Text>
									<Text
										style={
											styles._addressGray
										}>{`${item.city} - ${item.zipcode}`}</Text>
									<Text style={styles._addressGray}>{item.country}</Text>
									<View style={styles._actionRow}>
										<TouchableOpacity
											onPress={() =>
												this.props.navigation.navigate('NewAddress')
											}
											style={[styles._actionBtn, {marginRight: 10}]}>
											<Text style={styles._actionText}>EDIT</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={styles._actionBtn}
											onPress={() => this.setModalVisible(true, item.id)}>
											<Text style={styles._actionText}>DELETE</Text>
										</TouchableOpacity>
									</View>
								</View>
							)}
						/>
					</View>
				</ScrollView>
				<View style={styles._flexEnd}>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('NewAddress')}
						style={styles._cartBtn}>
						<Text style={styles._cartText}>ADD NEW ADDRESS</Text>
					</TouchableOpacity>
				</View>
				<Modal animationType="fade" transparent={true} visible={modalVisible}>
					<View style={styles._centeredView}>
						<View style={[styles._modalView, {borderRadius: 3}]}>
              <Text style={styles._deleteBold}>Are you sure</Text>
              <Text style={styles._deleteMedium}>Do you really want to delete this address? </Text>
              <View style={styles._actionRow}>
								<TouchableOpacity style={[styles._actionBtn, {marginRight: 10}]} onPress={() => this.setModalVisible(false)}>
									<Text style={styles._actionText}>CANCEL</Text>
								</TouchableOpacity>
								<Text>{itemId}.....</Text>
								<TouchableOpacity style={styles._actionBtn} onPress={() => this.delteAddress(itemId)}>
									<Text style={styles._actionText}>YES, DELETE</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		allAddress: state.products.allAddress,
	};
};

export default connect(mapStateToProps, {getAllAddress, deleteAddress})(ManageAddress);

const styles = StyleSheet.create({
	_container: {
		flex: 1,
		backgroundColor: '#F3F3F3',
	},

	_addressRow: {
		backgroundColor: '#fff',
		marginBottom: 10,
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 4,
	},

	_addressName: {
		fontFamily: 'Montserrat-SemiBold',
		paddingBottom: 5,
		fontSize: 14,
	},

	_addressGray: {
		fontFamily: 'Montserrat-Regular',
		color: '#7a7a7a',
		fontSize: 13,
	},

	_actionText: {
		fontSize: 11,
		fontFamily: 'Montserrat-SemiBold',
		color: 'red',
	},

	_actionRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingBottom: 5,
	},

	_flexEnd: {
		width: '100%',
		backgroundColor: '#fff',
		position: 'absolute',
		bottom: 0,
		borderWidth: 1,
		borderColor: '#eee',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingHorizontal: 15,
		paddingVertical: 10,
		justifyContent: 'center',
	},

	_cartBtn: {
		backgroundColor: 'orange',
		paddingHorizontal: 70,
		paddingVertical: 10,
		borderRadius: 3,
	},

	_cartText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 14,
		color: '#fff',
		textAlign: 'center',
	},

	_modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 18,
		padding: 20,
		alignItems:'center'
	},

	_centeredView: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},

	_deleteBold: {
		fontSize: 18,
		fontFamily: 'Montserrat-SemiBold',
	},

	_deleteMedium: {
		fontFamily: 'Montserrat-Regular',
		color: '#7a7a7a',
		fontSize: 15,
		textAlign:'center'
	},

	_actionBtn: {
		paddingVertical: 5
	}
});