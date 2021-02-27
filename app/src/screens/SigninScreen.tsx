import React from 'react'
import { Text, SafeAreaView, StyleSheet, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useAuthentication } from 'context'
import theme from 'theme'
import { http } from 'api'
import { cacheService } from 'utils'
import { UserProps } from 'types'

interface LoginResponse {
    data: UserProps
}
export default function () {
    const auth = useAuthentication()
    const [username, setUserName] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({})
    async function login() {
        try {
            let result: LoginResponse = await http.post({
                path: '/auth/login',
                parameters: { username, password }
            })
            await cacheService.set('user', result.data)
            auth.signIn({ ...result.data })

        } catch (error) {
            /** ignored */
        }
    }
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.content]}>
                <TextInput
                    value={username}
                    onChangeText={username => setUserName(username)}
                    placeholder="Username"
                    placeholderTextColor={theme.colors.text}
                    style={[styles.textInput]} />

                <TextInput
                    value={password}
                    onChangeText={password => setPassword(password)}
                    keyboardType="visible-password"
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor={theme.colors.text}
                    style={[styles.textInput]} />
                <Text style={[styles.buttonText]}>{``}</Text>

                <TouchableOpacity style={[styles.button]} onPress={login}>
                    <Text style={[styles.buttonText]}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        padding: 20
    },
    textInput: {
        color: theme.colors.text,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 20,
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    button: {
        width: '100%',
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: 'bold'
    }
})