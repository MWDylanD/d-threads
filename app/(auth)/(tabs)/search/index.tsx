import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import ProfileSearchResult from '@/components/ProfileSearchResult';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';

const Page = () => {
	const [search, setSearch] = useState('');
	const userList = useQuery(api.users.searchUsers, { search });

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: 'Search',
					headerTitle: (props) => (
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<Text style={{ fontSize: 24, fontWeight: 'bold' }}>{props.children}</Text>
						</View>
					),
					headerSearchBarOptions: {
						placeholder: 'Search users',
						onChangeText: (event) => setSearch(event.nativeEvent.text),
						tintColor: 'black',
						autoFocus: true,
						hideWhenScrolling: false,
					},
				}}
			/>
			<FlatList
				data={userList}
				contentInsetAdjustmentBehavior='automatic'
				ItemSeparatorComponent={() => <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: Colors.border }} />}
				ListEmptyComponent={() => <Text style={styles.emptyText}>No users found</Text>}
				renderItem={({ item }) => <ProfileSearchResult user={item} />}
				keyExtractor={(item) => item._id}
			/>
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	emptyText: {
		fontSize: 16,
		textAlign: 'center',
		marginTop: 20,
	},
});
