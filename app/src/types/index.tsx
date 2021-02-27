import { NavigationProp, RouteProp } from '@react-navigation/native';
export interface NavigationProps {
    navigation: NavigationProp<any>
    route?: RouteProp<any, any>
}

export interface UserProps {
    firstname: string,
    lastname: string,
    localtion: string,
    job: string,
    username: string
    image: string
}

export interface Movie {
    name: string,
    rating: number,
    imageURL: string
    overview: string
    id: number,
    director: string,
    cast: string[],
    categories: string[]
}

export interface Category {
    name: string
    value: string
    emoji: string
}