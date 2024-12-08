import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@/utils/cache';
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { useEffect } from 'react';
import { ConvexReactClient, ConvexProviderWithAuth } from 'convex/react';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
	unsavedChangesWarning: false,
});

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!clerkPublishableKey) {
	throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY');
}

// this line prevent the splash screen from hiding until the fonts are loaded
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
	const router = useRouter();
	const [fontsLoaded] = useFonts({
		DMSans_400Regular,
		DMSans_500Medium,
		DMSans_700Bold,
	});
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	useEffect(() => {
		const inAuthGroup = segments[0] === '(auth)';
		if (isSignedIn && !inAuthGroup) {
			router.replace('/(auth)/(tabs)/feed');
		} else if (!isSignedIn && inAuthGroup) {
			router.replace('/(public)');
		}
	}, [isSignedIn]);

	return <Slot />;
};

const RootLayoutNav = () => {
	return (
		<ClerkProvider publishableKey={clerkPublishableKey!} tokenCache={tokenCache}>
			<ClerkLoaded>
				<ConvexProviderWithAuth client={convex} useAuth={useAuth}>
					<InitialLayout />
				</ConvexProviderWithAuth>
			</ClerkLoaded>
		</ClerkProvider>
	);
};

export default RootLayoutNav;
