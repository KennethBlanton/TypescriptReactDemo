import React, {useState} from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import {TodoCardInterface} from '../models/todo.model';
import {PRIORITIES} from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {AppCtx} from '../contexts';
import NewTicket from '../screens/NewTicket';

interface TodoCardProps {
    item: TodoCardInterface;
};

const TodoCard : React.FC <TodoCardProps> = ({item}) => {
    const [selected, setSelected] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const colors = [styles.low,styles.medium,styles.high,styles.critical]
    const appContext = React.useContext(AppCtx);

    const onLongPress = () => {
        setSelected(false)
        setModalVisible(true)
    }

    const onClosePress = () => {
        let arr = appContext.items
        let index : number = -1;
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if(element.index === item.index) {
                index = i;
                break;
            }
        }
        appContext.items.splice(index,1)
        appContext.save(appContext.items)
        .then(()=> {
            if(appContext.setTodoList) {
                appContext.setTodoList(appContext.items)
            }
        });
    }

    const onShortPress = () => {
        setSelected(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }
    
    return (
        <View>
            <TouchableOpacity onPress={onShortPress} onLongPress={onLongPress}>
                <View style={styles.container}>
                    <View style={styles.closeContainer}>
                        <Text style={styles.titleText} >{item.title}</Text>
                        <TouchableOpacity style={!selected && styles.hidden} onPress={onClosePress}>
                            <Text style={styles.closeText}>X</Text>
                        </TouchableOpacity>      
                    </View>
                    <Text style={styles.text} >{item.desc}</Text>
                    <View style={styles.bottomCard}>
                        <View style={styles.priorityContainer}>
                            <View style={colors[item.priority]}></View>
                            <Text style={styles.text} >{PRIORITIES[item.priority]}</Text>
                        </View>
                        <Text style={styles.text} >{item.time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <NewTicket item={item} closeModal={closeModal} />
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Back</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      display:'flex',
      backgroundColor: '#ddd',
      width: '100%',
      marginBottom: 10,
      borderRadius: 10,
      padding: 15
    },
    closeContainer : {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 10,
    },
    hidden: {
        display: 'none'
    },
    text: {
        fontSize: 24,
        marginLeft: 10,
        marginBottom: 10
    },
    titleText: {
        fontSize: 24,
        flex: 8,
    },
    closeText: {
        flex:1,
        fontSize: 24,
        color: 'red'
    },
    bottomCard: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20
    },
    low: {
        backgroundColor: 'blue',
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    medium: {
        backgroundColor: 'green',
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    high: {
        backgroundColor: 'yellow',
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    critical: {
        backgroundColor: 'red',
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    priorityContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },  
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 24
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default TodoCard;