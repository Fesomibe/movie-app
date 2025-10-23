import { Stack, useRouter, useSegments } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/services/auth-context";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";

    if (!user && !inAuthGroup && !isLoadingUser) {
      router.replace("/auth");
    } else if (user && inAuthGroup && !isLoadingUser) {
      router.replace("/");
    }
  }, [user, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
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
              name="auth"
              options={{ headerShown: false }}
            />
          </Stack>
        </SafeAreaProvider>
      </RouteGuard>
    </AuthProvider>
  );
}
