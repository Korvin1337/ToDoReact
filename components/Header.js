import { StyleSheet, Text, View } from 'react-native';

const Header = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Destroy Master 64!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        marginTop: 40,
        alignItems: 'center',
        color: '#FFF'
    },
    container: {
        alignItems: 'center'
    }
})

export default Header;