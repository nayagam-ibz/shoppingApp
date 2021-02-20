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
import Favourite from './favourite';
import Account from './account';
import Splash from './auth/splash';
import ProductsList from './catalogue/productsList';
import ProductDetail from './catalogue/productDetail';
import UserProfile from './account/profile';
import NewAddress from './account/newAddress';
import ManageAddress from './account/manageAddress';
import Cart from './catalogue/cart';
import Checkout from './catalogue/checkout';
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
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
            
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
    routeName === 'Checkout' ||
    routeName === 'Signin' ||
    routeName === 'Signup' ||
    routeName === 'Myorders'
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
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
      }}>
      <CatalogueStack.Screen name="Catalogue" component={Catalogue} />
      <CatalogueStack.Screen name="Categories" component={ProductsList} />
      <CatalogueStack.Screen name="ProductDetail" component={ProductDetail} />
      <CatalogueStack.Screen name="Cart" component={Cart} />
      <CatalogueStack.Screen name="Checkout" component={Checkout} />
      <CatalogueStack.Screen name="Signin" component={SignIn} />
      <CatalogueStack.Screen name="Signup" component={SignUp} />
      <CatalogueStack.Screen name="Myorders" component={MyOrders} />
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
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
      }}>
      <FavouriteStack.Screen name="Favourite" component={Favourite} />
    </FavouriteStack.Navigator>
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
      initialRouteName="Setting"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
      }}>
      <AccountStack.Screen name="Account" component={Account} />
      <AccountStack.Screen name="Profile" component={UserProfile} />
      <AccountStack.Screen name="Myorders" component={MyOrders} />
      <AccountStack.Screen name="ManageAddress" component={ManageAddress} />
      <AccountStack.Screen name="NewAddress" component={NewAddress} />
    </AccountStack.Navigator>
  );
}
function TabNavigator() {
  return (
    <SafeAreaProvider>
      <Tab.Navigator tabBar={(props) => <CustomTab {...props} />}>
        <Tab.Screen name="Home" component={HomeStackScreen} item="testing" />
        <Tab.Screen name="Catalogue" component={CatalogueStackScreen} />
        <Tab.Screen name="Favourite" component={FavouriteStackScreen} />
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