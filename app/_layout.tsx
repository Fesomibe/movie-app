import { Stack, useRouter } from "expo-router";
import './globals.css';
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { StackScreen } from "react-native-screens";

function RouteGuard({ children }: { children: React.ReactNode}) {
  const router = useRouter();
  const isAuth = false;

  useEffect(() => {
    if (!isAuth) {
      router.replace('/auth');
    }
  });

  return <>{children}</>
}

export default function RootLayout() {
  return (
    <RouteGuard>
    <>
    <SafeAreaProvider>
    <StatusBar hidden={true} />
  <Stack>
    <Stack.Screen 
      name="(tabs)"
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="movies/[id]"
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name='auth'
      options={{ headerShown: false }}
    />
  </Stack> 
  </SafeAreaProvider>
  </>
  </RouteGuard>
  );
}
