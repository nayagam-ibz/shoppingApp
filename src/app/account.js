import React, {Component} from 'react';
import {
	Text,
	View,
	SafeAreaView,
	StyleSheet,
	Image,
	TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LogoutConfirmaton from './shared/logoutConfirmation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { CurrentUser } from '../app/store/actions/products';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Authentication from './shared/authentication'; 
import RBSheet from 'react-native-raw-bottom-sheet';
import { connect } from 'react-redux';

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {modalVisible: false};
		this.confirmationModal = this.confirmationModal.bind(this);
	}

	confirmationModal(res) {
		console.log(res);
		if (res == true) {
			this.setState({modalVisible: true});
		} else {
			this.setState({modalVisible: false});
			setTimeout(() => {
				this.props.navigation.navigate('Catalogue', {screen: 'Signin'});
			}, 200);
		}
	}

	onNavigation = (navigation) => {
		return CurrentUser().then((token) => {
			if (!token) {
				this.RBSheet.open();
				return;
			}else {
	      this.props.navigation.navigate(navigation) 
			}
		})
	}

	sheetClose = () => {
		this.RBSheet.close();
	} 

	render() {
		const {initialData} = this.props;
		return (
			<SafeAreaView style={styles._accountContainer}>
				<LinearGradient
					start={{x: 0, y: 0.9}}
					end={{x: 1, y: 0.1}}
					colors={['#3B2D46', '#7B5996']}
					style={styles._accountHeader}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Image
							source={{uri: initialData && initialData.url}}
							style={{
								width: 70,
								height: 70,
								borderRadius: 100,
								borderWidth: 1,
								borderColor: '#eee',
							}}
						/>
						<View style={{marginLeft: 15, flexDirection: 'column'}}>
							<Text style={styles._userName}>
								{initialData && initialData.name}
							</Text>
							<Text style={styles._userCaption}>
								{initialData && initialData.email}
							</Text>
						</View>
					</View>
					<TouchableOpacity
						style={styles._editProfile}
						onPress={() => this.onNavigation('Profile')}>
						<Feather name="edit-2" size={18} color="#3B2D46" />
					</TouchableOpacity>
				</LinearGradient>
				<View style={styles._menuView}>
					<TouchableOpacity
						style={styles._accountMenu}
						onPress={() => this.onNavigation('ManageAddress')}>
						<Feather
							name="map-pin"
							size={18}
							color="#3B2D46"
							style={styles._menuIcon}
						/>
						<Text style={styles._menuTitle}>Manage Address </Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles._accountMenu}>
						<Feather
							name="credit-card"
							size={18}
							color="#3B2D46"
							style={styles._menuIcon}
						/>
						<Text style={styles._menuTitle}>Payment Methods</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles._accountMenu} onPress={() => this.onNavigation('Myorders')}>
						<MaterialCommunityIcons name="truck-fast-outline" size={18} color="#3B2D46" style={styles._menuIcon}/>
						<Text style={styles._menuTitle}>My Orders</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles._accountMenu}
						onPress={() => this.confirmationModal(true)}>
						<Feather
							name="log-out"
							size={18}
							color="#3B2D46"
							style={styles._menuIcon}
						/>
						<Text style={styles._menuTitle}>Log Out</Text>
					</TouchableOpacity>
				</View>
				{this.state.modalVisible && (
					<LogoutConfirmaton
						visbility={this.state.modalVisible}
						confirmationModal={() => this.confirmationModal(false)}
					/>
				)}

				<RBSheet ref={(ref) => {this.RBSheet = ref;}}
					height={400}
					openDuration={300} closeOnPressMask={true} closeOnDragDown={true}
					customStyles={{
				    wrapper: {backgroundColor: 'rgba(0,0,0,.7)'},
				    draggableIcon: {backgroundColor: '#fff'},
				  }}>
					<Authentication sheetClose={this.sheetClose}/>
				</RBSheet>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = (state) => {
	return {initialData: state.products.initialData};
};

export default connect(mapStateToProps, {CurrentUser})(Account);

const styles = StyleSheet.create({
	_accountContainer: {
		flex: 1,
		backgroundColor: '#f3f3f3',
	},

	_accountHeader: {
		height: 120,
		backgroundColor: '#3B2D46',
		borderBottomRightRadius: 100,
		paddingHorizontal: 10,
		justifyContent: 'center',
	},

	_userName: {
		fontSize: 16,
		marginTop: 3,
		fontFamily: 'Montserrat-Medium',
		color: '#fff',
	},
	_userCaption: {
		fontSize: 12,
		marginTop: 5,
		color: '#fff',
		fontFamily: 'Montserrat-Medium',
	},

	_editProfile: {
		backgroundColor: '#fff',
		width: 40,
		height: 40,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		right: 10,
		top: 60,
		elevation: 2,
	},

	_menuView: {
		paddingHorizontal: 10,
		marginTop: 10,
	},

	_accountMenu: {
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		paddingVertical: 12,
		borderRadius: 5,
		elevation: 2,
		marginTop: 15,
		flexDirection: 'row',
		alignItems: 'center',
	},

	_menuTitle: {
		fontFamily: 'Montserrat-Medium',
		color: '#3B2D46',
	},

	_menuIcon: {
		width: 30,
	},
});
