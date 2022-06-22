import { Text, FlatList, Pressable, StyleSheet } from 'react-native';

const TodoList = ({ todos, navigation }) => {

    const handlePress = (todo) => {
        navigation.navigate('SelectedTodoScreen', {todo: todo})
    }
        
    const _renderItem = ({ item: todo }) => {
        return (
             <Pressable
                onPress={() => handlePress(todo)}
                style={styles.todo}
            >
            <Text style={styles.typography}>{todo.title}</Text>
            </Pressable>
        )
    
    }

    return (
        <FlatList 
            data={todos}
            renderItem={ _renderItem}
            keyExtractor={(todo, index) => index}
        />
    )
}

const styles = StyleSheet.create({

    todo: {
        margin: 10,
        marginLeft: 20,
        marginRight: 15,
        backgroundColor: 'rgba(0, 201, 141, 0.75)',
        padding: 10,
        borderRadius: 6,
        color: 'hsl(0, 0%, 100%)'
    },

    typography: {
        color: 'hsl(0, 0%, 100%)',
        fontSize: 16,
    }

})

export default TodoList;