import { View, StyleSheet, Text, NativeEventEmitter, Pressable, Dimensions, ImageBackground } from 'react-native';
import { deleteById } from '../database/DbUtils';

const SelectedTodoScreen = ({ route, navigation }) => {

    const { todo } = route.params;

    const emitter = new NativeEventEmitter();

    const handlePress = (id) => {
        deleteById(id)
            .then(res => emitter.emit('delete', todo));
        navigation.goBack();
    }

    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            resizeMode='cover'
            style={styles.imageBackground}
        >
        <View style={styles.container}>
            <Text style={styles.typography}>Title: {todo.title}</Text>
            <Text style={styles.typography}>Id: {todo.id}</Text>
            <Text style={styles.typography}>Completed: {todo.isCompleted ? 'Yes' : 'No'}</Text>
            <Pressable
                onPress={() => handlePress(todo.id)}
                style={[styles.button, styles.elevation]}
            >
                <Text style={styles.black}>X</Text>
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

    button: {
        backgroundColor: 'rgb(255, 0, 0)',
        marginHorizontal: 3,
        borderRadius: 20,
        top: 20,
        width: 65,
        height: 45,
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
    },

    elevation: {
        elevation: 8,
        shadowColor: 'rgb(255, 255, 255)',
    },

    black: {
        color: 'black',
        fontSize: 16,
    },
    
    imageBackground: {
        backgroundColor: 'rgb(0, 0, 0)',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
})

export default SelectedTodoScreen;