import { StyleSheet, TextInput, View, Button, Pressable, Text } from "react-native";
import {useEffect, useState} from 'react';
import Todo from "../models/Todo";
import { findAll, insert } from "../database/DbUtils";

const TodoInput = ({ setTodos }) => {

    const [textInputValue, setTextInputValue] = useState('');

    const handleTextChange = (text) => {
        setTextInputValue(text);
    }

    const handleAdd = () => {
        const todo = new Todo(0, textInputValue, false)
        insert(todo)
            .then(res => {
                console.log('insert res', res)
                return findAll()
            })
            .then(res => setTodos(res))
            .then(handleTextChange(''))
            .catch(err => console.log(err));
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textinput}
                onChangeText={handleTextChange}
                value={textInputValue}
            />

            <Pressable
                onPress={handleAdd}
                style={({ pressed }) => [styles.addButton, { opacity: pressed ? 0.5 : 1.0 }]}>
                <Text style={styles.buttonText}>Add</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 20,
    },

    addButton: {
        backgroundColor: 'rgba(0, 201, 141, 0.85)',
        marginHorizontal: 10,
        padding: 12,
        borderRadius: 15,
        right: 5,
    },

    textinput: {
        backgroundColor: '#FFF',
        width: '70%',
        marginHorizontal: 20,
        paddingHorizontal: 10,
        borderRadius: 4,
    },

    buttonText: {
        color: 'hsl(0, 0%, 100%)',
        fontSize: 16,
    }

})

export default TodoInput;