import AsyncStorage from '@react-native-async-storage/async-storage'

export const cacheService = {
    get: async<T>(key: string): Promise<null | T> => {
        let result = await AsyncStorage.getItem(key)
        return result != null ? JSON.parse(result) as T : null
    },
    set: async (key: string, data: any) => {
        return AsyncStorage.setItem(key, JSON.stringify(data))
    }
}