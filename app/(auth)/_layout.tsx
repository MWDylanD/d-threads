import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
const Layout = () => {
	const router = useRouter();

	return (
		<Stack
			screenOptions={{
				contentStyle: {
					backgroundColor: 'white',
				},
				headerShadowVisible: false,
			}}>
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			<Stack.Screen
				name='(modal)/create'
				options={{
					title: 'New Thread',
					presentation: 'modal',
					headerRight: () => (
						<TouchableOpacity>
							<Ionicons name='ellipsis-horizontal-circle' size={24} />
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name='(modal)/edit-profile'
				options={{
					title: 'Edit Profile',
					presentation: 'modal',
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.dismiss()}>
							<Text>Cancel</Text>
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name='(modal)/reply/[id]'
				options={{
					title: 'Reply',
					presentation: 'modal',
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.dismiss()}>
							<Text>Cancel</Text>
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name='(modal)/image/[url]'
				options={{
					title: '',
					presentation: 'fullScreenModal',
					headerStyle: {
						backgroundColor: 'black',
					},
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.dismiss()}>
							<Ionicons name='close' size={24} color='white' />
						</TouchableOpacity>
					),
					headerRight: () => (
						<TouchableOpacity>
							<Ionicons name='ellipsis-horizontal-circle' size={24} color='white' />
						</TouchableOpacity>
					),
				}}
			/>
		</Stack>
	);
};

export default Layout;
