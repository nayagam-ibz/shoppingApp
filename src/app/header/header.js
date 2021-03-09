import React, {Component} from 'react';
import {
	Text,
	StyleSheet,
	View,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { CurrentUser } from '../../app/store/actions/products';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Authentication from '../shared/authentication'; 
import RBSheet from 'react-native-raw-bottom-sheet';

export class CustomHeader extends Component {
	onNavigation = () => {
		return CurrentUser().then((token) => {
			if (!token) {
				this.RBSheet.open();
				return;
			}else {
	      this.props.navigation.navigate('Account', {
					screen: 'Wishlist',
				});
			}
		})
	}

	sheetClose = () => {
		this.RBSheet.close();
	} 

	render() {
		const {isHeader, name, isBack, headertitle, filterIcon, notificationIcon, openModal} = this.props;
		return (
			<View>
				{isHeader === 'home' ? (
					<View style={{height: 60}}>
						<LinearGradient
							start={{x: 0, y: 0.9}}
							end={{x: 1, y: 0.1}}
							colors={['#3B2D46', '#7B5996']}
							style={[styles._headerGradient, {height: 60}]}>
							<View style={[styles._innerHeader, {height: 20}]}>
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
								  <View style={{flexDirection:'row'}}>
										<TouchableOpacity style={{marginRight: 10}} onPress={this.onNavigation}>
											{notificationIcon && notificationIcon ? <Entypo name="heart-outlined" size={25} color="#fff" /> : null} 
										</TouchableOpacity>
										<TouchableOpacity>
											{notificationIcon && notificationIcon ? <MaterialIcons name="md-notifications-outline" size={25} color="#fff" /> : null} 
										</TouchableOpacity>
									</View>		
								</Text>
							</View>
						</LinearGradient>
					</View>
				) : (
					<LinearGradient
						start={{x: 0, y: 0.9}}
						end={{x: 1, y: 0.1}}
						colors={['#3B2D46', '#7B5996']}
						style={[styles._headerGradient, {height: 45}]}>
						<View style={[styles._innerHeader, {flex: 1}]}>
							<View style={{flex: 1}}>
								<TouchableOpacity
									onPress={() => this.props.navigation.navigate(name)}>
									<Entypo name="chevron-small-left" size={35} color="#fff" style={{marginLeft: -10}}/>
								</TouchableOpacity>
							</View>
							<View style={{flex: 5}}>
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
				<RBSheet ref={(ref) => {this.RBSheet = ref;}}
					height={400}
					openDuration={300} closeOnPressMask={true} closeOnDragDown={true}
					customStyles={{
				    wrapper: {backgroundColor: 'rgba(0,0,0,.7)'},
				    draggableIcon: {backgroundColor: '#fff'},
				  }}>
					<Authentication sheetClose={this.sheetClose}/>
				</RBSheet>
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
		fontSize: 20,
		letterSpacing: 1,
		fontFamily: 'Montserrat-ExtraBold',
	},

	_subTitleApp: {
		fontSize: 15,
		fontFamily: 'Montserrat-Medium',
		textTransform: 'uppercase'
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