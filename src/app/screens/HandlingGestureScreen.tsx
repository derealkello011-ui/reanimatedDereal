import ConfigContainer from '@/components/ConfigContainer';
import { useTheme } from 'expo-router';
import { LayoutChangeEvent, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDecay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ON = '#FFE04B';
const OFF = '#B58DF1';

// withDecay Variables
const SIZE = 120;
const BOUNDARY_OFFSET = 50;

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
    const offset = useSharedValue<number>( 0 );
    const width = useSharedValue<number>( 0 );

    const onLayout = ( event: LayoutChangeEvent ) => {
        width.set( event.nativeEvent.layout.width );
    }

    const pan = Gesture.Pan()
        .onChange( ( event ) => {
            offset.set( offset.get() + event.changeX );
        } )
        .onFinalize( (event) => {
            offset.set( withDecay( {
                velocity: event.velocityX,
                rubberBandEffect: true,
                clamp: [
                    -( width.get() / 2 ) + SIZE / 2 + BOUNDARY_OFFSET,
                    width.get() / 2 - SIZE / 2 - BOUNDARY_OFFSET,
                ]
            } ) )
        } );
    
    const animatedStyles = useAnimatedStyle( () => ( {
        transform: [ { translateX: offset.get() } ]
    } ) );

    return (
        <ConfigContainer
            title='withDecay'
            description="withDecay lets you retain the velocity of the gesture and animate with some deceleration. That means when you release a grabbed object with some velocity you can slowly bring it to stop. Sounds complicated but it really isn't!"
        >
            <View onLayout={onLayout} style={styles.wrapper}>
                <GestureDetector gesture={pan}>
                    <Animated.View style={[styles.circle, animatedStyles]} />
                </GestureDetector>
            </View>
        </ConfigContainer>
    )
    
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
    height: 100,
    width: 100,
    borderRadius: 50,
    },
    wrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        // height: SIZE,
        // width: SIZE,
        backgroundColor: '#b58df1',
        borderRadius: 20,
        cursor: 'grab',
        alignItems: 'center',
        justifyContent: 'center',
    },
} );
