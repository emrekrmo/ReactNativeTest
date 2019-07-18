import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Constants } from 'expo';
import axios from 'react-native-axios';
import styles from './Style';

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'User Login',
  };

  state = {
    mail: 'asd@dsf.com',
    pass: '12345',
    load: false,
  };

  fncAlert = (title, detail) => {
    Alert.alert(title, detail, [
      {
        text: 'OK',
        onPress: () => {
          /*  */
        },
      },
    ]);
  };

  fncLogin = () => {
    this.setState({ load: true });
    const mail = this.state.mail;
    const pass = this.state.pass;

    if (mail === '') {
      this.fncAlert('Error', 'enter mail');
    } else if (pass === '') {
      this.fncAlert('Error', 'enter pass');
    } else {
      const url = 'https://www.jsonbulut.com/json/userLogin.php';
      const dt = {
        ref: '5380f5dbcc3b1021f93ab24c3a1aac24',
        userEmail: mail,
        userPass: pass,
        face: 'no',
      };

      axios.get(url, { params: dt }).then(res => {
        const jd = res.data;
        // console.log("dt: " + JSON.stringify(jd))
        const durum = jd.user[0].durum;
        const mesaj = jd.user[0].mesaj;

        
        if (durum) {          
          this.props.navigation.push('product');
          this.fncAlert('OK', mesaj);
        } else {          
          this.fncAlert('Hata', mesaj);
        }
        this.setState({ load: false });
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps={false}>
          <Text style={styles.txt}>User Login</Text>

          <TextInput
            autoCapitalize="none"
            value={this.state.mail}
            onChangeText={txt => this.setState({ mail: txt })}
            style={styles.input}
            placeholder="Mail Address"
          />

          <TextInput
            value={this.state.pass}
            onChangeText={txt => this.setState({ pass: txt })}
            secureTextEntry
            style={styles.input}
            placeholder="Password"
          />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity disabled={this.state.load}
              onPress={() => {
                if (!this.state.load) this.fncLogin()
              }}>
              <Text disabled={this.state.load} style={styles.myButton}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.push('register');
              }}>
              <Text style={styles.myButton}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
