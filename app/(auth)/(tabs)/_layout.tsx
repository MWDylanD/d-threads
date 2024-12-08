import { Colors } from '@/constants/Colors';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';

const CreateTabIcon = ({ color, size, focused }: { color: string; size: number; focused: boolean }) => {
	return (
		<View style={styles.createIconContainer}>
			<Ionicons name={`${focused ? 'add' : 'add-outline'}`} color={color} size={size} />
		</View>
	);
};

const Layout = () => {
	const { signOut } = useAuth();
	const router = useRouter();

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarActiveTintColor: '#000',
			}}>
			<Tabs.Screen
				name='feed'
				options={{
					headerShown: false,
					title: 'Home',
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons name={`${focused ? 'home' : 'home-outline'}`} color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name='search'
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons name={`${focused ? 'search' : 'search-outline'}`} color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name='create'
				options={{
					title: 'Create',
					tabBarIcon: ({ color, size, focused }) => <CreateTabIcon color={color} size={size} focused={focused} />,
				}}
				listeners={{
					tabPress: (e) => {
						e.preventDefault();
						Haptics.selectionAsync();
						router.push('/(auth)/(modal)/create');
					},
				}}
			/>
			<Tabs.Screen
				name='favorites'
				options={{
					title: 'favorites',
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons name={`${focused ? 'heart' : 'heart-outline'}`} color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					headerShown: false,
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons name={`${focused ? 'person' : 'person-outline'}`} color={color} size={size} />
					),
				}}
			/>
		</Tabs>
	);
};

const styles = StyleSheet.create({
	createIconContainer: {
		backgroundColor: Colors.itemBackground,
		padding: 2,
		borderRadius: 8,
	},
});

export default Layout;
