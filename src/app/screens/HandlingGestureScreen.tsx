import ConfigContainer from '@/components/ConfigContainer';
import { useTheme } from 'expo-router';
import { LayoutChangeEvent, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withDecay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ON = '#FFE04B';
const OFF = '#B58DF1';

const CIRCLE_SIZE = 100;
const BOUNDARY_OFFSET = 50; // gap kept between the circle and the stage edges

/* ---------- Demos: each one owns its shared values ---------- */

const TapDemo = () => {
  const pressed = useSharedValue( false );

  const tap = Gesture.Tap()
    .onBegin( () => {
      pressed.set( true );
    } )
    .onFinalize( () => {
      pressed.set( false );
    } );

  const circleStyle = useAnimatedStyle( () => ( {
    backgroundColor: withTiming( pressed.get() ? ON : OFF ),
    transform: [ { scale: withTiming( pressed.get() ? 2 : 1 ) } ],
  } ) );

  return (
    <ConfigContainer
      title='Gesture.Tap()'
      description="Right now we'll start simple and get to know Tap and Pan gestures as well as how to use withDecay animation function."
      expandable
    >
      <GestureDetector gesture={tap}>
        <Animated.View style={[ styles.circle, circleStyle ]} />
      </GestureDetector>
    </ConfigContainer>
  );
};

const PanDemo = () => {
  const pressed = useSharedValue( false );
  const offset = useSharedValue( 0 );

  const pan = Gesture.Pan()
    .activeOffsetX( [ -10, 10 ] ) // only activate after a 10px horizontal move...
    .failOffsetY( [ -10, 10 ] ) // ...and let vertical drags scroll the page instead
    .onBegin( () => {
      pressed.set( true );
    } )
    .onChange( ( event ) => {
      // Accumulate the change instead of using translationX, so a new drag
      // that starts mid-spring-back continues from where the circle is.
      offset.set( offset.get() + event.changeX );
    } )
    .onFinalize( () => {
      offset.set( withSpring( 0 ) );
      pressed.set( false );
    } );

  const circleStyle = useAnimatedStyle( () => ( {
    backgroundColor: withTiming( pressed.get() ? ON : OFF ),
    transform: [
      { translateX: offset.get() },
      { scale: withTiming( pressed.get() ? 1.2 : 1 ) },
    ],
  } ) );

  return (
    <ConfigContainer
      title='Gesture.Pan()'
      description="Let's spice things up a bit by making the circle draggable and have it bounce back to its starting position when released. Let's also keep the color highlight and scale effect we've added in the previous example. Implementing this behavior it's not possible with just a simple tap gesture. We need to reach for a pan gesture instead."
      expandable
    >
      <GestureDetector gesture={pan}>
        <Animated.View style={[ styles.circle, circleStyle ]} />
      </GestureDetector>
    </ConfigContainer>
  );
};

const WithDecayDemo = () => {
  const offset = useSharedValue( 0 );
  const stageWidth = useSharedValue( 0 );

  const onLayout = ( event: LayoutChangeEvent ) => {
    stageWidth.set( event.nativeEvent.layout.width );
  };

  const pan = Gesture.Pan()
    .activeOffsetX( [ -10, 10 ] ) // don't fight the page's vertical scroll
    .failOffsetY( [ -10, 10 ] )
    .onBegin( () => {
      cancelAnimation( offset ); // catch the circle if it is still coasting
    } )
    .onChange( ( event ) => {
      offset.set( offset.get() + event.changeX );
    } )
    .onFinalize( ( event ) => {
      // How far the circle's center may travel from the middle of the stage
      const limit = Math.max( 0, stageWidth.get() / 2 - CIRCLE_SIZE / 2 - BOUNDARY_OFFSET );

      offset.set(
        withDecay( {
          velocity: event.velocityX,
          rubberBandEffect: true,
          clamp: [ -limit, limit ],
        } ),
      );
    } );

  const circleStyle = useAnimatedStyle( () => ( {
    transform: [ { translateX: offset.get() } ],
  } ) );

  return (
    <ConfigContainer
      title='withDecay'
      description="withDecay lets you retain the velocity of the gesture and animate with some deceleration. That means when you release a grabbed object with some velocity you can slowly bring it to stop. Sounds complicated but it really isn't!"
      expandable
    >
      <View onLayout={onLayout} style={styles.wrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[ styles.circle, circleStyle ]} />
        </GestureDetector>
      </View>
    </ConfigContainer>
  );
};

/* ---------- Screen ---------- */

const HandlingGestureScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const headerStyle = [ styles.header, { color: colors.text, borderBottomColor: colors.border } ];

  return (
    <ScrollView
      contentContainerStyle={[ styles.content, { paddingBottom: insets.bottom + 24 } ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={headerStyle}>Handling tap gestures</Text>
      <TapDemo />

      <Text style={headerStyle}>Handling pan gestures</Text>
      <PanDemo />

      <Text style={headerStyle}>Using withDecay</Text>
      <WithDecayDemo />
    </ScrollView>
  );
};

export default HandlingGestureScreen;

const styles = StyleSheet.create( {
  content: {
    padding: 10,
    gap: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 25,
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
  circle: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: OFF, // the Tap/Pan demos override this with an animated color
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
} );
