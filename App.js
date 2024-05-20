import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SigninScreen from './src/SigninScreen';
import SignupScreen from './src/SignupScreen';
import HomeScreen from './src/HomeScreen';
import { Header, createStackNavigator } from '@react-navigation/stack';
import AddServiceScreen from './src/AddServiceScreens';
import UpdatePasswordScreen from './src/ChangePass';



const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Signin" component={SigninScreen} 
            options={{
              headerShown: false
            }}/>
          <Stack.Screen name="Home" component={HomeScreen}
            options={{
              headerShown: false
            }}/>
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="AddServiece" component={AddServiceScreen} />
          
          <Stack.Screen name="UpdatePass" component={UpdatePasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  );
};

export default App;
