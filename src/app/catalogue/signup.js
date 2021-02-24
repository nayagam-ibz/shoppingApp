import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {textInput} from '../shared/form-elements';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import {validation} from '../validations';
import {
	userRegistration,
	StoreUserToken,
} from '../../app/store/actions/products';
import {handleResponse} from '../utils/Axios';
import Loader from '../shared/loader';

class Form extends React.Component {
	state = {loading: false};

	_userSignUp(values) {
		this.setState({loading: true});
		return this.props
			.userRegistration({user: values})
			.then((data) => {
				if(data.payload.data.message === "Sign up Successfully!"){
					this.setState({loading: false})
				    const responseObj = handleResponse(data.payload)
				    StoreUserToken(responseObj.accessToken)
				    this.props.navigation.navigate('Home')
				} else {
			    throw(handleResponse(data.payload).errors);
			    this.setState({ loading:false })
			  }
			})
			.catch((error) => {
				this.setState({loading: false});
				throw new SubmissionError(error);
			});
	}

	// componentDidMount() {
	// 	this.props.change('email', 'spree123@example.com');
	// 	this.props.change('password', 'spree123jj');
	// 	this.props.change('passwordConfirmation', 'spree123jj');
	// }

	render() {
		const {handleSubmit, error} = this.props;
		return (
			<ScrollView style={styles.container}>
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
					<Text style={styles._headerAuthText}>Sign Up to My Shop</Text>
					<View style={styles._formGroup}>
						<Field
							name="email"
							component={textInput}
							label="Email Address"
							underlineColorAndroid="transparent"
							styleName="signInput"
						/>
					</View>
					<View style={styles._formGroup}>
						<Field
							name="password"
							component={textInput}
							label="Password"
							secureTextEntry={true}
							underlineColorAndroid="transparent"
							styleName="signInput"
						/>
					</View>

					<View style={styles._formGroup}>
						<Field
							name="passwordConfirmation"
							component={textInput}
							label="Password Confirmation"
							secureTextEntry={true}
							underlineColorAndroid="transparent"
							styleName="signInput"
						/>
					</View>
					<TouchableOpacity
						style={[styles._cartBtn, {marginTop: 15}]}
						onPress={handleSubmit(this._userSignUp.bind(this))}>
						<Text style={[styles._cartText, {textAlign: 'center'}]}>
							SIGN UP NOW
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles._positionEnd}>
					<View style={styles._flexRow}>
						<Text style={styles._regiText}> Already Registered ? </Text>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Signin')}>
							<Text style={styles._sigText}> Sign in  </Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const signupForm = reduxForm({
	form: 'form',
	validate: validation,
})(Form);

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, {userRegistration})(signupForm);

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
		fontSize: 20,
		fontFamily: 'Montserrat-Medium',
		color: '#3B2D46',
		textAlign: 'center',
		paddingVertical: 30,
	},

	_formGroup: {
		marginBottom: 15,
	},

	_positionEnd: {
		marginTop: 30
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