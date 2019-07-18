import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  BackAndroid,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import styles from './Style';
import axios from 'react-native-axios';

export default class Product extends React.Component {
  state = {
    jd: [],
  };

  static navigationOptions = {
    title: 'Products',
    headerLeft: null,
    gesturesEnabled: false,
  };

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }

  componentDidMount() {
    const url =
      'https://www.jsonbulut.com/json/product.php?ref=5380f5dbcc3b1021f93ab24c3a1aac24&start=0';
    axios.get(url).then(res => {
      const dt = res.data;
      //console.log('dt' + JSON.stringify(dt));
      this.setState({ jd: dt.Products[0].bilgiler });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            contentContainerStyle={{ flex: 1, margin: 10 }}
            data={this.state.jd}
            keyExtractor={item => item.productId}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.push('detail', { item: item });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderColor: '#a3a3a3',
                    borderWidth: 1,
                    borderRadius: 2,
                    marginBottom: 8,
                    marginRight: 8,
                  }}>
                  <Image
                    source={{ uri: item.images[0].thumb }}
                    style={{ width: 75, height: 75 }}
                  />
                  <View>
                    <Text style={{ fontSize: 16, width: 300 }}>
                      {item.productName}
                    </Text>
                    <Text style={{ color: '#31512a' }}>{item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}

