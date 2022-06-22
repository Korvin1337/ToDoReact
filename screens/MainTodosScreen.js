import {View, ImageBackground, StatusBar, StyleSheet, Dimensions, NativeEventEmitter} from 'react-native';
import {useState, useEffect} from 'react';
import Header from '../components/Header';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import { findAll } from '../database/DbUtils';

const MainTodosScreen = ({ navigation }) => {

    const [todos, setTodos] = useState([]);

    const emitter = new NativeEventEmitter();

    const deleteListener = emitter.addListener('delete', (todoName) => {
      findAll()
        .then(res => setTodos(res))
        .catch(err => console.log(err))
    })

    useEffect(() => {
      findAll()
        .then(res => setTodos(res))
      return () => deleteListener.remove();
    }, [])

    return (
        <View style={styles.container}>
        <ImageBackground
          source={require('../assets/background.jpg')}
          resizeMode='cover'
          style={styles.imageBackground}
        >
        <Header 
        />
        <TodoInput
          setTodos={setTodos}
        />
        <TodoList 
          todos={todos}
          navigation={navigation}
        />
        <StatusBar style="auto" 
        />
        </ImageBackground>
      </View>

    )
}

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        imageBackground: {
          backgroundColor: 'rgb(0, 0, 0)',
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }
    }
);

export default MainTodosScreen;