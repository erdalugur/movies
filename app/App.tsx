import React from 'react';
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from 'screens/HomeScreen'
import SigninScreen from 'screens/SigninScreen'
import DetailScreen from 'screens/DetailScreen';
import UserScreen from 'screens/UserScreen';

import { AuthContext, AuthAction, AuthState } from 'context'
import { cacheService } from 'utils';
import { UserProps } from 'types';

import theme from 'theme'

const Stack = createStackNavigator();
StatusBar.setBarStyle("light-content")
const App = () => {
  const [state, dispatch] = React.useReducer((state: AuthState, action: AuthAction) => {
    switch (action.type) {
      case 'SIGN_IN':
        console.log(action.token)
        return { token: action.token }
      case 'SIGN_OUT':
        return { token: null }
      default:
        return { ...state }
    }
  }, { token: null })
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        let user = await cacheService.get<UserProps>('user')
        if (user) {
          dispatch({ type: 'SIGN_IN', token: user.username });
        }
      } catch (e) {
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async (data: any) => {
      dispatch({ type: 'SIGN_IN', token: data.username });
    },
    signOut: () => dispatch({ type: 'SIGN_OUT', token: '' }),
    signUp: async (data: any) => {
      dispatch({ type: 'SIGN_IN', token: data.username });
    },
    getState: () => state
  }
  return (
    <NavigationContainer theme={theme}>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator screenOptions={{
          gestureDirection: "horizontal",
          headerShown: false
        }}>
          {state.token ? (
            <>
              <Stack.Screen
                options={{
                  header: () => null
                }}
                name="HomeScreen"
                component={HomeScreen} />
              <Stack.Screen
                options={{
                  header: () => null
                }}
                name="DetailScreen"
                component={DetailScreen}
              />
              <Stack.Screen
                options={{
                  header: () => null
                }}
                name="UserScreen"
                component={UserScreen}
              />
            </>) : (
              <Stack.Screen
                options={{
                  header: () => null
                }}
                name="Signin"
                component={SigninScreen}
              />
            )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  )
}
export default App