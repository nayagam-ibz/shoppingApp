import React from 'react';
import {View, AsyncStorage} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

class Loader extends React.Component {
  render() {
    const {loading, textContent} = this.props;
    return (
      <View>
        {loading && (
          <Spinner
            visible={loading}
            color="#fff"
            overlayColor="rgba(0, 0, 0, 0.30)"
            animation="slide"
            textContent={textContent ? textContent : 'Loading...'}
            textStyle={{color: '#fff', fontSize: 14, fontFamily: 'Montserrat-Medium', marginTop: -50}}
          />
        )}
      </View>
    );
  }
}

export default Loader;