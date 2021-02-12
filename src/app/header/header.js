import React, {Component} from 'react';
import {
	Text,
	StyleSheet,
	View,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

export class CustomHeader extends Component {
	render() {
		const {isHeader, name, isBack, headertitle, filterIcon, notificationIcon} = this.props;
		return (
			<View>
				{isHeader === 'home' ? (
					<View style={{height: 65}}>
						<LinearGradient
							start={{x: 0, y: 0.9}}
							end={{x: 1, y: 0.1}}
							colors={['#3B2D46', '#7B5996']}
							style={[styles._headerGradient, {height: 65}]}>
							<View style={[styles._innerHeader, {height: 25}]}>
								<Text style={{flex: 1}}>
									<TouchableOpacity
										onPress={
											isBack && isBack
												? () => this.props.navigation.navigate(name)
												: () => this.props.navigation.openDrawer()
										}>
										{isBack && isBack ? (
											<Entypo
												name="chevron-small-left"
												size={35}
												color="#fff"
												style={{marginLeft: -10}}
											/>
										) : (
											<SimpleLineIcons name="menu" size={25} color="#fff" />
										)}
									</TouchableOpacity>
								</Text>
								<Text style={{flex: 5, textAlign: 'center'}}>
									{isBack && isBack ? (
										<Text style={[styles._subTitleApp, {color: '#fff'}]}>
											{headertitle}
										</Text>
									) : (
										<View style={styles._flexRow}>
											<Text style={[styles._titleApp, {color: '#E7B844'}]}>
												My
											</Text>
											<Text style={[styles._titleApp, {color: '#fff'}]}>
												Shop
											</Text>
										</View>
									)}
								</Text>
								<Text style={{flex: 1, textAlign: 'right'}}>
									<TouchableOpacity
										onPress={isBack && isBack ? this.props.filterOption : null}>
										{filterIcon && filterIcon ? <Entypo name="sound-mix" size={22} color="#fff" /> : null} 
										{notificationIcon && notificationIcon ? <MaterialIcons name="md-notifications-outline" size={25} color="#fff" /> : null} 
									</TouchableOpacity>
								</Text>
							</View>
						</LinearGradient>
					</View>
				) : (
					<LinearGradient
						start={{x: 0, y: 0.9}}
						end={{x: 1, y: 0.1}}
						colors={['#3B2D46', '#7B5996']}
						style={[styles._headerGradient, {height: 50}]}>
						<View style={[styles._innerHeader, {flex: 1}]}>
							<View style={{flex: 1}}>
								<TouchableOpacity
									onPress={() => this.props.navigation.navigate(name)}>
									<Entypo name="chevron-small-left" size={35} color="#fff" />
								</TouchableOpacity>
							</View>
							<View style={{flex: 1}}>
								<Text
									style={[
										styles._subTitleApp,
										{color: '#fff', textAlign: 'center'},
									]}>
									{isHeader}
								</Text>
							</View>
							<View style={{flex: 1}}></View>
						</View>
					</LinearGradient>
				)}
			</View>
		);
	}
}

export default CustomHeader;

const styles = StyleSheet.create({
	_flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},

	_titleApp: {
		fontSize: 18,
		letterSpacing: 1,
		fontFamily: 'Montserrat-ExtraBold',
	},

	_subTitleApp: {
		fontSize: 18,
		fontFamily: 'Montserrat-Medium',
	},

	_innerHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	_headerGradient: {
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
});