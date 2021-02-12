import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {textInput} from '../shared/form-elements';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';


class Form extends React.Component {
	_submitProfile(values) {
		console.log(values);
	}

	render() {
		const {handleSubmit} = this.props;
		return (
			<View style={styles.container}>
			  <View style={{paddingHorizontal: 10}}>
					<View style={styles._formGroup}>
						<Field
							name="name"
							component={textInput}
							label="Name"
						/>
					</View>

					<View style={styles._formGroup}>
						<Field
							name="phoneNumber"
							component={textInput}
							label="PhoneNumber"
						/>
					</View>
			  </View>
				<View style={styles._flexEnd}>
					<TouchableOpacity
						style={styles._cartBtn}
						onPress={handleSubmit(this._submitProfile.bind(this))}>
						<Text style={[styles._cartText, {textAlign: 'center'}]}>
							Submit Profile
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
		marginTop: 15
	},

	_formGroup: {
		marginBottom: 25,
	},

	_flexEnd: {
		width: '94%',
		position: 'absolute',
		bottom: 0,
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

});