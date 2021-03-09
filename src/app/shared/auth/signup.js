import React from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {View, Text, TouchableOpacity} from 'react-native';
import {textInput} from '../../shared/form-elements';
import {handleResponse} from '../../utils/Axios';
import {validation} from '../../validations';
import Styles from '../../../../assets/style';
import {
	userRegistration,
	StoreUserToken,
} from '../../../app/store/actions/products';
import Loader from '../../shared/loader';
import {connect} from 'react-redux';

class Form extends React.Component {
	state = {loading: false};
	_userSignUp(values) {
		this.setState({loading: true});
		return this.props
			.userRegistration({user: values})
			.then((data) => {
				if (data.payload.data.message === 'Sign up Successfully!') {
					this.setState({loading: false});
					const responseObj = handleResponse(data.payload);
					StoreUserToken(responseObj.accessToken);
					this.props.onClose();
				} else {
					throw handleResponse(data.payload).errors;
					this.setState({loading: false});
				}
			})
			.catch((error) => {
				this.setState({loading: false});
				throw new SubmissionError(error);
			});
	}

	render() {
		const {handleSubmit, error} = this.props;
		return (
			<View>
				<View style={{paddingHorizontal: 10}}>
					<View style={[Styles._spaceBetween, {marginBottom: 20}]}>
						<Text style={Styles._headerAuthText}>Signup</Text>
						<TouchableOpacity onPress={this.props.onClose}>
							<EvilIcons name="close" size={20} color="#333" />
						</TouchableOpacity>
					</View>
					<View style={Styles._formGroup}>
						<Field
							name="email"
							component={textInput}
							label="Email Address"
							underlineColorAndroid="transparent"
							styleName="signInput"
						/>
					</View>
					<View style={Styles._formGroup}>
						<Field
							name="password"
							component={textInput}
							label="Password"
							secureTextEntry={true}
							underlineColorAndroid="transparent"
							styleName="signInput"
						/>
					</View>
					<View style={Styles._formGroup}>
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
						style={[Styles._cartBtn, {marginTop: 10}]}
						onPress={handleSubmit(this._userSignUp.bind(this))}>
						<Text style={[Styles._cartText, {textAlign: 'center'}]}>
							SIGN UP NOW
						</Text>
					</TouchableOpacity>
				</View>
				<View style={[Styles._flexRow, {marginTop: 10}]}>
					<Text style={Styles._regiText}> Already Registered ? </Text>
					<TouchableOpacity onPress={this.props.changeLogin}>
						<Text style={Styles._sigText}> Sign in </Text>
					</TouchableOpacity>
				</View>
			</View>
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