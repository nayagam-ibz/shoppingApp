import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 55,
        borderWidth: 1,
        borderColor:'#eee',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
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
                <MaterialCommunityIcons
                  name="home"
                  size={20}
                  style={{
                    color: isFocused ? '#7B5996' : '#7a7a7a',
                  }}
                />
              )}
              {label === 'Catalogue' ? (
                <Entypo
                  name="grid"
                  size={20}
                  style={{
                    color: isFocused ? '#7B5996' : '#7a7a7a',
                  }}
                />
              ) : null}
              {label === 'Favourite' ? (
                <Entypo
                  name="heart"
                  size={20}
                  style={{
                    color: isFocused ? '#7B5996' : '#7a7a7a',
                  }}
                />
              ) : null}
              {label === 'Account' ? (
                <MaterialCommunityIcons
                  name="account"
                  size={22}
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
            style={{flex: 1, alignItems: 'center'}}>
            <Icons />
            <Text
              style={{
                color: isFocused ? '#7B5996' : '#7a7a7a',
                fontFamily: 'Montserrat-Medium',
                fontSize: 11,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default MyTabBar;