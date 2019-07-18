import * as React from 'react';
import { Text } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Login from './Login';
import Register from './Register';
import Product from './Product';
import Detail from './Detail';

const stack = createStackNavigator(
  {
    login: { screen: Login },
    register: { screen: Register },
    product: { screen: Product },
    detail: { screen: Detail },
  },
  {
    initialRouteName: 'login',
  }
);

export default createAppContainer(stack);
