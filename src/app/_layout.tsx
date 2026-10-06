import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{flex: 1}} >
        <Stack screenOptions={{ headerShown: true, headerBackTitle: 'Back' }}>
          <Stack.Screen name='(tabs)' options={{headerShown: false}} />
          <Stack.Screen
            name='screens/AnimatingStylesProps'
            options={{
              title: 'Animating styles and props',
            }}
          />
          <Stack.Screen
            name='screens/HomeScreen'
            options={{
              title: 'Home',
            }}
          />
          <Stack.Screen
            name='screens/DetailScreen'
            options={{
              title: 'Details',
            }}
          />
          <Stack.Screen
            name='screens/CarouselScreen'
            options={{
              title: 'Carousel',
            }}
          />
          <Stack.Screen
            name='screens/PopAnimation'
            options={{
              title: 'Pop Animation',
            }}
          />
          <Stack.Screen
            name='screens/CustomAnimationScreen'
            options={{
              title: 'Custom Animation',
            }}
          />
          <Stack.Screen
            name='screens/HandlingGestureScreen'
            options={{
              title: 'Handling Gestures',
            }}
          />
        </Stack>
      </GestureHandlerRootView>

    </ThemeProvider>
  );
}
