import React, {Component} from 'react';
import {
	Text,
	View,
	SafeAreaView,
	StyleSheet,
	Image,
	TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';

class Account extends Component {
	render() {
		const {initialData} = this.props 
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
							<Text style={styles._userName}>{initialData && initialData.name}</Text>
							<Text style={styles._userCaption}>{initialData && initialData.email}</Text>
						</View>
					</View>
					<TouchableOpacity style={styles._editProfile} onPress={() => this.props.navigation.navigate("Profile")}>
						<Feather name="edit-2" size={18} color="#3B2D46" />
					</TouchableOpacity>
				</LinearGradient>
				<View style={styles._menuView}>
					<TouchableOpacity style={styles._accountMenu} onPress={() => this.props.navigation.navigate("Aaddress")}>
						<Feather
							name="map-pin"
							size={18}
							color="#3B2D46"
							style={styles._menuIcon}
						/>
						<Text style={styles._menuTitle}>Shipping Address </Text>
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
					<TouchableOpacity style={styles._accountMenu} onPress={() => this.props.navigation.navigate('Myorders')}>
						<MaterialCommunityIcons
							name="truck-fast-outline"
							size={18}
							color="#3B2D46"
							style={styles._menuIcon}
						/>
						<Text style={styles._menuTitle}>My Orders</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles._accountMenu}>
						<Feather
							name="log-out"
							size={18}
							color="#3B2D46"
							style={styles._menuIcon}
						/>
						<Text style={styles._menuTitle}>Log Out</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}
}


const mapStateToProps = (state) => {
	return {initialData: state.products.initialData};
};

export default connect(mapStateToProps, {})(Account);

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