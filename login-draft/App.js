/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//
//  Project Set-up reference: 
//  https://facebook.github.io/react-native/docs/getting-started.html
//
//  
//  
//

import React, { Component } from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import * as firebase from 'firebase';
import UnorganizedComponent from './comp/UnorganizedComponent';

import {
    Platform,
    StyleSheet,
    Text,
    Button,
    Image,
    TouchableHighligh,
    Icon,
    NavigatorIOS,
    View
} from 'react-native';

//
//  Navigation for react native
//  https://reactnavigation.org/docs/intro/quick-start
//
import {
  StackNavigator,
} from 'react-navigation';
 
//
//  https://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html
// Initialize Firebase
//
var firebaseConfig = {
    apiKey: "AIzaSyCvPwGe93Z5ysoPNuU_QZeHRuyOQkqf5MU",
    authDomain: "luminosity-4dc48.firebaseapp.com",
    databaseURL: "https://luminosity-4dc48.firebaseio.com",
    projectId: "luminosity-4dc48",
    storageBucket: "luminosity-4dc48.appspot.com",
    messagingSenderId: "314360845682"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends Component<{}> {
    
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
        this.login = this.login.bind(this);
    }
    
    componentWillMount() {
        this.listenForAuth()
    }

    componentDidMount()
    {
        GoogleSignin.configure({
          iosClientId: '314360845682-dnu615bl3jc76omfgssh6779o29h49je.apps.googleusercontent.com' // only for iOS
        }).then(() => {
            
        });
    }

    //
    //  Reference
    //  https://stackoverflow.com/questions/43019528/react-native-firebase-onauthstatechanged 
    //
    listenForAuth() {
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    currentUser: user
                })
            } 
        })
    }
    
    //
    //  ReactNative Firebase Auth reference:
    //  https://rnfirebase.io/docs/v3.1.*/auth/social-auth
    //
    //  ReactNative Google Login reference:
    //  https://github.com/devfd/react-native-google-signin
    //
    login ()
    {
        GoogleSignin.signIn()
            .then((user) => {
    
                alert(user.name + " is successfully logged-in!");
                //
                // https://rnfirebase.io/docs/v3.1.*/auth/social-auth
                // create a new firebase credential with the token
                //
                const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);
                // login with credential
                return firebase.auth().signInWithCredential(credential);
            })
            .catch((err) => {
            })
            .done();
    }

    render() {
        let buttonComponent = null;
        
        if (!this.state.currentUser)
        {
//            buttonComponent = <TouchableHighligh onPress={this.login}><View><Icon name="fontawesome|facebook-square" size={30} /><Text>Sign-in with Google</Text> </View></TouchableHighligh>
//            buttonComponent = <GoogleSigninButton style={{width: 312, height: 48}} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={this.login}/>;   
            return (
                <View style={styles.container}>
                    <Image source={require('./imgs/background.png')} style={styles.entireBg} />
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={{width:150, height:180, marginBottom:70}} source={require('./imgs/logo.png')} />
                    </View>            
                    <View><Image style={{width:30, height:30}} source={require('./imgs/google.png')} /><Button style={{marginLeft: 40, fontSize: 20, backgroundColor: 'blue', color: 'blue'}} onPress={this.login} title="Sign in with Google"/></View>
                </View>
            );
        }
        else {
            return (
                    <UnorganizedComponent style={{flex: 1, flexDirection: 'row'}} />
            );
        }
    }
}

const styles = StyleSheet.create({
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    entireBg:{
        flex:1,
        alignSelf:'stretch',
        position:'absolute',
    }
});
