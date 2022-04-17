import React from 'react';
import { StyleSheet, Text, View, Pressable} from 'react-native';

interface FormErrorProps {
    error: String,
    errorCode?: number
}

const FormError : React.FC<FormErrorProps> = (props) => {
    if(!props.error) return <></>
    return (
        <View style={styles.formError} >
            <Text style={styles.errorText}>{props.error}</Text>
        </View> 
    )
}

const styles = StyleSheet.create({
    formError: {
        backgroundColor: 'red',
        width:'100%',
        position: 'absolute',
        bottom: 0,
        height: 80
    },
    errorText: {
        fontSize: 20,
        textAlign: 'center',
        padding: 15
    },
})

export default FormError