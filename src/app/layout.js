import * as React from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from './dashboard';
import Catalogue from './catalogue';
import Favourite from './favourite';
import Account from './account';
import Splash from './auth/splash';
import ProductsList from './catalogue/productsList'
import ProductDetail from './catalogue/productDetail'
import UserProfile from './account/profile'
import Cart from './catalogue/cart'
import Checkout from './catalogue/checkout'
import CustomDrawer from './shared/customDrawer';
import CustomTab from './shared/customTab';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={Dashboard} />
    </HomeStack.Navigator>
  );
}

const CatalogueStack = createStackNavigator();

function CatalogueStackScreen({navigation, route}) {
  if(route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false})
  } else {
    navigation.setOptions({tabBarVisible: true})
  }
  
  return (
    <CatalogueStack.Navigator
      initialRouteName="Setting"
      screenOptions={{
        headerShown: false,
      }}>
      <CatalogueStack.Screen name="Catalogue" component={Catalogue} />
      <CatalogueStack.Screen name="Categories" component={ProductsList} />
      <CatalogueStack.Screen name="ProductDetail" component={ProductDetail} />
      <CatalogueStack.Screen name="cart" component={Cart} />
      <CatalogueStack.Screen name="checkout" component={Checkout} />
    </CatalogueStack.Navigator>
  );
}
const FavouriteStack = createStackNavigator();

function FavouriteStackScreen() {
  return (
    <FavouriteStack.Navigator
      initialRouteName="Setting"
      screenOptions={{
        headerShown: false,
      }}>
      <FavouriteStack.Screen name="Favourite" component={Favourite} />
    </FavouriteStack.Navigator>
  );
}

const AccountStack = createStackNavigator();

function AccountStackScreen() {
  return (
    <AccountStack.Navigator
      initialRouteName="Setting"
      screenOptions={{
        headerShown: false,
      }}>
      <AccountStack.Screen name="Account" component={Account} />
      <AccountStack.Screen name="profile" component={UserProfile} />
    </AccountStack.Navigator>
  );
}

function TabNavigator() {
  return (
    // <Tab.Navigator>
    <Tab.Navigator tabBar={(props) => <CustomTab {...props} />}>
      <Tab.Screen name="Home" component={HomeStackScreen} item="testing" />
      <Tab.Screen name="Catalogue" component={CatalogueStackScreen} />
      <Tab.Screen name="Favourite" component={FavouriteStackScreen} />
      <Tab.Screen name="Account" component={AccountStackScreen} />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="MenuTab"
      drawerContent={(props) => CustomDrawer(props)}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

const StackApp = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <StackApp.Screen name="HomeApp" component={DrawerNavigation} />
        <StackApp.Screen name="Splash" component={Splash} />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}