import * as React from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from './dashboard';
import Catalogue from './catalogue';
import Wishlist from './account/wishlist';
import MyProfile from './account/myProfile';
import Account from './account';
import Splash from './auth/splash';
import ProductsList from './catalogue/productsList';
import ProductDetail from './catalogue/productDetail';
import ManageAddress from './account/manageAddress';
import Cart from './catalogue/cart';
import ShippingAddress from './catalogue/shippingAddress';
import NewAddress from './catalogue/newAddress';
import Payment from './catalogue/payment';
import CustomDrawer from './shared/customDrawer';
import CustomTab from './shared/customTab';
import SignIn from './catalogue/signin';
import SignUp from './catalogue/signup';
import MyOrders from './account/myOrders';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
         cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            
      }}>
      <HomeStack.Screen name="Home" component={Dashboard} />
    </HomeStack.Navigator>
  );
}
const CatalogueStack = createStackNavigator();
function CatalogueStackScreen({navigation, route}) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  if (
    routeName === 'Categories' ||
    routeName === 'ProductDetail' ||
    routeName === 'Cart' ||
    routeName === 'Payment' ||
    routeName === 'Signin' ||
    routeName === 'Signup' ||
    routeName === 'Myorders' ||
    routeName === 'MyProfile'||
    routeName === 'ShippingAddress'||
    routeName === 'NewAddress'
  ) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <CatalogueStack.Navigator
      initialRouteName="Catalogue"
      screenOptions={{
        headerShown: false,
         cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}>
      <CatalogueStack.Screen name="Catalogue" component={Catalogue} />
      <CatalogueStack.Screen name="ProductsList" component={ProductsList} />
      <CatalogueStack.Screen name="ProductDetail" component={ProductDetail} />
      <CatalogueStack.Screen name="Cart" component={Cart} />
      <CatalogueStack.Screen name="Payment" component={Payment} />
      <CatalogueStack.Screen name="Signin" component={SignIn} />
      <CatalogueStack.Screen name="Signup" component={SignUp} />
      <CatalogueStack.Screen name="Myorders" component={MyOrders} />
      <CatalogueStack.Screen name="MyProfile" component={MyProfile} />
      <CatalogueStack.Screen name="ShippingAddress" component={ShippingAddress} />
      <CatalogueStack.Screen name="NewAddress" component={NewAddress} />
    </CatalogueStack.Navigator>
  );
}
const WishlistStack = createStackNavigator();
function WishlistStackScreen() {
  return (
    <WishlistStack.Navigator
      initialRouteName="Setting"
      screenOptions={{
        headerShown: false,
         cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}>
      <WishlistStack.Screen name="Wishlist" component={Wishlist} />
    </WishlistStack.Navigator>
  );
}
const AccountStack = createStackNavigator();
function AccountStackScreen({navigation, route}) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  if (routeName === 'Profile' || routeName === 'NewAddress' || routeName ==='ManageAddress' ) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <AccountStack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerShown: false,
         cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}>
      <AccountStack.Screen name="Account" component={Account} />
      <AccountStack.Screen name="Myorders" component={MyOrders} />
      <AccountStack.Screen name="ManageAddress" component={ManageAddress} />
      <AccountStack.Screen name="Wishlist" component={Wishlist} />
    </AccountStack.Navigator>
  );
}
function TabNavigator() {
  return (
    <SafeAreaProvider>
      <Tab.Navigator tabBar={(props) => <CustomTab {...props} />}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Catalogue" component={CatalogueStackScreen} />
        <Tab.Screen name="Account" component={AccountStackScreen} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}
const Drawer = createDrawerNavigator();
function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="MenuTab"
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
    </Drawer.Navigator>
  );
}
const StackApp = createStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackApp.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
          }}>
          <StackApp.Screen name="HomeApp" component={DrawerNavigation} />
          <StackApp.Screen name="Splash" component={Splash} />
        </StackApp.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}