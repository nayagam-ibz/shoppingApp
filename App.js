import * as React from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

function CustomHeader({isHome, navigation}) {
  return (
    <View style={{flexDirection: 'row', height: 50, backgroundColor: '#ddd'}}>
      {isHome ? (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text>Menu</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader isHome={true} navigation={navigation}/>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeDetails')}>
          <Text>Go Home Details</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function DetailsScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader navigation={navigation} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home! Details screens</Text>
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader isHome={true} navigation={navigation}/>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <Text>Go Setting Details</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function SettingsScreenDetails({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader navigation={navigation} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Setting Details!</Text>
      </View>
    </SafeAreaView>
  );
}

function CustomDrawerContent(props){
  return(
    <SafeAreaView style={{flex: 1, backgroundColor:'red'}}>
      <TouchableOpacity onPress={() => props.navigation.navigate('HomeDetails')}>
          <Text>Go Home Details</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
} 



function LoginScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Login Screen!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeApp')}>
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('HomeDetails')}>
          <Text>Registraion</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="HomeDetails" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      initialRouteName="Setting"
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsStack.Screen name="Setting" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={SettingsScreenDetails} />
    </SettingsStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
    // screenOptions={({ route }) => ({
    //   tabBarIcon: ({ focused, color, size }) => {
    //     let iconName;
    //     if (route.name === 'Home') {
    //       iconName = focused
    //         ? 'ios-information-circle'
    //         : 'ios-information-circle-outline';
    //     } else if (route.name === 'Settings') {
    //       iconName = focused ? 'ios-list-box' : 'ios-list';
    //     }

    //     // You can return any component that you like here!
    //     return <Ionicons name={iconName} size={size} color={color} />;
    //   },
    // })}
    // tabBarOptions={{
    //   activeTintColor: 'tomato',
    //   inactiveTintColor: 'gray',
    // }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
      <Drawer.Navigator initialRouteName="MenuTab" drawerContent={props => CustomDrawerContent(props)}>
        <Drawer.Screen name="MenuTab" component={TabNavigator} />
      </Drawer.Navigator>
    )
}

const StackApp = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <StackApp.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <StackApp.Screen name="HomeApp" component={DrawerNavigation} />
        <StackApp.Screen name="Login" component={LoginScreen} />
      </StackApp.Navigator>
    </NavigationContainer>
  )  
}