import React, {useState} from 'react';
import { Keyboard} from 'react-native';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback } from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/core';
import {AppCtx} from '../contexts'
import { TodoCardInterface } from '../models/todo.model';
import BoardControls from '../components/BoardControls';
import PrioritiesList from '../components/PrioritiesList';
import FormError from '../components/FormError';
import TimesList from '../components/TimesList';

type ScreenNavigationProp<
    T extends keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, T>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    T
>;

type Props<T extends keyof RootStackParamList> = {
    route?: ScreenRouteProp<T>;
    navigation?: ScreenNavigationProp<T>;
    item: TodoCardInterface;
    closeModal?: () => void;
};

const NewTicket : React.FC<Props<'NewTicket'>> = ({navigation, item, closeModal}) => {
    const props = item || {};
    let priorityCheck : number = props.priority > -1 ? props.priority : NaN;
    const [time, setTime] = useState<number>(props.time || NaN);
    const [priority, setPriority] = useState<number>(priorityCheck);
    const [titleText, setTitleText] = useState<string>(props.title || 'Title');
    const [descText, setDescText] = useState<string>(props.desc || 'Description');
    const [formError, setFormError] = useState<string>('');
    // ask about route.params use and preference in react native typescript
    // due to type OOP rule : unable to set mutable variable to immutable property.
    const appContext = React.useContext(AppCtx);

    const submitTicket = () => {
        const valid =  simpleValidate()
        if(valid === 'Success' && appContext.items) {
            if(navigation) {
                appContext.items.push({
                    title: titleText,
                    desc: descText, 
                    time:time,
                    priority:priority,
                    id: appContext.items.length,
                    column: 1,
                    index: appContext.items.length,
                })
                appContext.save(appContext.items)
                .then(()=> {
                    if(appContext.setTodoList) {
                        appContext.setTodoList(appContext.items)
                    }
                    navigation.navigate('Home', appContext.items)
                });
            }
        } else {
            setFormError(valid);
        }
    }

    const updateTicket = (num : number) => {
        appContext.save(appContext.items).then(() => {
            let arr = appContext.items;
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if(element.index === props.index) {
                    element.title = titleText;
                    element.desc = descText;
                    element.time = time;
                    element.priority = priority;
                    element.column = props.column + num
                    break
                }
            }
            appContext.setTodoList && appContext.setTodoList(appContext.items)
            closeModal && closeModal();
        })
    }

    const simpleValidate = () => {
        if(titleText === 'Title' || !titleText.length) return "Enter Title";
        if(descText === 'Description' || !descText.length) return "Enter Desc";
        if(!time) return "Enter Time";
        if(isNaN(priority)) return "Enter Priority";
        return "Success";
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setTitleText}
                        value={titleText}
                    />
                    <TextInput
                        style={styles.textInput}
                        multiline
                        numberOfLines={4}
                        onChangeText={setDescText}
                        value={descText}
                    />
                    <Text style={styles.text} >Select Time</Text>
                    <TimesList setTime={setTime} time={time} />
                    <Text style={styles.text}> Select Priority</Text>
                    <PrioritiesList setPriority={setPriority} priority={priority} />
                    <BoardControls item={item} updateTicket={updateTicket} submitTicket={submitTicket} />
                </View>
                <FormError  error={formError}/>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '100%'
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      width: '90%',
      marginLeft: '5%',
      marginRight: '5%',
      marginTop: 10
    },
    text: {
        fontSize: 20,
        width: '100%',
        marginBottom: 10
    },
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        marginBottom: 10
    },
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
    textInput : {
        fontSize: 18,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom: 5,
        paddingTop: 5,
        borderColor: 'rgb(209,209,214)',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 20,
        width: 320,
        marginBottom: 10,
        maxHeight: 150
    },
    hidden: {
        display: 'none',
    },
  });
  
export default NewTicket;