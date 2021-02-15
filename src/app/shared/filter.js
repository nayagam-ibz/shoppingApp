import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {selectPicker, selectOptions, rangeSlider} from '../shared/form-elements';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';


const categories = [
	{id: 1, name: 'Dress'},
	{id: 2, name: 'Tops'},
	{id: 3, name: 'Sweaters'},
];

const brand = [
	{id: 1, name: 'Catwalk Juniors Clothing'},
	{id: 2, name: 'Rosy Cheeks Children’s Apparel'},
	{id: 3, name: 'Adventure Apparel Co'},
	{id: 4, name: 'Sunglow Fashion'},
	{id: 5, name: 'Spotlight on Style'},
	{id: 6, name: 'Modern Walk'},
];

const sortby = [
	{id: 1, name: "What's New"},
	{id: 2, name: 'Popularity'},
	{id: 3, name: 'Better Discount'},
	{id: 4, name: 'Price: High to low'},
	{id: 5, name: 'Price: Low To High'},
];

const Length = [{"id":1, "name": "MINI"}, {"id": 2, "name": "MIDI"}, {"id": 3, "name": "MAXI"}]

const Size = [{"id": 1, "name":'XXS'}, {"id":2, "name": 'XS'}, {"id": 3, "name": 'S'}, {"id": 4, "name": 'M'}, {"id": 5, "name": 'L'}, {"id": 6, "name": 'XL'}];
const Colors = [
	{"id": 1, "name": '#34283E'},
	{"id": 2, "name": '#E29F99'},
	{"id": 3, "name": '#76B55A'},
	{"id": 3, "name": '#5D71E2'},
	{"id": 4, "name": '#B768B9'},
	{"id": 5, "name": '#E5D426'},
];

class Form extends React.Component {
	_submitProfile(values) {
		console.log(values);
	}

	render() {
		const {handleSubmit} = this.props;
		return (
			<View style={styles.container}>
				<View style={styles._formGroup}>
					<Field
						name="price"
						component={rangeSlider}
						label="Price"
					/>
				</View>
				<View style={styles._formGroup}>
					<Field
						name="color"
						component={selectOptions}
						label="Colors"
						optionValue={Colors}
					/>
				</View>
				<View style={styles._formGroup}>
					<Field
						name="size"
						component={selectOptions}
						label="Sizes"
						optionValue={Size}
						optionType="size"
					/>
				</View>

				<View style={styles._formGroup}>
					<Field
						name="length"
						component={selectOptions}
						label="Length"
						optionValue={Length}
						optionType="size"
					/>
				</View>

				<View style={styles._flexEnd}>
					<TouchableOpacity
						style={styles._cartBtn}
						onPress={handleSubmit(this._submitProfile.bind(this))}>
						<Text style={[styles._cartText, {textAlign: 'center'}]}>
							Apply Filter
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const filterForm = reduxForm({
	form: 'custoerProfileForm',
})(Form);

const mapStateToProps = (state) => {
	return {
		products: state.products,
	};
};

export default connect(mapStateToProps, {})(filterForm);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 15
	},

	_formGroup: {
		marginBottom: 40,
	},

	_flexEnd: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
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