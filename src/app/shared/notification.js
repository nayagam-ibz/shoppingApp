import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Styles from '../../../assets/style';

class Notification extends React.Component {
	render() {
		const {notification} = this.props;
		return (
			<View style={Styles.container}>
				<LinearGradient
					start={{x: 0, y: 0.9}}
					end={{x: 1, y: 0.1}}
					colors={['#3B2D46', '#7B5996']}
					style={[
						Styles._headerGradient,
						{height: 45, justifyContent: 'center', paddingHorizontal: 10},
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
						<Text style={[Styles._subTitleApp, {color: '#fff'}]}>
							Notification
						</Text>
						<Text style={Styles._clearText}></Text>
					</View>
				</LinearGradient>
				<View>
					{notification.map((item, index) => {
						return (
							<View key={index} style={styles._notificationRow}>
								<Text style={styles._notificationName}>{item.name}</Text>
								<Text style={styles._notificationDate}>
								  <Ionicons name="md-notifications-outline" size={14} color="#7a7a7a"  style={{marginRight: 3}}/>
								  {item.date}
								</Text>
							</View>
						);
					})}
				</View>
			</View>
		);
	}
}

export default Notification;

const styles = StyleSheet.create({
	_notificationRow: {
		paddingVertical: 20,
		paddingHorizontal: 10,
		borderBottomWidth: 0.5,
		borderColor:'#ddd'
	},

	_notificationName: {
		color:'#333',
		fontFamily: 'Montserrat-Medium',
	},

	_notificationDate: {
		color:'#7a7a7a',
		fontFamily: 'Montserrat-Medium',
		fontSize: 13,
		paddingVertical: 5,
	}
});