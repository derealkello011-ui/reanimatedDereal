import { useTheme } from 'expo-router';
import { useRef } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Circle, Svg } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent( Circle );

const BOX_SIZE = 120;
const STEP = 30;
const CARD_PADDING = 5;

const MIN_RADIUS = 20;
const MAX_RADIUS = 90;
const RADIUS_STEP = 10;
const SVG_HEIGHT = 200;

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const ActionButton = ( { label, onPress, style }: ActionButtonProps ) => (
  <Pressable onPress={onPress} style={[ styles.button, style ]}>
    <Text style={styles.buttonText}>{label}</Text>
  </Pressable>
);

const AnimatingStylesProps = () => {
  const { colors } = useTheme();

  const translateX = useSharedValue( 0 );
  const radius = useSharedValue( MIN_RADIUS );

  // Where each animation is heading. Reading shared values on the JS thread
  // mid-animation gives the current value, not the target, so rapid presses
  // would drift. Plain refs avoid that.
  const targetX = useRef( 0 );
  const targetRadius = useRef( MIN_RADIUS );
  const cardWidth = useRef( 0 );

  const boxStyle = useAnimatedStyle( () => ( {
    transform: [ { translateX: translateX.get() } ],
  } ) );

  const circleProps = useAnimatedProps( () => ( {
    r: radius.get(),
  } ) );

  const handleCardLayout = ( e: LayoutChangeEvent ) => {
    cardWidth.current = e.nativeEvent.layout.width;
  };

  const handleMoveBox = () => {
    const maxX = cardWidth.current - CARD_PADDING * 2 - BOX_SIZE;
    const next = targetX.current + STEP;

    targetX.current = next > maxX ? 0 : next; // wrap back to the start
    translateX.set( withSpring( targetX.current ) );
  };

  const handleGrowCircle = () => {
    const next = targetRadius.current + RADIUS_STEP;

    targetRadius.current = next > MAX_RADIUS ? MIN_RADIUS : next; // wrap back
    radius.set( withTiming( targetRadius.current ) );
  };

  return (
    <SafeAreaView style={[ styles.container, { backgroundColor: colors.background } ]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[ styles.title, { color: colors.text } ]}>
          Translating a View using Reanimated
        </Text>
        <View
          style={[ styles.card, { backgroundColor: colors.card } ]}
          onLayout={handleCardLayout}
        >
          <Animated.View style={[ styles.box, boxStyle ]} />
          <ActionButton label='Move' onPress={handleMoveBox} />
        </View>

        <Text style={[ styles.title, { color: colors.text } ]}>
          Animating a Circle radius using Reanimated
        </Text>
        <View style={[ styles.card, { backgroundColor: colors.card } ]}>
          <Svg width='100%' height={SVG_HEIGHT}>
            <AnimatedCircle
              cx='50%'
              cy='50%'
              r={MIN_RADIUS}
              fill={colors.primary}
              animatedProps={circleProps}
            />
          </Svg>
          <ActionButton label='Grow' onPress={handleGrowCircle} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnimatingStylesProps;

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 120, // clears the floating tab bar
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: CARD_PADDING,
    paddingBottom: 20,
  },
  box: {
    height: BOX_SIZE,
    width: BOX_SIZE,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 50,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'blue',
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
