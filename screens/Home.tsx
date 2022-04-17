import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/core';
import {AppCtx} from '../contexts';

type ScreenNavigationProp<
    T extends keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, T>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    T
>;
type Props<T extends keyof RootStackParamList> = {
    route: ScreenRouteProp<T>;
    navigation: ScreenNavigationProp<T>;
};

const Home : React.FC<Props<'Home'>> = ({navigation,route}) => {
  const appContext = React.useContext(AppCtx);
  let todoList = appContext.items;

  return (
    <View style={styles.container}>
      <Button
          onPress={() => {
            navigation.navigate('NewTicket')
          }}
          title="New Ticket"
      />
      <Button
          onPress={() => {
            navigation.navigate('Start')
          }}
          title="Navigate to start column"
      />
      <Button
          onPress={() => {
            navigation.navigate('InProgress')
          }}
          title="Navigate to in progress column"
      />
      <Button
          onPress={() => {
            navigation.navigate('Done', todoList)
          }}
          title="Navigate to Done Column"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  
export default Home;