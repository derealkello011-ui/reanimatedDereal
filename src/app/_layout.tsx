import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
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
      </Stack>
    </ThemeProvider>
  );
}
