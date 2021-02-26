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
import {getCountries, createAddress, updateAddress, getAllAddress} from '../../app/store/actions/products';
import {validation} from '../validations';
import {connect} from 'react-redux';
import Loader from '../shared/loader';
import { handleResponse } from "../utils/Axios";

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {loading: true };
	}
	_submitAddress(values) {
		this.setState({loading: true})
		const id = this.props.route.params?.id ?? '';
		return this.props.createAddress(values, id).then((data) => {
			if(data.payload.data){
				this.setState({loading: false})
				this.props.navigation.navigate("ManageAddress")
				this.props.getAllAddress()
				this.resetForm()
			} else {
        throw(handleResponse(data.payload).error);
        this.setState({ loading:false })
      }
		}).catch(error => {
      this.setState({ loading:false })
      throw new SubmissionError(error);
    })
	} 

	resetForm = () => {
		const resetFields = { firstname: '', lastname: '', city: '', address1: '', address2: '', phone:'', alternativePhone:''}
    this.props.initialize(resetFields, true);
    this.props.reset()
    this.setState({selectValue: ''})
  }

	componentDidMount() {
		const {editAddress} = this.props 
		const id = this.props.route.params?.id ?? '';
		if(id){
		  this.props.updateAddress(id)
		  this.setState({selectValue: editAddress && editAddress.attributes})
		}else {
		  this.setState({selectValue: ''})
      this.resetForm()   
		}
		this.props.getCountries().then((data) => {
      this.setState({loading: false})
		}).catch(error => {
      console.log(error)
      this.setState({loading: false})
    })
	}
	render() {
		const {error, handleSubmit, countries, states } = this.props;
		const { selectValue } = this.state
		const editParam = this.props.route.params?.id ?? '';
		return (
			<View style={styles.container}>
			  <Loader loading={this.state.loading} />
				<CustomHeader
					navigation={this.props.navigation}
					isHeader="Shipping Address"
					isBack="isBack"
					name="ManageAddress"
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
								name="alternativePhone"
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
							picker="country"
							defaultName = {selectValue && selectValue.countryName}
						/>
					</View>
					<View style={styles._formGroup}>
						<Field
							name="state_id"
							component={selectPicker}
							label="State"
							optionValue={states && states}
							defaultName = {selectValue && selectValue.stateName}
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
							{editParam ? "EDIT ADDRESS" : "ADD ADDRESS"}
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		);
	}
}

const addressForm = reduxForm({
	form: 'addressForm',
	enableReinitialize: true,
	// validate: validation,
})(Form);

const mapStateToProps = (state) => {
	let addressInitial = {}
  if (state.products.editAddress && state.products.editAddress.attributes ) {
  	const fieldName = state.products.editAddress.attributes
    addressInitial.initialValues = {
      lastname: fieldName.lastname,
      firstname: fieldName.firstname,
      address1: fieldName.address1,
      address2: fieldName.address2,
      address2: fieldName.address2,
      phone: fieldName.phone,
      zipcode: fieldName.zipcode,
      city: fieldName.city,
    }
  }
	return {
		countries: state.products.countries,
		states: state.products.states,
		editAddress: state.products.editAddress,
		...addressInitial
	};
};

export default connect(mapStateToProps, {getCountries,createAddress, updateAddress, getAllAddress})(
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