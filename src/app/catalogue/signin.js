import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {textInput} from '../shared/form-elements';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import {validation} from '../validations';

class Form extends React.Component {
	_submitProfile(values) {
		this.props.navigation.navigate('Checkout');
	}

	render() {
		const {handleSubmit} = this.props;
		return (
			<View style={{flex: 1}}>
				<LinearGradient
					start={{x: 0, y: 0.9}}
					end={{x: 1, y: 0.1}}
					colors={['#3B2D46', '#7B5996']}
					style={styles._headerAuth}>
					<View style={styles._flexRow}>
						<Text style={[styles._titleApp, {color: '#E7B844'}]}>My</Text>
						<Text style={[styles._titleApp, {color: '#fff'}]}>Shop</Text>
					</View>
				</LinearGradient>
				<View style={{paddingHorizontal: 10}}>
					<Text style={styles._headerAuthText}>Sign in to My Shop</Text>
					<View style={styles._formGroup}>
						<Field
							name="email"
							component={textInput}
							label="Email Address"
							underlineColorAndroid="transparent"
						/>
					</View>
					<View style={styles._formGroup}>
						<Field
							name="password"
							component={textInput}
							label="Password"
							secureTextEntry={true}
							underlineColorAndroid="transparent"
						/>
					</View>
					<TouchableOpacity
						style={[styles._cartBtn, {marginTop: 15}]}
						onPress={handleSubmit(this._submitProfile.bind(this))}>
						<Text style={[styles._cartText, {textAlign: 'center'}]}>
							SIGN IN NOW
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles._positionEnd}>
					<View style={styles._flexRow}>
						<Text style={styles._regiText}>Not Registered Yet? </Text>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Signup')}>
							<Text style={styles._sigText}> REGISTERED NOW </Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const signinForm = reduxForm({
	form: 'signform',
	validate: validation,
})(Form);

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, {})(signinForm);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	_headerAuth: {
		width: '100%',
		height: 150,
		backgroundColor: 'red',
		borderBottomRightRadius: 1000,
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
		letterSpacing: 1,
		fontFamily: 'Montserrat-ExtraBold',
	},

	_headerAuthText: {
		fontSize: 25,
		fontFamily: 'Montserrat-Medium',
		color: '#3B2D46',
		textAlign: 'center',
		paddingVertical: 30,
	},

	_formGroup: {
		marginBottom: 15,
	},

	_positionEnd: {
		width: '94%',
		position: 'absolute',
		bottom: 20,
		left: 10,
		right: 10,
		borderColor: '#eee',
		borderRadius: 3,
	},

	_cartBtn: {
		backgroundColor: 'orange',
		paddingHorizontal: 70,
		paddingVertical: 10,
		borderRadius: 3,
		marginBottom: 5,
		width: '100%',
	},

	_cartText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 14,
		color: '#fff',
	},

	_regiText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 14,
	},

	_sigText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 12,
		color: 'orange',
	},
});