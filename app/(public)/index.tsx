import { Colors } from '@/constants/Colors';
import { useOAuth } from '@clerk/clerk-expo';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
	const { startOAuthFlow } = useOAuth({ strategy: 'oauth_facebook' });
	const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });

	const handleFacebookLogin = async () => {
		try {
			const { createdSessionId, setActive } = await startOAuthFlow();

			if (createdSessionId) {
				setActive!({ session: createdSessionId });
			}
		} catch (err) {
			console.error('OAuth error', err);
		}
	};

	const handleGoogleLogin = async () => {
		try {
			const { createdSessionId, setActive } = await googleAuth();

			if (createdSessionId) {
				setActive!({ session: createdSessionId });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<Image source={require('@/assets/images/login.png')} style={styles.loginImage} />
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.title}>How would you like to use D-Threads ?</Text>
				<View style={styles.btnContainer}>
					<TouchableOpacity style={styles.loginBtn} onPress={handleFacebookLogin}>
						<View style={styles.loginBtnContent}>
							<View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
								<Image source={require('@/assets/images/instagram_icon.webp')} style={styles.loginBtnIcon} />
								<Text style={styles.loginBtnText}>Continue with Instagram</Text>
							</View>
							<Ionicons name='chevron-forward' size={24} color={Colors.border} />
						</View>
						<Text style={styles.loginBtnSubtitle}>
							Log in or create Threads profile with your Instagram account. With a profile, you can post, interact and get
							personalised recommendations.
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.loginBtn} onPress={handleGoogleLogin}>
						<View style={styles.loginBtnContent}>
							<Text style={styles.loginBtnText}>Continue with Google</Text>
							<Ionicons name='chevron-forward' size={24} color={Colors.border} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.loginBtn} onPress={() => {}}>
						<View style={styles.loginBtnContent}>
							<Text style={styles.loginBtnText}>Use without profile</Text>
							<Ionicons name='chevron-forward' size={24} color={Colors.border} />
						</View>
						<Text style={styles.loginBtnSubtitle}>
							You can browse Threads without profile, but won't be able to post, interact or got personlised recommendations.
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {}}>
						<Text style={styles.switchAccountBtnText}>Switch account</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 20,
		alignItems: 'center',
		backgroundColor: Colors.background,
	},
	loginImage: {
		width: '100%',
		height: 350,
		resizeMode: 'cover',
	},
	title: {
		fontFamily: 'DMSans_700Bold',
		fontSize: 17,
	},
	loginBtn: {
		backgroundColor: '#FFF',
		padding: 20,
		borderRadius: 8,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: Colors.border,
	},
	btnContainer: {
		marginTop: 20,
		gap: 20,
	},
	loginBtnContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
	},
	loginBtnIcon: {
		width: 50,
		height: 50,
	},
	loginBtnText: {
		fontFamily: 'DMSans_500Medium',
		fontSize: 15,
	},
	loginBtnSubtitle: {
		fontFamily: 'DMSans_40Regular',
		fontSize: 12,
		marginTop: 10,
		color: Colors.border,
	},
	switchAccountBtnText: {
		fontSize: 14,
		color: Colors.border,
		alignSelf: 'center',
	},
});

export default LoginScreen;
