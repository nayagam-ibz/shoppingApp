import React, {Component} from 'react';
import {
	Text,
	View,
	SafeAreaView,
	StyleSheet,
	Image,
	TouchableOpacity,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LogoutConfirmaton from './shared/logoutConfirmation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Authentication from './shared/authentication'; 
import RBSheet from 'react-native-raw-bottom-sheet';
import { CurrentUser } from '../app/store/actions/products';
import { connect } from 'react-redux';

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {modalVisible: false, logout: false };
		this.confirmationModal = this.confirmationModal.bind(this);
	}

	confirmationModal(res) {
		console.log(res);
		if (res == true) {
			this.setState({modalVisible: true});
		} else {
			this.setState({modalVisible: false, logout: false});
		}
	}

	componentDidMount() {
    return CurrentUser().then((token) => {
			if (token) {
				this.setState({logout: true })
			}
		})
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

	sheetClose = (res) => {
		this.RBSheet.close();
		if(res === true){
			this.setState({logout: true})
		}
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
				</LinearGradient>
				<View style={styles._accountSubHeader}>
					<Image
						source={{uri: initialData && initialData.url}}
						style={styles._userProfile} />
					{this.state.logout ? 
						<View style={{ paddingLeft: 10}}>
							<Text style={styles._userName}>
								{initialData && initialData.name}
							</Text>
							<Text style={styles._userCaption}>
								{initialData && initialData.email}
							</Text>
						</View>
					 : 
           <TouchableOpacity style={styles._loginBtn} onPress={this.onNavigation}>  
					   <Text style={styles._loginText}>LOG IN / SIGN UP</Text>
           </TouchableOpacity>
					}	
				</View>
				<View style={styles._menuView}>
					<TouchableOpacity style={styles._accountMenu} onPress={() => this.onNavigation('Myorders')}>
					  <View style={styles._flexRow}>
							<SimpleLineIcons name="social-dropbox" size={20} color="#333" style={styles._menuIcon}/>
							<View>
								<Text style={styles._menuTitle}>My Orders</Text>
							  <Text style={styles._submenTitle}>Check you orders status</Text> 
							</View>  
						</View>	
						<EvilIcons name="chevron-right" size={20} color="#3B2D46" />
					</TouchableOpacity>
					<TouchableOpacity style={styles._accountMenu} onPress={() => this.onNavigation('Wishlist')}>
					  <View style={styles._flexRow}>
							<Entypo name="heart-outlined" size={22} color="#333" style={styles._menuIcon}/>
							<View>
								<Text style={styles._menuTitle}>My Wishlist</Text>
							  <Text style={styles._submenTitle}>Your most loved styles</Text> 
							</View>  
						</View>	
						<EvilIcons name="chevron-right" size={20} color="#3B2D46" />
					</TouchableOpacity>
					{this.state.logout &&(
						<TouchableOpacity
							style={styles._accountMenu}
							onPress={() => this.confirmationModal(true)}>
							<View style={styles._flexRow}> 
								<Feather name="log-out" size={18} color="#3B2D46" style={styles._menuIcon}/>
								<Text style={styles._menuTitle}>Log Out</Text>
						  </View>		
						</TouchableOpacity>
					)}
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
		height: 80,
		backgroundColor: '#eee',
		paddingHorizontal: 10,
		justifyContent: 'center',
	},

	_userName: {
		fontSize: 16,
		fontFamily: 'Montserrat-Medium',
		color: '#333',
	},
	_userCaption: {
		fontSize: 12,
		color: '#333',
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
		marginTop: 20,
	},

	_flexRow: {
		flexDirection:'row',
		alignItems:'center',
	},

	_accountMenu: {
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor:'#eee',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center'
	},

	_menuTitle: {
		fontFamily: 'Montserrat-Medium',
		color: '#333',
		fontSize: 14
	},

	_submenTitle: {
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    color:'#7a7a7a',
    marginTop: 5
	},

	_menuIcon: {
		width: 35,
	},

	_userProfile: {
		width: 115,
		height: 125,
		backgroundColor:'#fff',
		borderRadius: 3,
		borderWidth: 1,
		borderColor: '#eee',
		marginTop: -60
	},

	_accountSubHeader: {
	  flexDirection: 'row',
	  paddingHorizontal: 10, 
	  backgroundColor:'#fff', 
	  height: 90,
	  alignItems:'center',
	},

	_loginBtn: {
		backgroundColor:'orange', 
		paddingVertical: 13, 
		alignItems:'center', 
		justifyContent:'center', 
		width: '61%', 
		marginLeft: 15, 
		marginRight: 10, 
		borderRadius: 3
	},

	_loginText: {
		color:'#fff',
		fontFamily: 'Montserrat-Medium',
	}

});
