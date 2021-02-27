import React from 'react'

import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import theme from 'theme';
import { UserProps } from 'types';
import { cacheService } from 'utils';

export default function Header() {
    const navigation = useNavigation()
    const [userTitle, setUserTitle] = React.useState<string>('')
    const [userImage, setUserImage] = React.useState<string>('https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80')

    React.useEffect(() => {
        loadUserAsync()
    }, [])
    async function loadUserAsync() {
        let user = await cacheService.get<UserProps>('user')
        if (user) {
            setUserTitle(user.firstname)
            setUserImage(user.image)
        } else {
            /** ignored */
        }
    }
    return (
        <View style={[styles.header]}>
            <Text style={[styles.username]}>Hi, {userTitle}!</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('UserScreen')}
                style={[styles.usericon]}>
                <Image source={{ uri: userImage }} style={{ resizeMode: 'cover', height: 35, width: 35 }} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20, marginTop: 20, flex: 2
    },
    username: { fontSize: 22, color: theme.colors.text, fontWeight: 'bold' },
    header: { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' },
    usericon: { borderRadius: 50, overflow: 'hidden' }
});