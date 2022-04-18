import React from 'react';
import { StyleSheet, View } from 'react-native';
import TodoList from '../components/TodoList';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/core';
import {AppCtx} from '../contexts'

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

const Done : React.FC<Props<'Done'>> = ({navigation}) => {
    const appContext = React.useContext(AppCtx);
    let cards = appContext.items;

    return (
        <View style={styles.container}>
            <TodoList items={cards} index={3} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
  });
  
export default Done;