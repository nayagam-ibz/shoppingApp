import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from 'react-native';
import CustomHeader from '../header/header';
import {textInput, selectPicker} from '../shared/form-elements';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {validation} from '../validations';
import {connect} from 'react-redux';

const country = [
	{id: 1, name: 'india'},
	{id: 2, name: 'America'},
];
const state = [
	{id: 1, name: 'Tamil Nade'},
	{id: 2, name: 'Kerla'},
];
const city = [
	{id: 1, name: 'Chennai'},
	{id: 2, name: 'villupuram'},
	{id: 1, name: 'Trichy'},
];

class Form extends React.Component {
	_submitAddress(values) {
		console.log(values);
	}

	render() {
		const {error, handleSubmit} = this.props;
		return (
			<ScrollView style={styles.container}>
				<CustomHeader
					navigation={this.props.navigation}
					isHeader="Shipping Address"
					isBack="isBack"
					name="Account"
				/>
				<View style={{paddingHorizontal: 10, marginTop: 15, paddingBottom: 20}}>
					{error && <Text>{error}</Text>}
					<View style={styles._formGroup}>
						<Field
							name="firstname"
							component={textInput}
							label="First Name"
							underlineColorAndroid="transparent"
						/>
					</View>
					<View style={styles._formGroup}>
						<Field
							name="lastname"
							component={textInput}
							label="Last Name"
							underlineColorAndroid="transparent"
						/>
					</View>
					<View style={styles._formGroup}>
						<Field
							name="address1"
							component={textInput}
							label="Address1"
							underlineColorAndroid="transparent"
						/>
					</View>
					<View style={styles._formGroup}>
						<Field
							name="address2"
							component={textInput}
							label="Address2"
							underlineColorAndroid="transparent"
						/>
					</View>
					<View style={{flexDirection: 'row', justifyContetn: 'center'}}>
						<View style={[styles._formGroup, {flex: 1, marginRight: 5}]}>
							<Field
								name="phone"
								component={textInput}
								label="Phone"
								underlineColorAndroid="transparent"
							/>
						</View>
						<View style={[styles._formGroup, {flex: 1, marginLeft: 5}]}>
							<Field
								name="alternative_phone"
								component={textInput}
								label="Alternative Phone"
								underlineColorAndroid="transparent"
							/>
						</View>
					</View>
					<View style={styles._formGroup}>
						<Field
							name="country_id"
							component={selectPicker}
							label="Country"
							optionValue={country}
						/>
					</View>
					<View style={styles._formGroup}>
						<Field
							name="state_id"
							component={selectPicker}
							label="State"
							optionValue={state}
						/>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContetn: 'center',
							paddingBottom: 20,
						}}>
						<View style={[styles._formGroup, {flex: 1, marginRight: 5}]}>
							<Field
								name="city"
								component={selectPicker}
								label="City"
								optionValue={city}
							/>
						</View>
						<View style={[styles._formGroup, {flex: 1, marginLeft: 5}]}>
							<Field name="zipcode" component={textInput} label="Zip Code" />
						</View>
					</View>
					<TouchableOpacity
						style={styles._cartBtn}
						onPress={handleSubmit(this._submitAddress.bind(this))}>
						<Text style={[styles._cartText, {textAlign: 'center'}]}>
							SUBMIT
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}

const addressForm = reduxForm({
	form: 'form',
	validate: validation,
})(Form);

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, {})(addressForm);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	_formGroup: {
		marginBottom: 10,
	},

	_cartBtn: {
		backgroundColor: 'orange',
		paddingHorizontal: 70,
		paddingVertical: 10,
		borderRadius: 3,
		width: '100%',
	},

	_cartText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 14,
		color: '#fff',
	},
});