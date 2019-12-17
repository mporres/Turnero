import * as WebBrowser from 'expo-web-browser';
import * as Permissions from 'expo-permissions'
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    Alert
} from 'react-native';
import { AsyncStorage } from 'react-native';

import { Notifications, Linking } from 'expo';

//AsyncStorage.clear();
var comprobar = false
var auxilio = true
// const comprobar = window.comprobar;
export default function HomeScreen() {

    AsyncStorage.getItem('CLAVE', (err, result) => {
        if (result === null) {
        console.log("No hay nada");
        comprobar = false;
        }else{
        comprobar = true;
        }
        console.log(comprobar);
      }); 
    
    if (comprobar === auxilio) {
        return ( 
            <View style = { styles.container }>
            <ScrollView style = { styles.container } contentContainerStyle = { styles.contentContainer }>
                <View style = { styles.welcomeContainer }>
                    <Image source = {
                        __DEV__ ?
                        require('../assets/images/robot-dev.png') :
                        require('../assets/images/robot-prod.png')
                        }
                    style={styles.welcomeImage}/>
                </View>
    
                <View style={styles.getStartedContainer}>
                <DevelopmentModeNotice />
    
                <Text style={styles.getStartedText}>DEMO</Text>
    
                <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
    
                </View>
    
                <Text style={styles.getStartedText}>
                </Text> 
                </View> 
    
                    <View style={styles.helpContainer}>
                        <Button onPress={pedirTurno}
                            title="Pedir Turno"
                            icon={
                                {
                                    name: "arrow-right",
                                    size: 19,
                                    color: "white"
                                }
                            } />
                    </View>
            </ScrollView>
    </View>
        );
    } else {
        return ( 
            <View style = { styles.container }>
            <ScrollView style = { styles.container } contentContainerStyle = { styles.contentContainer }>
                <View style = { styles.welcomeContainer }>
                    <Image source = {
                        __DEV__ ?
                        require('../assets/images/robot-dev.png') :
                        require('../assets/images/robot-prod.png')
                        }
                    style={styles.welcomeImage}/>
                </View>
    
                <View style={styles.getStartedContainer}>
                <DevelopmentModeNotice />
    
                <Text style={styles.getStartedText}>DEMO</Text>
    
                <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
    
                </View>
    
                <Text style={styles.getStartedText}>
                </Text> 
                </View> 
    
                    <View style={styles.helpContainer}>
                        <Button onPress={pedirTurno}
                           onPress={pedirTurno}
                            title="Pedir Turno"
                            icon={
                                {
                                    name: "arrow-right",
                                    size: 19,
                                    color: "white"
                                }
                            } />
                    </View>
                    <View style={styles.helpContainer}>
                        <Text style={styles.developmentModeText}>Usted tiene un ticket activo</Text>
                        <Button onPress={verTicket}
                            title="Ver ticket"
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
            </ScrollView>
    
       
    </View>
    
    
        );
    }
    
}

state = {
    redirectData: null,
};

// _retrieveData = async () => {
//         try {
//             const url2 = await AsyncStorage.getItem(STORAGE_KEY)
      
//             if (url2 !== null) {
//               this.setState({url2})
//             }
//           } catch (e) {
//             console.error('Failed to load .')
//           }
//   };

_openWebBrowserAsync = async() => {
    try {
        this._addLinkingListener();
        let result = WebBrowser.openBrowserAsync(
            // We add `?` at the end of the URL since the test backend that is used
            // just appends `authToken=<token>` to the URL provided.
            `https://backend-xxswjknyfi.now.sh/?linkingUri=${Linking.makeUrl('/?')}`
        );
        this._removeLinkingListener();
        this.setState({ result });
    } catch (error) {
        alert(error);
        console.log(error);
    }
};
_handleRedirect = event => {
    WebBrowser.dismissBrowser();

    let data = Linking.parse(event.url);

    this.setState({ redirectData: data });
};

_addLinkingListener = () => {
    Linking.addEventListener('url', this._handleRedirect);
};

_removeLinkingListener = () => {
    Linking.removeEventListener('url', this._handleRedirect);
};

_maybeRenderRedirectData = () => {
    if (!this.state.redirectData) {
        return <Text> {Expo.Constants.linkingUri } </Text>;
        

    }

    return <Text> { JSON.stringify(this.state.redirectData) } </Text>;
};

HomeScreen.navigationOptions = {
    header: null,
};




// function alert(parameter) {
//     // let token = registerForPushNotificationsAsync2();
//     let mensage = JSON.stringify(parameter);

//     Alert.alert(
//         'Tu token',
//         `${mensage}`, [

//             { text: 'OK', onPress: () => console.log('OK ') },
//         ], { cancelable: false }
//     )

// }

function DevelopmentModeNotice() {
    if (__DEV__) {


        return ( 
            <Text style = { styles.developmentModeText }>
            Modo Desarrollo
            </Text>
        );
    } else {
        return ( 
            <Text style = { styles.developmentModeText }>
            Open Sayges 
            </Text>
        );
    }
}

// function handleLearnMorePress() {
//     WebBrowser.openBrowserAsync(
//         'https://docs.expo.io/versions/latest/workflow/development-mode/'
//     );
// }

// function handleSayges() {

//     // let token1 = alertIfRemoteNotificationsDisabledAsync();
//     WebBrowser.openBrowserAsync(
//         `http://66.97.34.159/vub/vistas/turnosWeb/turnosweb.zul?token=${'hola'}`
//     );
// }



async function pedirTurno() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
        console.log("No funciona");
    }
    if (status == 'granted') {
        let token = await Notifications.getExpoPushTokenAsync();
        WebBrowser.openBrowserAsync(
            `http://66.97.34.159:8080/vub/vistas/turnosWeb/turnosweb.zul?token=${token}`
        );
    }
}

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

function corroborar(result) {
    AsyncStorage.getItem('CLAVE', (err, result) => {
        if (result === null) {
            valor2 = result;
            //console.log('su valor es valor2');
            //console.log(valor2);
            }else{
            valor2 = result;
            //console.log('su valor es valor2');
            //console.log(valor2);
            }
            return valor2;
      });
      
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        alignItems: 'center',
        marginTop:20
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },

    header: {
        fontSize: 25,
        marginBottom: 25,
    },
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
    },
    header1: {
        fontSize: 25,
        marginBottom: 25,
    }
});