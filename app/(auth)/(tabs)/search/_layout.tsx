import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerShown: true,
					headerShadowVisible: false,
					contentStyle: {
						backgroundColor: 'white',
					},
				}}
			/>
			<Stack.Screen name='profile/[id]' options={{ headerShown: false }} />
		</Stack>
	);
};

export default Layout;
