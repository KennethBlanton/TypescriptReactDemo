import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {PRIORITIES} from '../constants';
interface PrioritiesListProps {
    setPriority: React.Dispatch<React.SetStateAction<number>>,
    priority: number,
}
const PrioritiesList : React.FC<PrioritiesListProps> = (props) => {

    return (
        <View style={styles.priorityContainer}>
            {PRIORITIES.map((value, key) => {
                const colors = [styles.low,styles.medium,styles.high,styles.critical]
                let highlight = styles.priorityContainerInner
                if(props.priority === key) {
                    highlight = styles.priorityContainerInnerHighlight;
                }
                return (
                    <TouchableOpacity 
                        style={highlight} 
                        onPress={() => {props.setPriority(key)}}
                        key={key}
                    >
                        <View style={colors[key]}></View>
                        <Text style={styles.button}>
                            <Text style={styles.buttonText}>{value.toString()}</Text>
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}
const styles = StyleSheet.create({
    low: {
        backgroundColor: 'rgb(0,122,255)',
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    medium: {
        backgroundColor: 'rgb(52,199,89)',
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    high: {
        backgroundColor: 'rgb(255,204,0)',
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    critical: {
        backgroundColor: 'rgb(255,59,48)',
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    priorityContainerInner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '49%',
        backgroundColor: 'rgb(99,99,102)',
        marginBottom: 15,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
    },
    priorityContainerInnerHighlight: {
        opacity: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '49%',
        backgroundColor: 'rgba(99,99,102, 0.5)',
        marginBottom: 15,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
    },
    priorityContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        flexWrap: 'wrap',
        width: '100%'
    },
    buttonText: {
        fontSize: 20,
        color: 'rgb(242,242,247)'
    },
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        marginBottom: 10
    },
})

export default PrioritiesList