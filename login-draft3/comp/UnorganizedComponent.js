/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ListView, StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation,} from 'react-native';
    
import BookMarkRowComponent from './BookMarkRowComponent';
    
import CheckBox from 'react-native-checkbox';

//
//  https://www.npmjs.com/package/react-native-material-dropdown
//
import { Dropdown } from 'react-native-material-dropdown';

const { UIManager } = NativeModules;

var firebaseConfig = {
    apiKey: "AIzaSyCvPwGe93Z5ysoPNuU_QZeHRuyOQkqf5MU",
    authDomain: "luminosity-4dc48.firebaseapp.com",
    databaseURL: "https://luminosity-4dc48.firebaseio.com",
    projectId: "luminosity-4dc48",
    storageBucket: "luminosity-4dc48.appspot.com",
    messagingSenderId: "314360845682"
};

export default class UnorganizedComponent extends Component<{}> {

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

    callFun = () =>
    {
        alert("Image Clicked!!!");
    }

    changeWindowsShow = (bool) => 
    {
        var arg = bool;
        this.setState({changeWindows:arg});
    }

    submitBookmark = () =>
    {
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
        var titleValue = this.state.titleValue;
        var urlValue = this.state.urlValue;

        firebase.database().ref(dbRefValue).once('value').then(function(snapshot) {
            
            var snapshotArray = [];

            snapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                snapshotArray.push(item);
            });

            var newBookmark = {};
            newBookmark["title"] = titleValue;
            newBookmark["url"] = urlValue;
            newBookmark["folderkey"] = "unorganized";
            snapshotArray.unshift(newBookmark);

            firebase.database().ref(dbRefValue).set(snapshotArray);
        });
        this.state.changeWindows = null;
    }

    generateRandomString = () =>
    {
        //
        //  Same code used in extension to generate random string
        //
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for (var i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

          return text;
    }

    addFolder = () =>
    {
        var user = firebase.auth().currentUser;
        var folderDbRefValue = "users/"+user.uid+"/folders";
        var folderValue = this.state.folderValue;
        var folderKey = this.generateRandomString();
        var parentFolder = this.state.selectedParentFolder;

        firebase.database().ref(folderDbRefValue).once('value').then(function(snapshot) {
            
            var snapshotArray = [];

            snapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                snapshotArray.push(item);
            });

            var newFolder = {};
            newFolder["folder_name"] = folderValue;
            newFolder["folder_key"] = folderKey;

            if (parentFolder)
            {
                newFolder["parent_key"] = parentFolder['folder_key'];
            }

            snapshotArray.unshift(newFolder);

            firebase.database().ref(folderDbRefValue).set(snapshotArray);
        });
        this.state.changeWindows = null;
    }

    titlefunction = (text) =>
    {
        var titleFrom =text;
        this.setState({
            titleValue:titleFrom
        });
    }

    urlfunction = (text) =>
    {
        var urlFrom = text;
        this.setState({
            urlValue:urlFrom
        });
    }


    folderfunction = (text) =>
    {
        var folderFrom = text;
        this.setState({
            folderValue:folderFrom
        });
    }

    onParentFolderSelectionChange = (text) =>
    {
        var selectedFolder = null;

        this.state.folderLists.forEach(function(folder) {
            if (folder['folder_name'] == text)
            {
                selectedFolder = folder;
            }
        });

        this.setState({
            selectedParentFolder : selectedFolder
        });
    }

    folderSelection = (key, index, name, snapshot) =>{
            
        // folderKeyRef = database.ref("folder/"+key);
          
        // this.setState({
        //     folderkey: folderKeyRef.key
        // });
         
        // console.log(name + " key: " + folderKeyRef.key);

        // var folderNameDisplay = this.state.folderNameDisplay;
        // folderNameDisplay.innerHTML = name;  
    }


    removeFolder = (key, index) => {

        //
        //  Do the same thing as what I did for adding a new bookmark
        //  except that I don't add a new bookmark, and skip the index that I am deleting.
        //
        var user = firebase.auth().currentUser;
        var folderDbRefValue = "users/"+user.uid+"/folders";
        var folderValue = this.state.folderValue;
        firebase.database().ref(folderDbRefValue).once('value').then(function(snapshot) {
            
            var snapshotArray = [];
            var i = 0;
            snapshot.forEach(function(childSnapshot) {

                if (i != index)
                {
                    var item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    snapshotArray.push(item);
                }
                i++;
            });

            firebase.database().ref(folderDbRefValue).set(snapshotArray);
        });
        this.state.changeWindows = null;
    }
    
    constructor(props) {
        super(props);
        
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            folderLists: [],  
            selectedParentFolder: null,          
            titleValue:"",
            urlValue:"",
            folderValue:"",
            currentUser: null,
            dataSource: null,
            dataSource: ds,
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
            changeWindows:1,
            fbDatabase: null
        };

        this.generateRandomString = this.generateRandomString.bind();
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

        var folderDbRefValue = "users/"+user.uid+"/folders";
        var firebaseRef = firebase.database().ref(folderDbRefValue);
        firebaseRef.on('value', (snapshot) => {

            var folderArr = [];
            
            var parentFolders = [];
            var childFolders = [];
            var combinedOrderedFolder = [];

            snapshot.forEach(function(childSnapshot) {

                var folder_name = childSnapshot.child("folder_name").val();
                var folder_key = childSnapshot.child("folder_key").val();
                var parent_key = childSnapshot.child("parent_key").val();

                var obj = {
                    folder_name: folder_name,
                    folder_key: folder_key,
                    parent_key: parent_key,
                    value: folder_name,
                    key: snapshot.key
                };

                folderArr.push(obj);
            });

            //
            //  split parent, and child folders
            //
            folderArr.forEach(function(thisFolder) {

                //
                //  if parent key exists, save it in child folders
                //
                if (thisFolder["parent_key"])
                {
                    childFolders.push(thisFolder);
                }
                //
                //  if parent key does not exist, save it in parent folders
                //
                else {
                    parentFolders.push(thisFolder);
                }
            });

            //
            //  loop through parent folder array to save them in order with child
            //
            var testText = "";
            parentFolders.forEach(function(thisFolder) {

                combinedOrderedFolder.push(thisFolder);

                testText = testText + " // " + thisFolder['value'];

                childFolders.forEach(function(child) {

                    if (child['parent_key'] == thisFolder['folder_key'])
                    {
                        combinedOrderedFolder.push(child);
                testText = testText + " // " + child['value'];
                    }
                });
            });

            // alert(JSON.stringify(parentFolders));

            this.setState({
                folderLists: combinedOrderedFolder
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

     var windowDisplay = null;

        if(this.state.changeWindows == 1){
              windowDisplay = null
        }else if(this.state.changeWindows == 2){
            //
            //  Create folder
            //
             windowDisplay = (
              <View
 style={styles.containerAdd}>
    
        
   <View
    style={styles.containerDiv}>
        
                <Text style={styles.addMarkText}>
                 Add Folder</Text>
        
                <View style={styles.addMarkPic1}> 
                     <Image style={styles.addTitle}
                      source={require('../src/img/title.png')}/>
                     <View
                      style={styles.addMarkInp2}>
                           <TextInput
                            style={styles.addMarkInp}  
                            type="text" 
                            onChangeText={this.folderfunction}  
                            placeholder="folder name"
                            value={this.state.text}/>
                     </View>   
                </View>

                <View style={styles.folderDropDown}>  
                      <Dropdown
                        label='Choose parent folder'
                        data={this.state.folderLists}
                        onChangeText={this.onParentFolderSelectionChange}
                      />
                </View>

                 <View
                  style={styles.containerDivButs}>                      
                        <TouchableHighlight
                         style={styles.containerDivBut1}
                         onPress ={this.changeWindowsShow.bind(this,1)}>
                             <Text style={styles.containerDivButText}>
                             Cancel</Text>
                        </TouchableHighlight> 

                        <TouchableHighlight
                         style={styles.containerDivBut2}
                         onPress={this.addFolder}>
                             <Text style={styles.containerDivButText}>
                              Save</Text>
                        </TouchableHighlight> 
                  </View>
  
   </View>
        
                          
</View>
              ) 
        }else if(this.state.changeWindows == 3){

            //
            //  Add bookmark
            //
             windowDisplay = (

            <View style={styles.containerAdd}>
                <View style={styles.containerDiv}>
                    <Text style={styles.addMarkText}>
                    Add Bookmark</Text>

                    <View style={styles.addMarkPic1}> 
                        <Image style={styles.addTitle} source={require('../src/img/title.png')}/>
                        <View style={styles.addMarkInp2}>
                            <TextInput
                            style={styles.addMarkInp}  
                            type="text" 
                            onChangeText={this.titlefunction} 
                            placeholder="title"
                            value={this.state.text}/>
                        </View>   
                    </View>

                    <View style={styles.addMarkPic1}>  
                        <Image style={styles.addFolder}
                        source={require('../src/img/folder.png')}/>
                        <View style={styles.addMarkPic}>   
                    </View>
                </View>

                <View style={styles.addMarkPic1}>   
                    <Image style={styles.addSubFolder}
                    source={require('../src/img/subFolder.png')}/>
                    <View style={styles.addMarkPic}>  
                        <TextInput type="text" onChangeText={this.urlfunction} placeholder="url" />
                    </View>
                </View>

                <View
                style={styles.containerDivButs}>                      
                    <TouchableHighlight
                    style={styles.containerDivBut1}
                    onPress ={this.changeWindowsShow.bind(this,1)}>
                    <Text style={styles.containerDivButText}>
                    Cancel</Text>
                    </TouchableHighlight> 

                    <TouchableHighlight
                    style={styles.containerDivBut2}
                    onPress={this.submitBookmark}>
                    <Text style={styles.containerDivButText}>
                    Save</Text>
                    </TouchableHighlight> 
                </View>

            </View>
            </View>
              ) 
        }   

   var showFolder = this.state.folderLists.map((obj, i)=>{
    
    var imgElement = null;

    if (obj["parent_key"])
    {
        imgElement = <View style={styles.folderImgView}><Image style={styles.subFolderImg} source={require('../imgs_unorganized/subFolder.png')} /></View>;
    }
    else {
        imgElement = <View style={styles.folderImgView}><Image style={styles.folderImg} source={require('../imgs_unorganized/folder.png')} /></View>;
    }
        return (            
    <View style={styles.sidedivPic} key={i}>
        <View style={styles.sidedivSubPic}>  
            {imgElement} 
            <TouchableHighlight
            id="folderBtn" onPress={this.folderSelection.bind(this, obj['key'], i, obj['folder_name'])}>
            <Text >{obj["folder_name"]} </Text>
            </TouchableHighlight>
            <Button title={"X"}  onPress={this.removeFolder.bind(this, obj.key, i)}/>
         </View>                                      
    </View>
        ) 
    });

    //
    //  React-native simple listview implementation reference:
    //  https://medium.com/differential/react-native-basics-how-to-use-the-listview-component-a0ec44cf1fe8
    //
    return (
    <View style={styles.container}>

        <View style={styles.containerTitle}>   
            <View style={styles.containerTitleItems}> 

                <TouchableOpacity
                style={styles.butImg2}
                activeOpacity={1}
                onPress={this. burgerOnPress}>
                    <Image
                    style={styles.butImg}
                    source={require('../src/img/menuBut.png')} />
                </TouchableOpacity>  

                <TouchableOpacity
                style={styles.homeBut2}
                activeOpacity={1}>
                    <Image
                    style={styles.homeBut}
                    source={require('../src/img/homeBut.png')} />
                </TouchableOpacity>          

                <TouchableOpacity
                style={styles.butSear2}
                activeOpacity={1}>
                    <Image
                    style={styles.butSear}
                    source={require('../src/img/searchBut.png')} />
                </TouchableOpacity>          
            </View>                             
        </View>

        <ScrollView style={[styles.sidediv, {left: this.state.sideDivl}]} >
            {showFolder}
        </ScrollView>                    
       
        <View style={[styles.markView, {width: this.state.burgerw, left: this.state.burgerl}]} >  
            <ListView
            dataSource={this.state.dataSource}
            renderRow={(data) => <BookMarkRowComponent bookmark={data}/> }
            />
        </View>      

        <View style={styles.containerHead}>  

            <TouchableOpacity
            onPress ={this.changeWindowsShow.bind(this,3)}
            activeOpacity={1}   
            style={[styles.butCloud11, {top: this.state.t11, left: this.state.l11}]}>
                <Image
                style={[styles.butCloud1, {width: this.state.w, height: this.state.h}]} 
                source={require('../src/img/bmkBut.png')}/>           
            </TouchableOpacity>                

            <TouchableOpacity
            onPress={ this.callFun }
            activeOpacity={1}   
            style={[styles.butCloud22, {top: this.state.t22, left: this.state.l22}]} >
                <Image        
                style={[styles.butCloud2, {width: this.state.w, height: this.state.h}]} 
                source={require('../src/img/chcBut.png')}/> 
            </TouchableOpacity> 
                        
            <TouchableOpacity 
            onPress ={this.changeWindowsShow.bind(this,2)}
            activeOpacity={1}   
            style={[styles.butCloud33, {top: this.state.t33, left: this.state.l33}]} >                  
                <Image
                style={[styles.butCloud3, {width: this.state.w, height: this.state.h}]} 
                source={require('../src/img/pluBut.png')}/>
            </TouchableOpacity> 
                        
            <TouchableOpacity
            onPress={ this.callFun }
            activeOpacity={1}   
            style={[styles.butCloud44, {top: this.state.t44, left: this.state.l44}]} >               
                <Image
                style={[styles.butCloud4, {width: this.state.w, height: this.state.h}]} 
                source={require('../src/img/schBut.png')}/>
            </TouchableOpacity> 

            <TouchableOpacity 
            onPress={this.cloudOnPress} 
            activeOpacity={1}     
            style={styles.butCloud00}>                
                <Image
                style={styles.butCloud0}
                source={require('../src/img/cluBut.png')}/>  
            </TouchableOpacity>
        </View>   
        {windowDisplay}     
    </View>
    );
  }
};



const styles = StyleSheet.create({
benben: {
        position:"absolute",
        top:0,
        left:0,
        flex: 1,
        width: "10%",
        height: "10%",
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
},    
    
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
        backgroundColor:"white",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
},
 
homeBut:{
        width:100,
        height:24,
},    
    
    
homeBut2:{
        width:100,
        height:24,
        top:22,  
},

     
    
butImg2:{
         position: "relative",
         right:70,
         top:20,
         height:32,
         width:32,
},
    
folderImgView : {
    width: 40,
    height: 30
},

folderImg : {
    width: 31,
    height: 23
},

subFolderImg : {
    width: 27,
    height: 15
},

butImg:{ 
         height:32,
         width:32,    
},
    
butSear2:{
          position: "relative",
          left:70,
          top:20,
          height:32,
          width:32,
},
    
butSear:{
         height:32,
         width:32,    
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
        opacity: 1.0,
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
         position: 'absolute',
         
         top:70,
         height:"100%",
         width:"60%",
         bottom:0,
         backgroundColor:'white',
         shadowColor: '#000',
         shadowOffset: { width: 5, height: 0 },
         shadowOpacity: 0.1,
         shadowRadius: 10,   
  }, 
  
markView:{
         top:40,
         height:"80%",
       
         flexDirection: 'column',
},
    
markView2:{
         flexDirection: 'column',
         height:"100%",
         width:"100%",
         left:0,
},    
      
markGalleryDisplay:{
         height:"30%",
         width:"100%",
        
}, 
    
markGalleryText:{
         marginTop: 10, 
},
    
markImg:{
         width:"100%",
         height:180,
          marginTop: 10, 
         marginBottom:30,
}, 
    
sidedivPic:{
        left:"30%",
        width:"70%",
       
     
},   
    

    
    
    
containerAdd: {
        position:"absolute",
        top:0,
        left:0,
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
},

containerDiv: {  
       
        width: "90%",
        height: 450,
        backgroundColor:"white",
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#787878',
},
    
    //add folder    
    
addMarkText: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor:"white",
        marginTop:60,
        marginBottom:20,
},
    
addMarkPic1: {
       marginTop: 20,
       marginBottom: 20,
       width: "80%",
       height: 50,
       flexDirection: 'row',
},
    
addMarkPic2: {
       marginTop: 20,
       width: "78%",
       height: 50,
       flexDirection: 'row',
},    
    
addMarkPic: {
       left:0,
       width: "78%",
       height: "100%",
       marginBottom:20,
       borderRadius: 4,
       borderWidth: 2,
       borderColor: '#787878',
},    
    
    
addTitle: {
       marginTop: 15, 
       marginLeft: 0,
       width: 40,
       height: 14,
       margin:10,
},       
    
addChoose: {
       marginTop: 4, 
       marginLeft: 0,
       width: 70,
       height: 14,
       margin:10,
},           
    
addFolder: {
       width: 40,
       height: 30,
       margin:10,
       marginLeft: 0,
},   
    
addSubFolder: {
       width: 40,
      height: 22,
       margin:10,
     marginLeft: 0,
},     
    
    
    
addMarkInp: {  
       margin:5,
       marginTop:10,
       color: 'gray',
}, 

addMarkInp2: {
       width: "78%",
       height: 50,
       marginBottom:20,
       borderRadius: 4,
        borderWidth: 2,
        borderColor: '#787878',
},   

subFolde: {
     
       marginLeft:80,
     
},       

containerDivButs: {
        top:"5%",
        width: "90%",
        height: "10%",
},

containerDivBut1: {
        position: "relative",
        top:0,
        left:"10%",
        backgroundColor:"#FF6633",
        width: "30%",
        height: "100%",
        borderRadius: 10,
},
    
containerDivBut2: {
        position: "relative",
        top:"-100%",
        left:"60%",
        backgroundColor:"#3399FF",
        width: "30%",
        height: "100%",
        borderRadius: 10,
}, 
    
containerDivButText:{
        fontSize: 20,
        fontWeight: 'bold',
        color:"white",
        alignSelf:"center",
        marginTop: 9, 
},        
    
// add Mark
    
containerAdd: {
        position:"absolute",
        top:0,
        left:0,
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
},

containerDiv: {  
       
        width: "90%",
        height: 450,
        backgroundColor:"white",
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#787878',
},
    
    
    
    
addMarkText: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor:"white",
        marginTop:60,
        marginBottom:20,
},
    
addMarkPic1: {
      marginTop: 20,
       width: "80%",
       height: 50,
       flexDirection: 'row',
},
    
addMarkPic: {
       left:0,
       width: "78%",
       height: "100%",
       marginBottom:20,
       borderRadius: 4,
       borderWidth: 2,
       borderColor: '#787878',
},    
    
    
addTitle: {
       marginTop: 15, 
       marginLeft: 0,
       width: 40,
       height: 14,
       margin:10,
},       
    
addFolder: {
       width: 40,
       height: 30,
       margin:10,
       marginLeft: 0,
},   
    
addSubFolder: {
       width: 40,
      height: 22,
       margin:10,
     marginLeft: 0,
},     
    
    
    
addMarkInp: {  
       margin:5,
       marginTop:10,
       color: 'gray',
}, 

addMarkInp2: {
       width: "78%",
       height: 50,
       marginBottom:20,
       borderRadius: 4,
        borderWidth: 2,
        borderColor: '#787878',
},  

folderDropDown: {
       width: "80%"
},     

containerDivButs: {
        top:"5%",
        width: "90%",
        height: "10%",
},

containerDivBut1: {
        position: "relative",
        top:0,
        left:"10%",
        backgroundColor:"#FF6633",
        width: "30%",
        height: "100%",
        borderRadius: 10,
},
    
containerDivBut2: {
        position: "relative",
        top:"-100%",
        left:"60%",
        backgroundColor:"#3399FF",
        width: "30%",
        height: "100%",
        borderRadius: 10,
}, 
    
containerDivButText:{
        fontSize: 20,
        fontWeight: 'bold',
        color:"white",
        alignSelf:"center",
        marginTop: 9, 
},
bmfBut:{
    
  
   backgroundColor:"#3399FF",
   width: "80%",
   height:50,
   top:"5%",
   alignItems: "center",
 
},
sidedivSubPic:{
         marginTop:5,
        flexDirection: "row",
},    
    
markGallerySubDisplay:{ 
        flexDirection: "row",
         backgroundColor:"#f1f1f1",
    
    
},        
    
folderText:{
    marginTop:15,
    color: "white"
}
});
