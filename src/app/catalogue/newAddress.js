import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from 'react-native';
import { getCountries, createAddress, updateAddress, getAllAddress} from '../../app/store/actions/products';
import { textInput, selectPicker} from '../shared/form-elements';
import { Field, reduxForm, SubmissionError} from 'redux-form';
import { handleResponse } from "../utils/Axios";
import { connect} from 'react-redux';
import { validation} from '../validations';
import CustomHeader from '../header/header';
import Loader from '../shared/loader';

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {loading: true, selectValue: null };
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
		const paramId = this.props.route.params?.id ?? '';
		if(paramId){
		  this.props.updateAddress(paramId).then((data) => {
		  	const field = data.payload.data
		    this.setState({selectValue: field})
		    const respons = { id: field.id.toString(), firstname: field.firstname, lastname: field.lastname, city: field.city, address1: field.address1,
         address2: field.address2, phone: field.phone, alternativePhone: field.alternativePhone, zipcode: field.zipcode  
		    };
        this.props.initialize(respons);
		  })
		}else {
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
		const {error, handleSubmit, countries, states, editAddress } = this.props;
		const { selectValue } = this.state
		const editParam = this.props.route.params?.id ?? '';
		return (
			<View style={styles.container}>
			  <Loader loading={this.state.loading} />
				<CustomHeader navigation={this.props.navigation} isHeader="New Address" isBack="isBack" name="ShippingAddress" />
				<ScrollView>
				  <View style={styles._adheaderView}>
            <Text style={styles._adheaderTitle}>Contact Detail</Text>
				  </View>
					{error && <Text>{error}</Text>}
					<Field
						name="id"
						component={textInput}
						hideClass="hideClass"
					/>
					<View style={styles._addressRow}>
						<Field
							name="firstname"
							component={textInput}
							underlineColorAndroid="transparent"
							placeholder="First Name * "
						/>
					</View>
					<View style={styles._addressRow}>
						<Field
							name="lastname"
							component={textInput}
							underlineColorAndroid="transparent"
							placeholder="Last Name * "
						/>
					</View>
					<View style={{flexDirection: 'row', justifyContetn: 'center', paddingHorizontal:10, marginBottom:15}}>
						<View style={{flex: 1, marginRight: 5}}>
							<Field
								name="phone"
								component={textInput}
								keyboardType="numeric"
								maxLength={10}
								underlineColorAndroid="transparent"
								placeholder="Phone Number *"
							/>
						</View>
						<View style={{flex: 1, marginLeft: 5}}>
							<Field
								name="alternative_phone"
								component={textInput}
								keyboardType="numeric"
								maxLength={10}
								underlineColorAndroid="transparent"
								placeholder="Alternative Phone "
							/>
						</View>
					</View>
          <View style={styles._adheaderView}>
            <Text style={styles._adheaderTitle}>Address</Text>
				  </View>
					<View style={styles._addressRow}>
						<Field
							name="address1"
							component={textInput}
							underlineColorAndroid="transparent"
							placeholder="Address (House No, Building, Street, Area) *"
						/>
					</View>
					<View style={styles._addressRow}>
						<Field
							name="address2"
							component={textInput}
							underlineColorAndroid="transparent"
							placeholder=" Locality / Town *"
						/>
					</View>
					<View style={{flexDirection: 'row', justifyContetn: 'center', paddingHorizontal:10, marginBottom:15}}>
						<View style={{flex: 1, marginRight: 5}}>
							<Field
								name="country_id"
								component={selectPicker}
								optionValue={countries && countries}
								defaultName={selectValue && selectValue.country.name}
								defaultId={selectValue && selectValue.country.id}
								placeholder="Select Country *"
								picker="country"
							/>
						</View>
						<View style={{flex: 1, marginLeft: 5}}>
							<Field
								name="state_id"
								component={selectPicker}
								optionValue={states && states}
								defaultName = {selectValue && selectValue.state.name}
								defaultId={selectValue && selectValue.state.id}
								placeholder="Select State *"
							/>
						</View>
					</View>
					<View style={styles._addressRow}>
						<Field name="city" component={textInput} placeholder="City * " />
					</View>
					<View style={styles._addressRow}>
						<Field
							name="zipcode"
							component={textInput}
							keyboardType="numeric"
							placeholder="Zip Code *"
						/>
					</View>
					<View style={{paddingHorizontal: 10, marginTop: 20}}>
						<TouchableOpacity style={styles._cartBtn} onPress={handleSubmit(this._submitAddress.bind(this))}>
							<Text style={[styles._cartText, {textAlign: 'center'}]}>
								{editParam ? "EDIT ADDRESS" : "ADD ADDRESS"}
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const addressForm = reduxForm({
	form: 'addressForm',
	validate: validation,
	enableReinitialize: true,
	keepDirtyOnReinitialize : true
})(Form);

const mapStateToProps = (state) => {
	return {
		countries: state.products.countries,
		states: state.products.states,
		editAddress: state.products.editAddress,
	};
};

export default connect(mapStateToProps, {getCountries,createAddress, updateAddress, getAllAddress})(
	addressForm,
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#f3f3f3'
	},

	_adheaderView: {
		backgroundColor:'#eee',
		paddingVertical: 15,
		paddingHorizontal: 10,
		marginBottom: 15
	},

	_addressRow: {
		marginBottom: 15,
		paddingHorizontal: 10
	},

	_cartBtn: {
		backgroundColor: 'orange',
		paddingHorizontal: 70,
		paddingVertical: 10,
		borderRadius: 3,
		width: '100%',
	},

	_adheaderTitle: {
		fontFamily: 'Montserrat-Medium',
		textTransform:'uppercase',
		fontSize: 13,
		color:'#222',
	},

	_cartText: {
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 14,
		color: '#fff',
	},
});