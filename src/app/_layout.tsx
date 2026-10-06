import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{flex: 1}} >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='(tabs)' />
          <Stack.Screen
            name='screens/AnimatingStylesProps'
            options={{
              headerShown: true,
              title: 'Animating styles and props',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name='screens/HomeScreen'
            options={{
              headerShown: true,
              title: 'Home',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name='screens/DetailScreen'
            options={{
              headerShown: true,
              title: 'Details',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name='screens/CarouselScreen'
            options={{
              headerShown: true,
              title: 'Carousel',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name='screens/PopAnimation'
            options={{
              headerShown: true,
              title: 'Pop Animation',
              headerBackTitle: 'Back',
            }}
          />
        </Stack>
      </GestureHandlerRootView>

    </ThemeProvider>
  );
}
