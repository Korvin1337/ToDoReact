import { View, StyleSheet, Text, TextInput, NativeEventEmitter, Pressable, Dimensions, ImageBackground} from 'react-native';
import {useEffect, useState} from 'react';
import * as React from 'react';
import { RadioButton } from 'react-native-paper';
import { deleteById, updateById } from '../database/DbUtils';

const SelectedTodoScreen = ({ route, navigation }) => {

    const { todo } = route.params

    const emitter = new NativeEventEmitter()

    const [checked, setIsCompleted] = React.useState(`${todo.isCompleted ? 'Yes' : 'No'}`)

    const [textInputValue, setTextInputValue] = useState(`${todo.title}`);

    const handleTextChange = (text) => {
        setTextInputValue(text);
    }

    const handleUpdatePress = (id, title, isCompleted) => {
        if (isCompleted == "Yes") {
            isCompleted = 1
        } else {
            isCompleted = 0
        }
        updateById(id, title, isCompleted)
            .then(res => emitter.emit('update', todo))
        navigation.goBack();
    }

    const handleDeletePress = (id) => {
        deleteById(id)
            .then(res => emitter.emit('delete', todo))
        navigation.goBack();
    }

    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            resizeMode='cover'
            style={styles.imageBackground}
        >
        <View style={styles.container}>
            <Text style={[styles.typography, styles.title]}>Id: </Text>
            <Text style={[styles.typography, styles.marginStyle]}>{todo.id}</Text>

            <Text style={[styles.typography, styles.title]}>Title:</Text>
            <TextInput
                style={styles.typography}
                onChangeText={handleTextChange}
                value={textInputValue}
            />

            <Text style={[styles.typography, styles.completedText, styles.title]}>Completed:</Text>
            <Text style={styles.radioText}>Yes</Text>
                <RadioButton
                        value="Yes"
                        status={ checked === 'Yes' ? 'checked' : 'unchecked' }
                        onPress={() => setIsCompleted('Yes')}
                />
                <Text style={styles.radioText}>No</Text>
                <RadioButton
                        value="No"
                        status={ checked === 'No' ? 'checked' : 'unchecked' }
                        onPress={() => setIsCompleted('No')}
                />
            
            <Pressable
                onPress={() => handleUpdatePress(todo.id, textInputValue, checked)}
                style={[styles.updateButton, styles.elevation]}
            >
                <Text style={styles.updateText}>Update</Text>
            </Pressable>
            <Pressable
                onPress={() => handleDeletePress(todo.id)}
                style={[styles.deleteButton, styles.elevation]}
            >
                <Text style={styles.white}>X</Text>
            </Pressable>

        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        top: -60,
        backgroundColor: 'rgba(0, 201, 141, 0.75)',
    },

    typography: {
        color: 'hsl(0, 0%, 100%)',
        fontSize: 16,
    },

    title: {
        fontWeight: 'bold',
    },

    marginStyle: {
        marginBottom: 10,
    },

    updateButton: {
        backgroundColor: 'rgb(0, 51, 255)',
        marginHorizontal: 3,
        borderRadius: 20,
        top: 20,
        width: 65,
        height: 45,
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        margin: 5,
    },

    updateText: {
        fontSize: 16,
        color: 'hsl(0, 0%, 100%)'
    },

    deleteButton: {
        backgroundColor: 'rgb(255, 0, 0)',
        marginHorizontal: 3,
        borderRadius: 20,
        top: 20,
        width: 65,
        height: 45,
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        margin: 5,
    },

    elevation: {
        elevation: 8,
        shadowColor: 'rgb(255, 255, 255)',
    },

    white: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold'
    },

    completedText: {
        top: 10,
    },

    radioText: {
        color: 'white',
        top: 26,
        left: -29,
    },
    
    imageBackground: {
        backgroundColor: 'rgb(0, 0, 0)',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
})

export default SelectedTodoScreen;