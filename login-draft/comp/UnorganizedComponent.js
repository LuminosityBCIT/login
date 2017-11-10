/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ListView, StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation,} from 'react-native';
        
import BookMarkRowComponent from './BookMarkRowComponent';
        
const { UIManager } = NativeModules;

export default class UnorganizedComponent extends Component<{}> {
    
    state = {
        t11: 0,
        l11: 130,
        t22: -15,
        l22: 70,
        t33: -10,
        l33: 25,
        t44: 10,
        l44: 0,
        w: 40,
        h: 40,
        cloudbuts:true,
        burgerl: "5%",
        burgerw: "90%",
        sideDivl: "-60%",
        burgerbuts:true,
        fbDatabase: null
    };

    cloudOnPress = () => {
        if(this.state.cloudbuts == true) { 
            this.state.cloudbuts = false;    
            LayoutAnimation.spring();
            this.setState({t11: this.state.t11 = 112, l11: this.state.l11 = 113})
            this.setState({t22: this.state.t22 = 71, l22: this.state.l22 = 113})
            this.setState({t33: this.state.t33 = 30, l33: this.state.l33 = 113})
            this.setState({t44: this.state.t44 = -10, l44: this.state.l44 = 113})
            this.setState({w: this.state.w = 0, h: this.state.h = 0})
        }
        else { 
            this.state.cloudbuts = true;    
            LayoutAnimation.spring();
            this.setState({t11: this.state.t11 = 0, l11: this.state.l11 = 130})
            this.setState({t22: this.state.t22 = -15, l22: this.state.l22 = 70})
            this.setState({t33: this.state.t33 = -10, l33: this.state.l33 = 25})
            this.setState({t44: this.state.t44 = 10, l44: this.state.l44 = 0})
            this.setState({w: this.state.w = 40, h: this.state.h = 40})
        }  
    }
    
    burgerOnPress = () => {
        if(this.state.burgerbuts == true) { 
            this.state.burgerbuts = false;    
            LayoutAnimation.spring();
            this.setState({burgerl: this.state.burgerl = "50%"})
            this.setState({burgerw: this.state.burgerw = "45%"})
            this.setState({sideDivl: this.state.sideDivl = "-10%"})
        }
        else { 
            this.state.burgerbuts = true;    
            LayoutAnimation.spring();
            this.setState({burgerl: this.state.burgerl = "5%"})
            this.setState({burgerw: this.state.burgerw = "90%"})
            this.setState({sideDivl: this.state.sideDivl = "-60%"})
        }  
    }
    
    constructor(props) {
        super(props);
        
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            currentUser: null,
            dataSource: null,
            dataSource: ds
        };
    }
    
    componentWillMount() {
        this.listenForAuth()
    }

    componentDidMount()
    {
        this.state.burgerbuts = true;
        this.setState({burgerl: this.state.burgerl = "5%"})
        this.setState({burgerw: this.state.burgerw = "90%"})
        this.setState({sideDivl: this.state.sideDivl = "-60%"})
        
        //
        //  For Firebase Real-time database with React-Native
        //  https://medium.com/@mpr312/a-simple-react-native-app-using-firebase-realtime-database-ce794ecdc47d
        //
        var firebaseDbh = firebase.database();
        var user = firebase.auth().currentUser;
        //
        //  Firebase db database key
        //  Warning: this needs to be synced with Extension data format
        //
        var dbRefValue = "users/"+user.uid+"/bookmarks";
        
        // connect to a Firebase table
        var dbref = firebaseDbh.ref(dbRefValue);
        dbref.on('value', (e) => {
            var rows = [];
            if ( e && e.val() && e.val().map ) {
                e.val().map((v) => rows.push ( v ));
            }
            var ds = this.state.dataSource.cloneWithRows(rows);
            this.setState({
                dataSource: ds
            });
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
    
render() {
    
    callFun = () =>
  {
    alert("Image Clicked!!!");
  }

    //
    //  React-native simple listview implementation reference:
    //  https://medium.com/differential/react-native-basics-how-to-use-the-listview-component-a0ec44cf1fe8
    //
    return (
        <View style={styles.container}>
            <View>
                <TouchableHighlight style={styles.butImg2}
                 onPress={this. burgerOnPress}>
                    <Image
                     style={styles.butImg}
                     source={require('../imgs_unorganized/menuBut.png')} />
                </TouchableHighlight> 
            </View>
            <View style={[styles.sidediv, {left: this.state.sideDivl}]} >
                <TextInput placeholder=""/ >
                <Text>Latest</Text>
                <Text>Events</Text>
                <Text>Update</Text>
            </View>
                                            
                                   
            <View style={[styles.markView, {width: this.state.burgerw, left: this.state.burgerl}]} >  
                <ListView
                dataSource={this.state.dataSource}
                renderRow={(data) => <BookMarkRowComponent bookmark={data}/> }
                />
            </View>                         
                        <View style={styles.containerHead}>  
               
                              <TouchableHighlight 
                               style={[styles.butCloud11, {top: this.state.t11, left: this.state.l11}]}>
                                    <Image
                                    style={[styles.butCloud1, {width: this.state.w, height: this.state.h}]} 
                                    source={require('../imgs_unorganized/bmkBut.png')}/>           
                              </TouchableHighlight>                
                              
                              <TouchableHighlight onPress={ this.callFun }
                               style={[styles.butCloud22, {top: this.state.t22, left: this.state.l22}]} >
                                    <Image        
                                    style={[styles.butCloud2, {width: this.state.w, height: this.state.h}]} 
                                    source={require('../imgs_unorganized/chcBut.png')}/> 
                              </TouchableHighlight> 
                                            
                              <TouchableHighlight onPress={ this.callFun }
                               style={[styles.butCloud33, {top: this.state.t33, left: this.state.l33}]} >                  
                                    <Image
                                    style={[styles.butCloud3, {width: this.state.w, height: this.state.h}]} 
                                    source={require('../imgs_unorganized/pluBut.png')}/>
                              </TouchableHighlight> 
                                            
                               <TouchableHighlight onPress={ this.callFun }
                                style={[styles.butCloud44, {top: this.state.t44, left: this.state.l44}]} >               
                                    <Image
                                    style={[styles.butCloud4, {width: this.state.w, height: this.state.h}]} 
                                    source={require('../imgs_unorganized/schBut.png')}/>
                               </TouchableHighlight> 
                       
                              <TouchableHighlight onPress={this.cloudOnPress} 
                               style={styles.butCloud00}>                
                                    <Image
                                    style={styles.butCloud0}
                                    source={require('../imgs_unorganized/cluBut.png')}/>  
                              </TouchableHighlight>
                        </View>        
                </View>
    );
  }
};



const styles = StyleSheet.create({
container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor:'transparent',
        justifyContent: 'center',
        flexDirection: 'column',
},
    
containerTitle: {
        flex: 1,
        position: 'absolute',
        top:0,      
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
},
    
buttonHead:{
        left:100,
        height:40,
        width:80,
        backgroundColor:'#48BBEC',
        borderColor:'#48BBEC',
        margin:100,
},
    
headText:{
        width:180,
        textAlign:"center",
},
     
butImg2:{
    position:"absolute",
    top: -35,
    left: 10,
         height:27,
         width:27
},
    
butImg:{
         height:27,
         width:27,    
},
  
containerHead:{
         position: 'absolute',
         bottom:0,
         right:0,  
         height:175,
         width:175,   
},
    
butCloud0:{
         top:0,
         left:0,
         height:80,
         width:70, 
},
    
butCloud1:{
         top:0,
         left:0,
         height:40,
         width:40,    
},
       
butCloud2:{
         top:0,
         left:0,
         height:40,
         width:40,    
},
    
butCloud3:{
         top:0,
         left:0,
         height:40,
         width:40,    
},
    
butCloud4:{ 
         top:0,
         left:0,
         height:40,
         width:40,   
},
    
butCloud00:{
         bottom:70,
         left:100,
         height:80,
         width:70, 
},
    
butCloud11:{
         position: "relative",
         top:0,
         left:130,
         height:40,
         width:40,   
},
    
butCloud22:{
         position: "relative",
         top:-15,
         left:70,
         height:40,
         width:40,    
},
    
butCloud33:{
         position: "relative",
         top:-10,
         left:25,
         height:40,
         width:40,    
},
    
butCloud44:{
         top:10,
         left:0,
         height:40,
         width:40,   
},
    
containerTitleItems:{
         top: "-15%",    
         flexDirection:'row', 
},
   
sidediv:{
        alignItems: 'center',
        position: 'absolute',
        height:"91.5%",
        width:"55%",
        bottom:0,
        backgroundColor:'hotpink',
  }, 
  
markView:{
         top:20,
         height:"80%",
         overflow: 'hidden',
         backgroundColor:'#FCDFFF',
         alignItems: 'center',
         flexDirection: 'column',
        justifyContent: 'center'
},
      
markGalleryDisplay:{
         height:"30%",
         width:"100%",
         margin: "5%", 
}, 
    
markGalleryText:{
         marginBottom:5,
},
    
markImg:{
         width:"100%",
         height:"100%",
}
});
