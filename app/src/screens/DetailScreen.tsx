import React from 'react'
import { View, Text, SafeAreaView, Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

import theme from 'theme'

const height = Dimensions.get('screen').height / 2

export default function ({ navigation, route }: any) {
    const item = route.params.item
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.header]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name="long-arrow-left" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={{ color: theme.colors.text, fontSize: 18 }}>Detail Movie</Text>
                <Text style={{ minWidth: 20 }}></Text>
            </View>
            <View style={[styles.imageContainer]}>
                <Image source={{ uri: item.imageURL }} style={[styles.image]} />
            </View>
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <ScrollView>
                    <Text style={[styles.title]}>{item.name}</Text>
                    <View style={[styles.categoryContainer]}>
                        {item.categories.map((c: string) => (
                            <View style={[styles.category]} key={c}>
                                <Text style={{ color: theme.colors.text }}>{c}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={[styles.infoItem]}>
                        <Text style={{ color: theme.colors.text, fontSize: 14 }}>{['Director', item.director].join(': ')}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: theme.colors.text, fontSize: 14, marginRight: 5 }}>{[' | ', item.rating].join('')}</Text>
                            <FontAwesome name="star" size={14} color={'#faa336'} />
                        </View>
                    </View>
                    <View style={[styles.infoItem]}>
                        <Text style={{ color: theme.colors.text, fontSize: 14 }}>{['Stars', item.cast.join(' | ')].join(': ')}</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: theme.colors.text, marginBottom: 10, fontSize: 14 }}>{'Description'}</Text>
                        <Text style={{ color: theme.colors.text }}>{item.overview}</Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    header: { padding: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' },
    imageContainer: {
        height: height,
        padding: 20,
        marginBottom: 20
    },
    image: {
        height: height, width: '100%', resizeMode: 'cover', borderRadius: 20,
    },
    title: { color: theme.colors.text, fontSize: 24, marginTop: 30, fontWeight: 'bold' },
    categoryContainer: { flexDirection: 'row', marginTop: 10 },
    category: { padding: 10, borderRadius: 10, backgroundColor: theme.colors.card, marginRight: 5 },
    infoItem: { flexDirection: 'row', marginTop: 10 }
})