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

const Size = ['XXS', 'XS', 'S', 'M', 'L', 'XL'];
const Colors = [
	'#34283E',
	'#E29F99',
	'#76B55A',
	'#5D71E2',
	'#B768B9',
	'#E5D426',
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
						name="categories"
						component={selectPicker}
						label="Categories"
						optionValue={categories}
					/>
				</View>
				<View style={styles._formGroup}>
					<Field
						name="brand"
						component={selectPicker}
						label="Brand"
						optionValue={brand}
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
						name="sortby"
						component={selectPicker}
						label="Sort by"
						optionValue={sortby}
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
		marginBottom: 25,
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