import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import Profile from '@/components/Profile';
import { Id } from '@/convex/_generated/dataModel';

const Page = () => {
	const { id } = useLocalSearchParams();

	return (
		<View style={{ flex: 1 }}>
			<Profile userId={id as Id<'users'>} showBackButton />
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({});
