import { useTheme } from 'expo-router';
import { ReactNode, useRef } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_PADDING = 20;
const CARD_PADDING = 16;
const STAGE_HEIGHT = 200;
const MIN_SIZE = 60;

const COLOR_A = '#8b5cf6';
const COLOR_B = '#f97316';

const randomBetween = ( min: number, max: number ) =>
  min + Math.random() * ( max - min );

// Widest a box can be inside a card's stage area
const useStageWidth = () => {
  const { width } = useWindowDimensions();
  return width - SCREEN_PADDING * 2 - CARD_PADDING * 2;
};

/* ---------- Reusable card ---------- */

interface DemoCardProps {
  title: string;
  description: string;
  buttonLabel: string;
  onPress: () => void;
  children: ReactNode;
}

const DemoCard = ( { title, description, buttonLabel, onPress, children }: DemoCardProps ) => {
  const { colors } = useTheme();

  return (
    <View style={[ styles.card, { backgroundColor: colors.card, borderColor: colors.border } ]}>
      <Text style={[ styles.cardTitle, { color: colors.text } ]}>{title}</Text>
      <Text style={[ styles.cardDescription, { color: colors.text } ]}>{description}</Text>

      <View style={styles.stage}>{children}</View>

      <Pressable
        onPress={onPress}
        style={( { pressed } ) => [
          styles.button,
          { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </Pressable>
    </View>
  );
};

/* ---------- Demos (each owns its own shared values) ---------- */

const WidthDemo = () => {
  const stageWidth = useStageWidth();
  const width = useSharedValue( MIN_SIZE * 2 );

  const boxStyle = useAnimatedStyle( () => ( { width: width.get() } ) );

  return (
    <DemoCard
      title='Width'
      description='Spring the width to a random value.'
      buttonLabel='Change width'
      onPress={() => width.set( withSpring( randomBetween( MIN_SIZE, stageWidth ) ) )}
    >
      <Animated.View style={[ styles.box, styles.wideBox, boxStyle ]} />
    </DemoCard>
  );
};

const SizeDemo = () => {
  const stageWidth = useStageWidth();
  const width = useSharedValue( 120 );
  const height = useSharedValue( 120 );

  const boxStyle = useAnimatedStyle( () => ( {
    width: width.get(),
    height: height.get(),
  } ) );

  const handlePress = () => {
    width.set( withSpring( randomBetween( MIN_SIZE, stageWidth ) ) );
    height.set( withSpring( randomBetween( MIN_SIZE, STAGE_HEIGHT - 10 ) ) );
  };

  return (
    <DemoCard
      title='Width and height'
      description='Two shared values driving one animated style.'
      buttonLabel='Change size'
      onPress={handlePress}
    >
      <Animated.View style={[ styles.box, boxStyle ]} />
    </DemoCard>
  );
};

const TransformDemo = () => {
  const rotation = useSharedValue( 0 );
  const scale = useSharedValue( 1 );
  const rotationTarget = useRef( 0 ); // keeps spins consistent on rapid taps

  const boxStyle = useAnimatedStyle( () => ( {
    transform: [
      { rotate: `${rotation.get()}deg` },
      { scale: scale.get() },
    ],
  } ) );

  const handlePress = () => {
    rotationTarget.current += 90;
    rotation.set( withSpring( rotationTarget.current ) );
    scale.set( withSpring( randomBetween( 0.5, 1.3 ) ) );
  };

  return (
    <DemoCard
      title='Rotate and scale'
      description='Transforms animated together with springs.'
      buttonLabel='Spin'
      onPress={handlePress}
    >
      <Animated.View style={[ styles.squareBox, boxStyle ]} />
    </DemoCard>
  );
};

const AppearanceDemo = () => {
  const progress = useSharedValue( 0 );
  const isOn = useRef( false );

  const boxStyle = useAnimatedStyle( () => ( {
    backgroundColor: interpolateColor( progress.get(), [ 0, 1 ], [ COLOR_A, COLOR_B ] ),
    opacity: 1 - progress.get() * 0.4,
    borderRadius: 16 + progress.get() * 34, // square to circle
  } ) );

  const handlePress = () => {
    isOn.current = !isOn.current;
    progress.set( withTiming( isOn.current ? 1 : 0, { duration: 600 } ) );
  };

  return (
    <DemoCard
      title='Color, opacity and shape'
      description='One progress value interpolated into three style props.'
      buttonLabel='Toggle'
      onPress={handlePress}
    >
      <Animated.View style={[ styles.squareBox, boxStyle ]} />
    </DemoCard>
  );
};

/* ---------- Screen ---------- */

export default function Index() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[ styles.safeArea, { backgroundColor: colors.background } ]}
      edges={[ 'top', 'left', 'right' ]}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={[ styles.header, { color: colors.text } ]}>
            Animating styles and props
          </Text>
          <Text style={[ styles.subtitle, { color: colors.text } ]}>
            Tap a button to run each animation.
          </Text>
        </View>

        <WidthDemo />
        <SizeDemo />
        <TransformDemo />
        <AppearanceDemo />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create( {
  safeArea: {
    flex: 1,
  },
  content: {
    padding: SCREEN_PADDING,
    paddingBottom: 32,
    gap: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    marginTop: 4,
    opacity: 0.6,
  },
  card: {
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    padding: CARD_PADDING,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 2,
    opacity: 0.6,
  },
  stage: {
    height: STAGE_HEIGHT,
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(128,128,128,0.12)',
  },
  box: {
    backgroundColor: COLOR_A,
    borderRadius: 16,
  },
  wideBox: {
    height: 80,
  },
  squareBox: {
    width: 100,
    height: 100,
    backgroundColor: COLOR_A,
    borderRadius: 16,
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
} );
