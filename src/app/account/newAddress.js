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
import {getCountries, createAddress, getStates} from '../../app/store/actions/products';
import {validation} from '../validations';
import {connect} from 'react-redux';

class Form extends React.Component {
	_submitAddress(values) {
		console.log(values);
		this.props.createAddress(values).then((data) => {
			this.props.reset()
		});
	} 

	componentDidMount() {
		this.props.getCountries()
		const id = 99;
		this.props.getStates(id);
	}

	render() {
		const {error, handleSubmit, countries, getStates} = this.props;
		console.log(getStates)
		return (
			<View style={styles.container}>
				<CustomHeader
					navigation={this.props.navigation}
					isHeader="Shipping Address"
					isBack="isBack"
					name="Account"
				/>
				<ScrollView style={{paddingHorizontal: 10, marginTop: 15, paddingBottom: 20}}>
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
								keyboardType="numeric"
								maxLength={10}
								underlineColorAndroid="transparent"
							/>
						</View>
						<View style={[styles._formGroup, {flex: 1, marginLeft: 5}]}>
							<Field
								name="alternative_phone"
								component={textInput}
								keyboardType="numeric"
								maxLength={10}
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
							optionValue={countries && countries}
						/>
					</View>
					<View style={styles._formGroup}>
						<Field
							name="state_id"
							component={selectPicker}
							label="State"
							optionValue={countries && countries}
						/>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContetn: 'center',
							paddingBottom: 20,
						}}>
						<View style={[styles._formGroup, {flex: 1, marginRight: 5}]}>
							<Field name="city" component={textInput} label="City" />
						</View>
						<View style={[styles._formGroup, {flex: 1, marginLeft: 5}]}>
							<Field
								name="zipcode"
								component={textInput}
								label="Zip Code"
								keyboardType="numeric"
							/>
						</View>
					</View>
					<TouchableOpacity
						style={styles._cartBtn}
						onPress={handleSubmit(this._submitAddress.bind(this))}>
						<Text style={[styles._cartText, {textAlign: 'center'}]}>
							SUBMIT
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		);
	}
}

const addressForm = reduxForm({
	form: 'form',
	// validate: validation,
})(Form);

const mapStateToProps = (state) => {
	return {
		countries: state.products.countries,
	};
};

export default connect(mapStateToProps, {getCountries, getStates, createAddress})(
	addressForm,
);

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