import {
	ActivityIndicator,
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Thread from '@/components/Thread';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { Colors } from '@/constants/Colors';
import { useUserProfile } from '@/hooks/useUserProfile';
import Comments from '@/components/Comments';

const Page = () => {
	const { id } = useLocalSearchParams();
	const thread = useQuery(api.messages.getThreadById, { messageId: id as Id<'messages'> });
	const { userProfile } = useUserProfile();

	return (
		<SafeAreaView style={{ flexGrow: 1, marginBottom: 0 }}>
			<ScrollView>
				{thread ? <Thread thread={thread as Doc<'messages'> & { creator: Doc<'users'> }} /> : <ActivityIndicator />}
				<Comments messageId={id as Id<'messages'>} />
			</ScrollView>
			<View style={styles.border} />
			<Link href={`/(auth)/(modal)/reply/${id}`} asChild>
				<TouchableOpacity style={styles.replyButton}>
					<Image source={{ uri: userProfile?.imageUrl as string }} style={styles.replyButtonImage} />
					<Text>Reply to {thread?.creator?.first_name}</Text>
				</TouchableOpacity>
			</Link>
		</SafeAreaView>
	);
};

export default Page;

const styles = StyleSheet.create({
	border: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: Colors.border,
		marginVertical: 2,
	},
	replyButton: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 8,
		margin: 6,
		backgroundColor: Colors.itemBackground,
		borderRadius: 100,
		gap: 10,
	},
	replyButtonImage: {
		width: 25,
		height: 25,
		borderRadius: 15,
	},
});
