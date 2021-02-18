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

class Splash extends Component {
	componentDidMount() {
		store.dispatch(setInitialData(InitialData));
	}
	render() {
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
								onPress={() => this.props.navigation.navigate('HomeApp')}>
								<Text style={styles._btn_text}>Get Started</Text>
							</TouchableOpacity>
						</LinearGradient>
					</Animatable.View>
				</ImageBackground>
			</View>
		);
	}
}

export default Splash;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#B2A6BC',
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
		paddingVertical: 120,
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
		fontSize: 25,
		marginBottom: 15,
		fontFamily: 'Montserrat-ExtraBold',
	},

	_subTitleApp: {
		textAlign: 'center',
		color: '#fff',
		lineHeight: 20,
		fontFamily: 'Montserrat-Regular',
		paddingVertical: 5,
	},

	_btn_text: {
		color: '#fff',
		fontSize: 15,
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
		marginBottom: 20,
	},
});
