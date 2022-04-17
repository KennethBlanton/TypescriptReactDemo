import React from 'react';
import TodoCard from './TodoCard';
import { StyleSheet, Text, View, FlatList, Pressable, GestureResponderEvent } from 'react-native';
import {TodoCardInterface} from '../models/todo.model';
import {AppCtx} from '../contexts';

interface TodoListProps {
    items?: Readonly<TodoCardInterface[]>;
    index: number
};

const TodoList : React.FC<TodoListProps> = (props) => {
    const appContext = React.useContext(AppCtx);
    if(!props.items?.length) return (<Text>No Cards</Text>)
    const renderItem = ({item} : {item: TodoCardInterface}) => {
        if(item.column !== props.index) return <View></View>
        return (
            <TodoCard item={item} />
        )
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <FlatList
                    data={appContext.items}
                    renderItem={renderItem}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    outerContainer: {
      flex: 1,
      width: '90%',
      marginTop: 20,
      backgroundColor: '#ccc',
      borderRadius: 10
    },
    container: {
        width: '90%',
        marginLeft: 18,
        marginTop: 10
    },
    scrollContainer: {
        height: '90%',
    }
});

export default TodoList;