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
import axios from 'react-native-axios'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import styles from './Style'

export default class Register extends React.Component {
  state = {
    name: '',
    surname: '',
    telephone: '',
    mail: '',
    pass: '',
    bordercolor: '#ed21ba',
  };

  fncAlert = (title, detail) => {
    Alert.alert(title, detail, [
      {
        text: 'OK',
        onPress: () => {
          /* */
        },
      },
    ]);
  }; 

  fncMailValid = mail => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
    if (reg.test(mail)) {
      this.setState({ bordercolor: '#ed21ba' });
      return true;
    } else {
      this.setState({ bordercolor: '#5a09a0' });
      return false;
    }
  };

  fncRegister = () => {
    const name = this.state.name;
    const surname = this.state.surname;
    const telephone = this.state.telephone;
    const mail = this.state.mail;
    const pass = this.state.pass;

    if (name === '') {
      this.fncAlert('Error', 'enter name');
    } else if (surname === '') {
      this.fncAlert('Error', 'enter surname');
    } else if (telephone === '') {
      this.fncAlert('Error', 'enter telephone');
    } else if (mail === '') {
      this.fncAlert('Error', 'enter mail');
    } else if (pass === '') {
      this.fncAlert('Error', 'enter pass');
    } else if (!this.fncMailValid(mail)) {
      this.fncAlert('Error', 'valid mail');
    } else {
      const url = "https://www.jsonbulut.com/json/userRegister.php"
      const dt = {
        ref: "5380f5dbcc3b1021f93ab24c3a1aac24",
        userName: name,
        userSurname: surname,
        userPhone: telephone,
        userMail: mail,
        userPass: pass,
      }

      axios.get(url, {params: dt}).then(res=>{
        const jd = res.data;
        // console.log("dt: " + JSON.stringify(jd))
        const durum = jd.user[0].durum
        const mesaj = jd.user[0].mesaj

        if(durum) {
          this.props.navigation.goBack();
        }else{
          this.fncAlert("Hata",mesaj);
        }
      })
    } 
    /*
    console.log(name);
    console.log('fncRegister calling');
    */
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={false}
          keyboardDismissMode="on-drag">
          <Text style={styles.txt}>User Register</Text>
          <TextInput
            value={this.state.name}
            onChangeText={txt => this.setState({ name: txt })}
            style={styles.input}
            placeholder="Name"
          />
          <TextInput
            value={this.state.surname}
            onChangeText={txt => this.setState({ surname: txt })}
            style={styles.input}
            placeholder="SurName"
          />
          <TextInput
            value={this.state.telephone}
            onChangeText={txt => this.setState({ telephone: txt })}
            keyboardType="phone-pad"
            style={styles.input}
            placeholder="Telephone"
          />
          <TextInput
            autoCapitalize="none"
            value={this.state.mail}
            onChangeText={txt => {
              this.setState({ mail: txt }), this.fncMailValid(txt);
            }}
            keyboardType="email-address"
            style={[styles.input, { borderColor: this.state.bordercolor }]}
            placeholder="Mail"
          />
          <TextInput
            value={this.state.pass}
            onChangeText={txt => this.setState({ pass: txt })}
            secureTextEntry
            style={styles.input}
            placeholder="Password"
          />
          <TouchableOpacity onPress={() => this.fncRegister()}>
            <Text style={styles.btn}>Register</Text>
          </TouchableOpacity>
          <Text>{this.state.name}</Text>
        </ScrollView>
      </View>
    );
  }
}
