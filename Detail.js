import * as React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { Constants } from 'expo';
import styles from './Style';

export default class Detail extends React.Component {
  data = this.props.navigation.getParam('item', null);

  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
      <Image resizeMode='center' style={{flex:1, height:300}} source={{uri: this.data.images[0].normal}} />
        <Text style={{fontSize:25, textAlign:'center'}}>{this.data.productName}</Text>
        <Text style={{fontSize:15, marginTop:20,}}>{this.data.description}</Text>
        </ScrollView>
      </View>
    );
  }
}
