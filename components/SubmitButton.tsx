import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

interface submitProps {
    submit: () => void;
};
 
const SubmitButton: React.FC<submitProps> = (props) => {
    return (
        <TouchableOpacity onPress={props.submit} style={styles.submitButton}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: 'rgb(52,199,89)',
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

export default SubmitButton;