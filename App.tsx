import 'react-native-gesture-handler';
import React , {useState, useEffect,createContext, useReducer} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {TodoCardInterface} from './models/todo.model'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Start from './screens/Start';
import NewTicket from './screens/NewTicket';
import InProgress from './screens/InProgress';
import Done from './screens/Done';
import { AppCtx } from './contexts';


export type RootStackParamList = {
  Home?: TodoCardInterface[];
  Start?: TodoCardInterface[];
  NewTicket?: TodoCardInterface[];
  InProgress?: TodoCardInterface[];
  Done?: TodoCardInterface[];
};


const App : React.FC = () => {

  const [todoList, setTodoList] = useState<TodoCardInterface[]>([]);
  const appContext = React.useContext(AppCtx);

  const updateTodos = (items: TodoCardInterface[]) => {
    setTodoList([...items]);
  }

  useEffect(() => {
    if(!todoList.length) {
      appContext.read()
      .then((arr) => {
        if(arr) setTodoList(arr)
      })
    }
  }, [])

  // STORAGE END


  const Stack = createStackNavigator<RootStackParamList>();
  
  
  // issue with stack.navigator jsx component. cause: issue with dependancy version possibly issue with windows. 
  return (
    <AppCtx.Provider value={{items: todoList, read:appContext.read, setTodoList: updateTodos, save:appContext.save }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="NewTicket" component={NewTicket} />
          <Stack.Screen name="InProgress" component={InProgress} />
          <Stack.Screen name="Done" component={Done} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppCtx.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
