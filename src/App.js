import React, {Component} from 'react';
import {View, StatusBar, YellowBox} from 'react-native';
import { Provider } from 'react-redux';
import store from './app/store/reducers/index';
import Layout from './app/layout';

console.disableYellowBox = true;
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested', 'Warning: Cannot update a component from inside the function body of a different component.']);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar
          // backgroundColor="#B2A6BC"
          backgroundColor="#3B2D46"
          barStyle="ligh-content"
          networkActivityIndicatorVisible={true}
          translucent={false}
        />
        <Layout />
      </Provider>
    );
  }
}