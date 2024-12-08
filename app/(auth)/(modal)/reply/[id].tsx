import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Doc, Id } from '@/convex/_generated/dataModel';
import Thread from '@/components/Thread';
import ThreadComposer from '../create';
import Comments from '@/components/Comments';

const Page = () => {
	const { id } = useLocalSearchParams();
	const thread = useQuery(api.messages.getThreadById, { messageId: id as Id<'messages'> });

	return (
		<View>
			{thread ? (
				<Thread
					thread={
						thread as Doc<'messages'> & {
							creator: Doc<'users'>;
						}
					}
				/>
			) : (
				<ActivityIndicator />
			)}
			<Comments messageId={id as Id<'messages'>} />
			<ThreadComposer isReply threadId={id as Id<'messages'>} />
		</View>
	);
};

export default Page;
