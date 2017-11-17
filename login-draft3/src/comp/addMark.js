import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Button, TouchableOpacity, TextInput, WebView, ScrollView, NativeModules, LayoutAnimation, Picker} from 'react-native';


 
  export default class AddMark extends React.Component {
      
 constructor(props) {
  super();
  this.state = {
    language: 'english', // or language: '',
  }
      this.state = { text: 'Title' };
      this.closeWindow = this.closeWindow.bind(this);
}
      
          closeWindow(){
        this.props.changeWindowsShow(1);
    }
   
         callFun = () =>
  {
    alert("Image Clicked!!!");
  }
      
      
render() {
    
  
    
    return (
        
        
<View
 style={styles.containerAdd}>
    
        
   <View
    style={styles.containerDiv}>
        
                <Text style={styles.addMarkText}>
                 Add Bookmark</Text>
        
                <View style={styles.addMarkPic1}> 
                     <Image style={styles.addTitle}
                      source={require('../img/title.png')}/>
                     <View
                      style={styles.addMarkInp2}>
                           <TextInput
                            style={styles.addMarkInp}  
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}/>
                     </View>   
                </View>

                <View style={styles.addMarkPic1}>  
                     <Image style={styles.addFolder}
                      source={require('../img/folder.png')}/>
                     <View style={styles.addMarkPic}>   
                     </View>
                </View>

                <View style={styles.addMarkPic1}>   
                     <Image style={styles.addSubFolder}
                      source={require('../img/subFolder.png')}/>
                     <View style={styles.addMarkPic}>   
                     </View>
                 </View>
            
                 <View
                  style={styles.containerDivButs}>                      
                        <TouchableHighlight
                         style={styles.containerDivBut1}
                         onPress={this.closeWindow}>
                             <Text style={styles.containerDivButText}>
                             Cancel</Text>
                        </TouchableHighlight> 

                        <TouchableHighlight
                         style={styles.containerDivBut2}
                         onPress={this.callFun}>
                             <Text style={styles.containerDivButText}>
                              Save</Text>
                        </TouchableHighlight> 
                  </View>
  
   </View>
        
                          
</View>
    );
  }
};

const styles = StyleSheet.create({
    
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
}    
    
});
