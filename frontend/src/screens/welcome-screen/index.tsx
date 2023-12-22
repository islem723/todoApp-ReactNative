import Button from '@/components/shared/button';
import SafeAreaWrapper from '@/components/shared/safe-area-wrapper';
import { AuthScreenNavigationType } from '@/navigation/types';
import { AnimatedBox, Box, Text } from '@/utils/theme';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

const WelcomeScreen = () => {
	const navigation = useNavigation<AuthScreenNavigationType<'Welcome'>>();
	const navigateToSignInScreen = () => {
		navigation.navigate('SignIn');
	};
	const navigateToSignUpScreen = () => {
		navigation.navigate('SignUp');
	};

	return (
		<SafeAreaWrapper>
			<LinearGradient
				colors={[
					'#ffffff',
					'#fcecff',
					'#f8daff',
					'#fae2ff',
					'#fae2ff',
					'#ffffff',
				]}
				style={{ flex: 1 }}
			>
				<Box flex={1} justifyContent='center'>
					<Box alignItems='center' mb='3.5'>
						<Animated.View entering={ZoomIn.duration(2000)}>
							<Image
								style={{ width: 120, height: 120 }}
								source={require('../../../assets/flower.png')}
							/>
						</Animated.View>
					</Box>
					<Text textAlign='center' variant='textXl' fontWeight='700'>
						Do you want to be more productive?
					</Text>
					<Box my='3.5' mx='10'>
						<Button
							label='Start your journey'
							onPress={navigateToSignUpScreen}
						/>
					</Box>
					<Text
						textAlign='center'
						variant='textXs'
						fontWeight='700'
						color='gray5'
					>
						registered today
					</Text>
				</Box>
			</LinearGradient>
		</SafeAreaWrapper>
	);
};

export default WelcomeScreen;
