import { View, Text, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { usePaginatedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Colors } from '@/constants/Colors';
import ThreadComposer from '@/components/ThreadComposer';
import Thread from '@/components/Thread';
import { Link, useNavigation } from 'expo-router';
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	Easing,
	useAnimatedScrollHandler,
	runOnJS,
} from 'react-native-reanimated';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { Doc } from '@/convex/_generated/dataModel';

const Page = () => {
	const [refreshing, setRefreshing] = useState(false);
	const { results, status, loadMore } = usePaginatedQuery(
		api.messages.getThreads,
		{},
		{
			initialNumItems: 5,
		}
	);
	const navigation = useNavigation();
	const scrollOffset = useSharedValue(0);
	const tabBarHeight = useBottomTabBarHeight();
	const isFocused = useIsFocused();

	const updateTabBar = () => {
		let newMarginBottom = 0;
		if (scrollOffset.value >= 0 && scrollOffset.value <= tabBarHeight) {
			newMarginBottom = -scrollOffset.value;
		} else if (scrollOffset.value > tabBarHeight) {
			newMarginBottom = -tabBarHeight;
		}

		navigation.getParent()?.setOptions({
			tabBarStyle: {
				marginBottom: newMarginBottom,
			},
		});
	};

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			if (isFocused) {
				scrollOffset.value = event.contentOffset.y;
				runOnJS(updateTabBar)();
			}
		},
	});

	const onLoadMore = () => {
		loadMore(5);
	};

	const onRefresh = () => {
		setRefreshing(true);

		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	};

	return (
		<SafeAreaView>
			<Animated.FlatList
				onScroll={scrollHandler}
				scrollEventThrottle={16}
				data={results}
				showsVerticalScrollIndicator={false}
				refreshing={refreshing}
				onRefresh={onRefresh}
				keyExtractor={(item) => item._id}
				onEndReached={onLoadMore}
				onEndReachedThreshold={0.5}
				renderItem={({ item }) => (
					<Link href={`/feed/${item._id}`} asChild>
						<TouchableOpacity>
							<Thread thread={item as Doc<'messages'> & { creator: Doc<'users'> }} />
						</TouchableOpacity>
					</Link>
				)}
				ItemSeparatorComponent={() => <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: Colors.border }} />}
				ListHeaderComponent={() => (
					<View style={{ paddingBottom: 16 }}>
						<Image
							source={require('@/assets/images/threads-logo-black.png')}
							style={{ width: 40, height: 40, alignSelf: 'center' }}
						/>
						<ThreadComposer isPreview />
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

export default Page;

const styles = StyleSheet.create({});
