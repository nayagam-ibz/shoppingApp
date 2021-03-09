import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import store from '../store/reducers';
import {setInitialData} from '../../app/store/actions/products';
import InitialData from '../../app/json/initialData.json';
import AsyncStorage from '@react-native-community/async-storage';

class Splash extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showApp: false,
		};
	}

	componentDidMount() {
		store.dispatch(setInitialData(InitialData));
		AsyncStorage.getItem('hasLaunched').then((value) => {
			if(value === "appLaunched") {
				this.setState({showApp: !!value, loading: false});
				setTimeout(() => {
					this.props.navigation.navigate('HomeApp');
				}, 200);
			}
		});
	}

	_onDone = () => {
		AsyncStorage.setItem('hasLaunched', 'appLaunched').then(() => {
			this.setState({showApp: true});
			this.props.navigation.navigate('HomeApp');
		});
	};

	render() {
		if (this.state.showApp) {
			return (
				<View
					style={styles._splashCenter}>
					<Text style={styles._welcomeText}>Welcome To</Text>
					<Text style={styles._shopText}>My Shop</Text>
				</View>
			);
		} else {
			return (
				<View style={styles.container}>
					<ImageBackground
						source={require('../../../assets/images/cover.png')}
						style={{flex: 1}}>
						<View style={styles._headerSection}></View>
						<Animatable.View animation="fadeInUpBig">
							<LinearGradient
								start={{x: 0, y: 0.85}}
								end={{x: 1, y: 0.15}}
								colors={['#3B2D46', '#7B5996']}
								style={styles._footerSection}>
								<View style={[styles._flexRow, {paddingBottom: 20}]}>
									<Text style={[styles._titleApp, {color: '#E7B844'}]}>My</Text>
									<Text style={[styles._titleApp, {color: '#fff'}]}>Shop</Text>
								</View>
								<Text style={styles._subTitleApp}>
									Lorazepam, sold under the brand name Ativan among others
								</Text>
								<TouchableOpacity
									style={styles._getStarted_btn}
									onPress={this._onDone}>
									<Text style={styles._btn_text}>GET STARTED</Text>
								</TouchableOpacity>
							</LinearGradient>
						</Animatable.View>
					</ImageBackground>
				</View>
			);
		}
	}
}

export default Splash;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#B2A6BC',
	},

	_splashCenter: {
    flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 50,
		backgroundColor: '#3B2D46'
	},

	_welcomeText: {
		fontSize: 30,
		marginBottom: 10,
		color:'#fff',
		fontFamily: 'Montserrat-SemiBold',
	},

	_shopText: {
		fontSize: 25,
		color:'#fff',
		fontFamily: 'Montserrat-SemiBold',
	},

	_headerSection: {
		flex: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},

	_footerSection: {
		flex: 1,
		backgroundColor: '#41314E',
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		paddingVertical: 110,
		paddingHorizontal: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},

	_flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},

	_titleApp: {
		fontSize: 30,
		marginBottom: 25,
		marginTop: 10,
		fontFamily: 'Montserrat-ExtraBold',
	},

	_subTitleApp: {
		textAlign: 'center',
		color: '#fff',
		lineHeight: 20,
		fontFamily: 'Montserrat-Medium',
		paddingVertical: 5,
		fontSize: 15,
	},

	_btn_text: {
		color: '#fff',
		fontSize: 14,
		fontFamily: 'Montserrat-Medium',
	},

	_getStarted_btn: {
		backgroundColor: '#E7B844',
		width: '100%',
		borderRadius: 3,
		paddingVertical: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
		marginBottom: 10,
	},
});