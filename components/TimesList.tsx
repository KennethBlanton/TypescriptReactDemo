import React from 'react';
import {TIME_VAL_ARR} from '../constants';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface TimesListProps {
    time: number,
    setTime: React.Dispatch<React.SetStateAction<number>>,
}

const TimesList : React.FC<TimesListProps> = (props) => {
    return(
        <View style={styles.timeContainer}>
            {TIME_VAL_ARR.map((value,key) => {
                let style = props.time === TIME_VAL_ARR[key] ? styles.timeButtonHighlight : styles.timeButton
                return (
                    <TouchableOpacity key={key} style={style} onPress={() => {props.setTime(value)}} >
                        <Text style={styles.buttonText}>{value.toString()}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    timeContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    timeButtonHighlight: {
        backgroundColor: 'rgba(99,99,102, 0.5)',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        marginBottom: 10
    },
    timeButton: {
        backgroundColor: 'rgb(99,99,102)',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        fontSize: 20,
        color: 'rgb(242,242,247)'
    },
})

export default TimesList