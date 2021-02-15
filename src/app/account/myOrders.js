import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomHeader from '../header/header';
import { getMyOrders } from '../../app/store/actions/products';
import { connect } from 'react-redux';

class MyOrders extends React.Component {
	componentDidMount() {
		this.props.getMyOrders();
	}

	render() {
		const {Myorders} = this.props;
		return (
			<View style={styles.container}>
				<CustomHeader
					navigation={this.props.navigation}
					isHeader="My Orders"
					isBack="isBack"
					name="Home"
				/>
				<View style={{flex: 1}}>
					<FlatList
						data={Myorders && Myorders}
						keyExtractor={(item, index) => index}
						contentContainerStyle={styles.container}
						renderItem={({item}) => (
							<View style={styles._orderRow}>
								<View style={styles._flexRow}>
									<Text style={styles._itemName}>{item.name}</Text>
									<Text style={styles._itemPrice}>
										<FontAwesome name="rupee" size={13} color="#3f2950" />{' '}
										{item.price}
									</Text>
								</View>
								<View style={[styles._flexRow, {marginTop: 10}]}>
									<Text style={styles._itemDelivery}>
										Expected Delivery By Today{' '}
									</Text>
									<Text
										style={[
											styles._itemProcess,
											{
												color:
													item.action === 'Canceld'
														? 'red'
														: '#7a7a7a' || item.action === 'Deliverd'
														? 'orange'
														: '#7a7a7a',
											},
										]}>
										{item.action}
									</Text>
								</View>
							</View>
						)}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		Myorders: state.products.myorders,
	};
};

export default connect(mapStateToProps, {getMyOrders})(MyOrders);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f3f3f3',
	},

	_orderRow: {
		paddingHorizontal: 10,
		backgroundColor: '#fff',
		paddingVertical: 15,
		marginBottom: 5,
	},

	_flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	_itemName: {
		fontSize: 13,
		fontFamily: 'Montserrat-Medium',
		flex: 1,
	},

	_itemPrice: {
		fontSize: 15,
		fontFamily: 'Montserrat-Medium',
		flex: 0.3,
		paddingLeft: 20,
	},

	_itemDelivery: {
		fontSize: 13,
		fontFamily: 'Montserrat-Medium',
		color: '#7a7a7a',
		flex: 1,
	},

	_itemProcess: {
		fontSize: 13,
		fontFamily: 'Montserrat-Medium',
		flex: 0.3,
		paddingLeft: 20,
	},
});