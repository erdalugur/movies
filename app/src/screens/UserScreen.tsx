import React from 'react'
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

import theme from 'theme'
import { useAuthentication } from 'context';
import { cacheService } from 'utils';
import { UserProps } from 'types';

/** default */
const USER_IMAGE_URL = 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80'

export default function ({ navigation, route }: any) {
    const [firstName, setFirstName] = React.useState<string>('')
    const [lastName, setLastName] = React.useState<string>('')
    const [location, setLocation] = React.useState<string>('')
    const [image, setImage] = React.useState<string>(USER_IMAGE_URL)
    const [job, setJob] = React.useState<string>('')

    const auth = useAuthentication()

    React.useEffect(() => {
        loadUserAsync()
    }, [])

    async function loadUserAsync() {
        // load by cache or api
        let user = await cacheService.get<UserProps>('user')
        if (user) {
            setFirstName(user.firstname)
            setLastName(user.lastname)
            setLocation(user.localtion)
            setJob(user.job)
            setImage(user.image)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.header]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="long-arrow-left" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={{ color: theme.colors.text, fontSize: 18 }}>My Profile</Text>
                <Text style={{ minWidth: 20 }}></Text>
            </View>
            <View style={{ padding: 20 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: image }} style={[styles.image]} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <FormItem label={['First Name:', firstName].join(' ')} />
                    <FormItem label={['Last Name:', lastName].join(' ')} />
                    <FormItem label={['Location:', location].join(' ')} />
                    <FormItem label={['Job Title:', job].join(' ')} />
                    <TouchableOpacity
                        style={[styles.button]}
                        onPress={() => null}>
                        <Text style={{ color: theme.colors.text }}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button]}
                        onPress={() => auth.signOut()}>
                        <Text style={{ color: theme.colors.text }}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    )
}

interface FormItemProps {
    label: string
}
function FormItem(props: FormItemProps) {
    return (
        <View style={[styles.formItem]}>
            <Text style={{ color: theme.colors.text }}>{props.label}</Text>
            <FontAwesome name="pencil" size={24} color={theme.colors.text} />
        </View>
    )
}
const styles = StyleSheet.create({
    header: { padding: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' },
    image: { height: 160, width: 160, resizeMode: 'cover', borderRadius: 50 },
    formItem: { backgroundColor: theme.colors.card, paddingHorizontal: 20, borderRadius: 25, marginBottom: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: 50 },
    button: { borderColor: theme.colors.border, borderWidth: 1, marginBottom: 10, padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 25, height: 50 }
})