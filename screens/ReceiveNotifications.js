import React from 'react';
import { Text, View, Button } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { AsyncStorage } from 'react-native';

// const comprobar = window.comprobar;

export default class AppContainer extends React.Component {

  state = {
    notification: {},
   };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Ha ocurrido un error, no pudimos obtener el push token');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
    } else {
      alert('Sólo se mostrarán las notificaciones en un dispositivo físico');
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

  _storeData = async (url2) => {
    try {
      await AsyncStorage.setItem(DIRECTION, url2);
      this.setState({url2})

    } catch (error) {
      console.error('Failed to save name.')
    }
  };
  render() {
    
    if (this.state.notification.origin == "selected") {
      const url2 = this.state.notification.data.url;
      AsyncStorage.setItem('CLAVE', url2);
      console.log(url2);

    return (WebBrowser.openBrowserAsync(url2));
    
      } else if (this.state.notification.origin == "received"){ 
        const url3 = this.state.notification.data.url;
        // comprobar = true;
        AsyncStorage.setItem('CLAVE', url3);
        return (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Usted tiene un ticket activo.</Text>
              </View>
              <View>
                <Button onPress={verTicket}
                            title="Visualizar"
                            icon={
                                {
                                    name: "arrow-right",
                                    size: 19,
                                    color: "white"
                                }
                            }
                            color="#841584" 
                            type="outline" />
              </View>
            </View>
          );
        } else { 
          AsyncStorage.setItem('CLAVE', null);
          // comprobar = false;
          return (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Usted no posee tickets activos.</Text>
              </View>
            </View>
          );
      }
  } //fin render
} //fin clase

async function verTicket() {
  AsyncStorage.getItem('CLAVE', (err, result) => {
      if (result === null) {
          console.log("No hay nada");
      }else{
      const algo = result;
      //console.log(algo);
      WebBrowser.openBrowserAsync(algo);
      }
    });
}