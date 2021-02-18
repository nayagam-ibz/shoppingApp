import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

class DrawerContent extends Component {
  render() {
    const {state, descriptors, navigation} = this.props;
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    if (focusedOptions.tabBarVisible === false) {
      return null;
    }
    return (
      <View style={{height: 55}}>
        <View style={styles._bottomHeader}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
            const Icons = () => {
              return (
                <View>
                  {label === 'Home' && (
                    <SimpleLineIcons
                      name="home"
                      size={16}
                      style={{
                        color: isFocused ? '#7B5996' : '#7a7a7a',
                      }}
                    />
                  )}
                  {label === 'Catalogue' ? (
                    <SimpleLineIcons
                      name="grid"
                      size={15}
                      style={{
                        color: isFocused ? '#7B5996' : '#7a7a7a',
                      }}
                    />
                  ) : null}
                  {label === 'Favourite' ? (
                    <SimpleLineIcons
                      name="heart"
                      size={16}
                      style={{
                        color: isFocused ? '#7B5996' : '#7a7a7a',
                      }}
                    />
                  ) : null}
                  {label === 'Account' ? (
                    <SimpleLineIcons
                      name="user"
                      size={16}
                      style={{
                        color: isFocused ? '#7B5996' : '#7a7a7a',
                      }}
                    />
                  ) : null}
                </View>
              );
            };
            return (
              <TouchableOpacity
                key={label}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 0.7,
                  alignItems: 'center',
                  paddingHorizontal: label === 'Favourite' ? 10 : null,
                }}>
                <Icons />
                <Text
                  style={{
                    color: isFocused ? '#7B5996' : '#7a7a7a',
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 12,
                    marginTop: 2,
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
          <LinearGradient
            start={{x: 0, y: 0.9}}
            end={{x: 1, y: 0.1}}
            colors={['#3B2D46', '#7B5996']}
            style={styles._cartItems}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Catalogue', {
                  screen: 'Cart',
                })
              }
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="cart-outline"
                size={20}
                style={{marginRight: 5, color: '#fff'}}
              />
              <View>
                <Text style={styles._totalCartPrice}><FontAwesome name="rupee" size={12} color="#fff" /> {''}230.99</Text>
                <Text style={styles._totalCartPrice}>2 Items</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialData: state.products.initialData,
  };
};

export default connect(mapStateToProps, {})(DrawerContent);

const styles = StyleSheet.create({
  _cartItems: {
    backgroundColor: 'red',
    width: 85,
    paddingVertical: 5,
    marginTop: -30,
    height: 45,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
  },

  _flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  _totalCartPrice: {
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
    fontSize: 12,
  },

  _bottomHeader: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 55,
    borderWidth: 1,
    borderColor: '#eee',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    flex: 2,
  },
});