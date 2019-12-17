import React, { Component } from 'react';
import { Text, View, StyleSheet, WebView } from 'react-native';
import { Constants, Permissions, Notifications } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class App extends Component {
  onNavigationStateChange = navState => {
    if (navState.url.indexOf('https://www.google.com') === 0) {
      const regex = /#access_token=(.+)/;
      let accessToken = navState.url.match(regex)[1];
      console.log(accessToken);
    }
  };
  
  render() {
    const { status } =  Permissions.getAsync(Permissions.NOTIFICATIONS);
    let token =  Notifications.getExpoPushTokenAsync();
    //const url2 = JSON.stringify(this.state.notification.data);
    const url = `http://66.97.34.159:8080/vub/vistas/turnosWeb/turnosweb.zul?token=${token}`;
    return (
      //<KeyboardAwareScrollView>
      <WebView
        source={{
          uri: url,
        }}
        startInLoadingState={true}
        renderLoading={() => <Text>Cargando...</Text>}
        onNavigationStateChange={this.onNavigationStateChange}
        scalesPageToFit
        javaScriptEnabled
        style={{flex: 5}}
      />
      //</KeyboardAwareScrollView>
      
    );
  }
}