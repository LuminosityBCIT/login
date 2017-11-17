import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Linking} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
  },
  photo: {
    height: 200,
    width: 200,
    borderRadius: 10,
  }
});

//
//  Online reference 
//  https://medium.com/differential/react-native-basics-how-to-use-the-listview-component-a0ec44cf1fe8
//
const BookMarkRowComponent = (props)  => {
    //
    //  https://apileap.com
    //  100 free screenshot API per month
    //
    let imgSource ={ uri: "https://apileap.com/api/screenshot/v1/urltoimage?access_key=6597e3c2daf5432cb84991dbd18c09f8&url="+props.bookmark.url };


  openBookmark = () =>
  {
      Linking.openURL(props.bookmark.url);
  }

  return (
    
    <View>
      <TouchableHighlight style={styles.container} onPress={this.openBookmark}>
        <Image style={styles.photo}
        source={imgSource}
        />
      </TouchableHighlight>

      <View style={styles.container}>
        <Text style={styles.text}>
          {`${props.bookmark.title}`}
        </Text>
      </View>
    </View>
  );
}

export default BookMarkRowComponent





