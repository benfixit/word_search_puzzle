import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import PuzzleProvider from '@/store/PuzzleProvider';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PuzzleProvider>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="puzzle" options={{ headerTitleStyle: {} }} />
          </Stack>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </PuzzleProvider>
    </ThemeProvider>
  );
}
