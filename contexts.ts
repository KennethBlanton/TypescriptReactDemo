import React from 'react';
import { TodoCardInterface } from './models/todo.model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TICKETS_KEY} from './constants';

type ticketContext = {
    items: TodoCardInterface[],
    read: () => Promise<TodoCardInterface[] | false>,
    setTodoList?: (items: TodoCardInterface[]) => void,
    save: (value: TodoCardInterface[]) => Promise<boolean>,
}

const readData = async () => {
    // using string datatype to accomadate any future functions (JSON)
    let tickets : TodoCardInterface[] | false;
    try {
      const storageItem = await AsyncStorage.getItem(TICKETS_KEY)
  
      if (storageItem !== null) {
        tickets = JSON.parse(storageItem);
      } else {
        tickets = false;
      }
      return tickets

    } catch (e) {
        return false;
    }
}
const saveData = async (value : TodoCardInterface[]) => {
    if(!value) return false;
    try {
      await AsyncStorage.setItem(TICKETS_KEY, JSON.stringify(value))
      return true;
    } catch (e) {
      return false;
    }
}

export const AppCtx = React.createContext<ticketContext>({
    items: [],
    read: readData,
    save: saveData,
});