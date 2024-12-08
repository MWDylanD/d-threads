import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Doc } from '@/convex/_generated/dataModel';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';

type ProfileSearchResultProps = {
	user: Doc<'users'>;
};

const ProfileSearchResult = ({ user }: ProfileSearchResultProps) => {
	return (
		<View style={styles.container}>
			<Link style={{ flex: 1, flexDirection: 'row', gap: 10 }} href={`/search//profile/${user._id}`} asChild>
				<TouchableOpacity>
					<Image source={{ uri: user.imageUrl }} style={{ width: 50, height: 50, borderRadius: 25 }} />
					<View style={styles.infoContainer}>
						<Text style={styles.name}>{user.username}</Text>
						<Text style={styles.username}>@{user.username}</Text>
						<Text style={styles.followersCount}>{user.followersCount} followers</Text>
					</View>
				</TouchableOpacity>
			</Link>

			<TouchableOpacity style={styles.followButton} onPress={() => {}}>
				<Text style={styles.followButtonText}>Follow</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ProfileSearchResult;

const styles = StyleSheet.create({
	container: {
		padding: 16,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	infoContainer: {
		flex: 1,
	},
	name: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	username: {
		fontSize: 14,
		color: 'gray',
	},
	followersCount: {
		fontSize: 14,
	},
	followButton: {
		padding: 6,
		paddingHorizontal: 24,
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 5,
	},
	followButtonText: {
		fontWeight: 'bold',
	},
});
