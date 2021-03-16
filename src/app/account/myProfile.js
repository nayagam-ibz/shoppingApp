import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {textInput} from '../shared/form-elements';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import CustomHeader from '../header/header';

class Form extends React.Component {
	_submitProfile(values) {
		console.log(values);
	}

	render() {
		const {handleSubmit} = this.props;
		return (
			<View style={styles.container}>
				<CustomHeader
					navigation={this.props.navigation}
					isHeader="Edit Your Account"
					isBack="isBack"
					name="Account"
				/>
				<View style={{paddingHorizontal: 10, paddingVertical: 40}}>
					<View style={styles._formGroup}>
						<Field
							name="email"
							component={textInput}
							label="Email"
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

					<View style={styles._formGroup}>
						<Field
							name="password_confirmation"
							component={textInput}
							label="Password Confirmation"
							secureTextEntry={true}
							underlineColorAndroid="transparent"
						/>
					</View>
					<TouchableOpacity
						style={[styles._cartBtn, {marginTop: 50}]}
						onPress={handleSubmit(this._submitProfile.bind(this))}>
						<Text style={[styles._cartText, {textAlign: 'center'}]}>
							UPDATE ACCOUNT
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const profileForm = reduxForm({
	form: 'custoerProfileForm',
})(Form);

const mapStateToProps = (state) => {
	return {
		products: state.products,
	};
};

export default connect(mapStateToProps, {})(profileForm);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#f3f3f3'
	},

	_formGroup: {
		marginBottom: 15,
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
});