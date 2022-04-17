import React from 'react';
import { TodoCardInterface } from '../models/todo.model';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import SubmitButton from '../components/SubmitButton';

interface boardControlProps {
    updateTicket: (num: number) => void;
    item?: TodoCardInterface,
    submitTicket: () => void,
};

const BoardControls : React.FC<boardControlProps> = (props) => {
    if(!props.item || !props.item.column) return <SubmitButton submit={props.submitTicket} />

    const column = props.item.column
    const columnArr = ['Start', 'In Progress', 'Done']
    let moveBackText = props.item.column !== 1 ? `< ${columnArr[column-2]}` : `At Start`;
    let moveForwardText = props.item.column !== columnArr.length ? `${columnArr[column]} >` : `At Done`;
    return (
        <View>
            <View style={styles.boardControlContainer}>
                <Pressable style={styles.moveButton} onPress={() => props.updateTicket(-1)}>
                    <Text style={styles.moveButtonText} >{moveBackText}</Text>
                </Pressable>
                <Pressable onPress={() => props.updateTicket(1)} style={styles.moveButton}>
                    <Text style={styles.moveButtonText} >{moveForwardText}</Text>
                </Pressable>
            </View>
            <Pressable style={styles.submitButton} onPress={() => props.updateTicket(0)}>
                <Text style={styles.moveButtonText} >Update</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    moveButton: {
        backgroundColor: "#2196F3",
        elevation: 2,
        padding: 10,
        margin: 5,
        borderRadius: 5,
        marginBottom: 10
    },
    moveButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 20
    },
    boardControlContainer: {
        display: 'flex',
        flexDirection:'row'
    },
    submitButton: {
        backgroundColor: 'rgb(52,199,89)',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        marginBottom: 10
    },
})

export default BoardControls