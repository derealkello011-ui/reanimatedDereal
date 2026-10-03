import { useTheme } from 'expo-router';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const MIN_WIDTH = 100;
const SCREEN_PADDING = 20;

export default function Index() {
  const { colors } = useTheme();
  const { width: screenWidth } = useWindowDimensions();
  const width = useSharedValue( MIN_WIDTH );

  // Never wider than the space the screen padding leaves
  const maxWidth = screenWidth - SCREEN_PADDING * 2;

  const boxStyle = useAnimatedStyle( () => ( {
    width: width.get(),
  } ) );

  const handlePress = () => {
    width.set( withSpring( MIN_WIDTH + Math.random() * ( maxWidth - MIN_WIDTH ) ) );
  };

  return (
    <SafeAreaView
      style={[ styles.safeArea, { backgroundColor: colors.background } ]}
      edges={[ 'top', 'left', 'right' ]}
    >
      <View style={styles.content}>
        <Text style={[ styles.header, { color: colors.text } ]}>
          Animating styles and props
        </Text>

        <Animated.View style={[ styles.box, boxStyle ]} />

        <Pressable
          onPress={handlePress}
          style={[ styles.button, { backgroundColor: colors.primary } ]}
        >
          <Text style={styles.buttonText}>Change Width</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create( {
  safeArea: {
    flex: 1,
    padding: SCREEN_PADDING,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  box: {
    height: 100,
    marginVertical: 20,
    backgroundColor: 'violet',
    borderRadius: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
} );
