import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getTableInfo, initDB } from './database/DbUtils.js';
import { useEffect } from 'react';
import MainTodosScreen from './screens/MainTodosScreen.js';
import SelectedTodoScreen from './screens/SelectedTodoScreen.js';

export default function App() {

  useEffect(() => {
    initDB()
    .then(res => { 
      console.log('res from initDB', res)
      return getTableInfo()
    })
    .then(res => console.log('pragma table_info', res))
    .catch(err => console.log('err from initDB', err));
  }, []);

  const NativeStack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <NativeStack.Navigator>
        <NativeStack.Screen
          options={{ headerShown: false }} 
          name='MainTodosScreen'
          component={MainTodosScreen}
        />
        <NativeStack.Screen 
          name='SelectedTodoScreen'
          component={SelectedTodoScreen}
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  )
}