import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class LogoutConfirmaton extends React.Component {
	clearUserToken = (res) => {
		if (res === true) {
			AsyncStorage.removeItem('token').then(() => {
				this.props.confirmationModal();
			});
		}
	};
	render() {
		const {visbility} = this.props;
		return (
			<Modal animationType={'fade'} transparent={true} visible={visbility}>
				<View style={styles._centeredView}>
					<View style={[styles._modalView, {borderRadius: 3}]}>
						<Text style={styles._deleteBold}>Are you sure</Text>
						<Text style={styles._deleteMedium}>
							Do you really want to logout
						</Text>
						<View style={styles._actionRow}>
							<TouchableOpacity
								style={[styles._actionBtn, {marginRight: 20}]}
								onPress={() => this.props.confirmationModal()}>
								<Text style={styles._actionText}>CANCEL</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles._actionBtn}
								onPress={() => this.clearUserToken(true)}>
								<Text style={styles._actionText}>YES, LOGOUT</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
}

export default LogoutConfirmaton;

const styles = StyleSheet.create({
	_modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 18,
		padding: 20,
		alignItems: 'center',
	},

	_centeredView: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},

	_deleteBold: {
		fontSize: 18,
		fontFamily: 'Montserrat-SemiBold',
	},

	_deleteMedium: {
		fontFamily: 'Montserrat-Regular',
		color: '#7a7a7a',
		fontSize: 14,
		paddingVertical: 15,
		textAlign: 'center',
	},

	_actionBtn: {
		paddingVertical: 5,
	},

	_actionText: {
		fontSize: 11,
		fontFamily: 'Montserrat-SemiBold',
		color: 'red',
	},

	_actionRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingBottom: 5,
	},
});
