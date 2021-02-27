import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, TextInput, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import theme from 'theme';
import { NavigationProps, Movie, Category } from 'types'
import Header from 'components/Header'

interface Props extends NavigationProps { }

export default function (props: Props) {
    const [movies, setMovies] = React.useState<Movie[]>([])
    const [categories, setCategories] = React.useState<Category[]>([])
    const [movieTerm, setMovieTerm] = React.useState<string>('')
    const [category, setCategory] = React.useState<string>('')

    React.useEffect(() => {
        fetch('http://localhost:5000/api/movies').then(x => x.json()).then(response => setMovies(response.data))
    }, [])
    React.useEffect(() => {
        fetch('http://localhost:5000/api/categories').then(x => x.json()).then(response => setCategories(response.data))
    }, [])

    const renderCategories = () => (
        <View style={{ marginTop: 20 }}>
            <Text style={[styles.categories]}>Categories</Text>
            <ScrollView horizontal>
                {categories.map((x, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => setCategory(x.value)}
                        style={[styles.category, { borderColor: category === x.value ? '#faa336' : theme.colors.border }]}>
                        <Text style={{ marginBottom: 5 }}>{x.emoji}</Text>
                        <Text style={{ color: theme.colors.text }}>{x.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
    const renderItem = (item: Movie) => (
        <TouchableOpacity style={[styles.movie]} onPress={() => props.navigation.navigate('DetailScreen', { item })}>
            <Image source={{ uri: item.imageURL }} style={[styles.movieImage]} />
            <View style={[styles.movieTitleContainer]}>
                <Text style={{ color: theme.colors.text }}>{[item.name.substring(0, 20), item.name.length > 20 ? '...' : ''].join('')}</Text>
            </View>
        </TouchableOpacity>
    )

    let filteredMovies = category !== '' ? movies.filter(x => x.categories.indexOf(category) > -1) : movies
    filteredMovies = filteredMovies.filter(x => x.name.indexOf(movieTerm) > -1)
    const renderMovies = () => (
        <FlatList
            data={filteredMovies}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderItem(item)}>
        </FlatList>
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.container]}>
                <Header />
                <View style={[styles.searchboxContainer]}>
                    <TextInput
                        value={movieTerm}
                        onChangeText={movieTerm => setMovieTerm(movieTerm)}
                        placeholder="Search your movie"
                        placeholderTextColor={theme.colors.text}
                        style={[styles.searchbox]}
                    />
                </View>
                {renderCategories()}
            </View>
            <View style={{ paddingHorizontal: 20, flex: 5, marginTop: 30 }}>
                {renderMovies()}
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20, marginTop: 20, flex: 2
    },
    header: { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' },
    searchboxContainer: {
        borderColor: theme.colors.border,
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 25
    },
    searchbox: { height: 50, paddingLeft: 20, color: theme.colors.text },
    categories: { color: theme.colors.text, fontSize: 18, marginBottom: 20 },
    category: {
        backgroundColor: theme.colors.card,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginRight: 10,
        padding: 10,
        borderWidth: 1
    },
    movie: {
        backgroundColor: theme.colors.card,
        borderRadius: 15,
        marginRight: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    movieImage: { height: 240, width: 180, resizeMode: 'cover' },
    movieTitleContainer: { marginVertical: 10, justifyContent: 'center', alignItems: 'center' }
});
