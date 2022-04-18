import React from 'react';
import { StyleSheet, View } from 'react-native';
import TodoList from '../components/TodoList';
import {AppCtx} from '../contexts'

const Start : React.FC = () => {
    const appContext = React.useContext(AppCtx);
    let cards = appContext.items;

    return (
        <View style={styles.container}>
            <TodoList items={cards} index={1} />
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
  
export default Start;