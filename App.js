import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import Route from './src/config/route';
import * as Updates from 'expo-updates';
import AppLoading from 'expo-app-loading';
import NetInfo from '@react-native-community/netinfo';




class Musicapp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    // try {
    //   const update = await Updates.checkForUpdateAsync();
    //   if(update.isAvailable) {
    //     await Updates.fetchUpdateAsync();
    //     // ... notify user of update ...
    //     await Updates.reloadFromCache();
    //   }else console.log('no-update')
    // } catch (e) {
    //   console.log(e, 'the error')
    //   // log error
    // }
    const unsubscribe = NetInfo.addEventListener(state => {
      this.child && this.child.handleConnection(state.isConnected)
    });
  }

  checkUser = async () => {
    this.loadAsset().then(() => {
      this.setState({ loading: false })
    })
  }

  loadAsset = async () => {
    await Asset.loadAsync([
      require('./assets/images/welcome_bg.jpg'),
      require('./assets/images/logo.png'),
      require('./assets/images/splash.png'),
    ])
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
      'Entypo': require('native-base/Fonts/Entypo.ttf'),
      'FontAwesome': require('native-base/Fonts/FontAwesome.ttf'),
      'FontAwesome5': require('native-base/Fonts/FontAwesome5_Regular.ttf'),
      'Foundation': require('native-base/Fonts/Foundation.ttf'),
      'Feather': require('native-base/Fonts/Feather.ttf'),
      'Fontisto': require('native-base/Fonts/Fontisto.ttf'),
      'SimpleLineIcons': require('native-base/Fonts/SimpleLineIcons.ttf'),
      'AntDesign': require('native-base/Fonts/AntDesign.ttf'),
      'GT-UltraBold': require('./assets/font/GTEestiProDisplay-UltraBold.ttf'),
      'GT-Bold': require('./assets/font/GTEestiProText-Bold.ttf'),
      'GT-Medium': require('./assets/font/GTEestiProText-Medium.ttf'),
      'GT-Regular': require('./assets/font/GTEestiProText-Regular.ttf'),
      'GT-Thin': require('./assets/font/GTEestiProText-Thin.ttf'),
    })
  }

  render() {
    const { loading } = this.state
    if (loading) {
      return (
        <AppLoading 
          onError={console.warn}
          startAsync={this.checkUser}
          onFinish={() => {}}
        />
      );}
      
    return (
      <Route 
        onRef={ref => this.child = ref}
      />
    );
  }
}

export default Musicapp;
