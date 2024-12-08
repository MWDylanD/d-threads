import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';

const Page = () => {
	const { url } = useLocalSearchParams<{ url: string }>();

	return (
		<GestureHandlerRootView>
			<View style={styles.container}>
				<ImageZoom
					uri={url}
					style={styles.image}
					resizeMode='contain'
					minScale={0.5}
					maxScale={5}
					isPinchEnabled
					isSingleTapEnabled
					doubleTapScale={2}
				/>
			</View>
		</GestureHandlerRootView>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
	image: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
});
