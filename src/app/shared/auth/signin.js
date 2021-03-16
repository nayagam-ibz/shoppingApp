import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {textInput} from '../../shared/form-elements';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import {validation} from '../../validations';
import {userLogin, StoreUserToken} from '../../../app/store/actions/products';
import {handleResponse} from '../../utils/Axios';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../shared/loader';
import Styles from '../../../../assets/style';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

class Form extends React.Component {
	state = {loading: false, password: true};

  
	_visiblePassword = (ev) => {
		this.setState({password: !this.state.password});
	};

	_userSignIn(values) {
		this.setState({loading: true});
		return this.props
			.userLogin(values)
			.then((data) => {
				if (data.payload.data.message === 'Logged in Successfully!') {
					this.setState({loading: false});
					const responseObj = handleResponse(data.payload);
					StoreUserToken(responseObj.accessToken);
					this.props.onClose(true);
				} else {
					throw handleResponse(data.payload.data).errors;
					this.setState({loading: false});
				}
			})
			.catch((error) => {
				this.setState({loading: false});
				throw new SubmissionError(error);
			});
	}

	componentDidMount() {
		this.props.change('username', 'spree@example.com');
		this.props.change('password', 'spree123');
	}

	render() {
		const {handleSubmit, error} = this.props;
		return (
			<View>
				<Loader loading={this.state.loading} />
				<View style={{paddingHorizontal: 10}}>
					<View style={[Styles._spaceBetween, {marginBottom: 20}]}>
						<Text style={Styles._headerAuthText}>Login</Text>
						<TouchableOpacity onPress={this.props.onClose}>
							<EvilIcons name="close" size={20} color="#333" />
						</TouchableOpacity>
					</View>
					<Text>{error}</Text>
					<View style={Styles._formGroup}>
						<Field
							name="username"
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
							secureTextEntry={this.state.password}
							underlineColorAndroid="transparent"
							styleName="signInput"
						/>
						<TouchableOpacity onPress={this._visiblePassword} style={Styles._passwordPosition}>
							<Text style={Styles._passwordText}>
								{this.state.password === true ? 'Hide' : 'Show'}
							</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={[Styles._cartBtn, {marginTop: 30}]}
						onPress={handleSubmit(this._userSignIn.bind(this))}>
						<Text style={[Styles._cartText, {textAlign: 'center'}]}>
							SIGN IN NOW
						</Text>
					</TouchableOpacity>
				</View>
				<View style={[Styles._flexRow, {marginTop: 10}]}>
					<Text style={Styles._regiText}>Not Registered Yet? </Text>
					<TouchableOpacity onPress={this.props.changeRegistration}>
						<Text style={Styles._sigText}> Registered Now </Text>
					</TouchableOpacity>
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

export default connect(mapStateToProps, {userLogin, StoreUserToken})(
	signinForm,
);