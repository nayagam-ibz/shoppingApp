import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {selectOptions, rangeSlider} from '../shared/form-elements';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Styles from '../../../assets/style';

class Filter extends React.Component {
	initialValue() {
		return {color: [], size: [], length: [], price: 0};
	}
	onSubmit(values) {
		const {color, size, length, price} = values;
		this.props.applyFilter(values);
		this.props.handleClose();
	}
	onReset = () => {
		this.props.reset(this.props.form);
		this.props.applyFilter(this.initialValue());
		this.props.handleClose();
	};

	render() {
		const {handleSubmit, initialData} = this.props;
		return (
			<View style={Styles.container}>
				<LinearGradient
					start={{x: 0, y: 0.9}}
					end={{x: 1, y: 0.1}}
					colors={['#3B2D46', '#7B5996']}
					style={[
						Styles._headerGradient,
						{height: 50, justifyContent: 'center', paddingHorizontal: 10},
					]}>
					<View style={Styles._spaceBetween}>
						<TouchableOpacity onPress={this.props.handleClose}>
							<Entypo
								name="chevron-small-left"
								size={35}
								color="#fff"
								style={{marginLeft: -10}}
							/>
						</TouchableOpacity>
						<Text style={[Styles._subTitleApp, {color: '#fff'}]}>Filter</Text>
						<TouchableOpacity onPress={this.onReset.bind(this)}>
							<Text style={Styles._clearText}>CLEAR</Text>
						</TouchableOpacity>
					</View>
				</LinearGradient>
				<View style={{paddingHorizontal: 12, paddingVertical: 15}}>
					<View style={Styles._formGroup}>
						<Field
							name="price"
							component={rangeSlider}
							label="Price"
							min={10}
							max={1000}
							initialValue={200}
						/>
					</View>
					<View style={Styles._formGroup}>
						<Field
							name="color"
							component={selectOptions}
							label="Colors"
							optionValue={initialData && initialData.colors}
						/>
					</View>
					<View style={Styles._formGroup}>
						<Field
							name="size"
							component={selectOptions}
							label="Sizes"
							optionValue={initialData && initialData.size}
							optionType="size"
						/>
					</View>
					<View style={Styles._formGroup}>
						<Field
							name="length"
							component={selectOptions}
							label="Length"
							optionValue={initialData && initialData.length}
							optionType="size"
							type="length"
						/>
					</View>
					<TouchableOpacity
						style={[Styles._cartBtn, {marginTop: 40}]}
						onPress={handleSubmit(this.onSubmit.bind(this))}>
						<Text style={[Styles._cartText, {textAlign: 'center'}]}>
							APPLY FILTER
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const FilterForm = reduxForm({
	enableReinitialize: true,
})(Filter);

const mapStateToProps = (state) => {
	return {initialData: state.products.initialData};
};

export default connect(mapStateToProps, {})(FilterForm);