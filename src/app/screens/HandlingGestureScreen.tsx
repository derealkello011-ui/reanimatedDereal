import ConfigContainer from '@/components/ConfigContainer';
import { useTheme } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const ON = '#FFE04B';
const OFF = '#B58DF1';

const HandlingGestureScreen = () => {
    const { colors } = useTheme();
    const pressed = useSharedValue<boolean>( false );
        
    const panPressed = useSharedValue<boolean>( false );
    const offset = useSharedValue<number>( 0 );

    const tap = Gesture.Tap()
        .onBegin( () => {
            pressed.set( true );
        } )
        .onFinalize( () => {
            pressed.set( false );
        } )
    
    const animatedStyles = useAnimatedStyle( () => ( {
        backgroundColor: pressed.get() ? ON : OFF,
        transform: [ {
            scale: withTiming(pressed.get() ? 2 : 1)
        } ],
    } ) );

    const pan = Gesture.Pan()
        .onBegin( () => {
            panPressed.set( true );
        } )
        .onChange( ( event ) => {
            offset.set( event.translationX );
        } )
        .onFinalize( () => {
            offset.set( withSpring( 0 ) );
            pressed.set( false );
        } )
    
    const panAnimatedStyles = useAnimatedStyle( () => ( {
        transform: [
            {
                translateX: offset.get()
            }, {
                scale: withTiming(panPressed.get() ? 1.2 : 1)
            },
        ],
        backgroundColor: panPressed.get() ? ON : OFF,
    }))

    return (
        <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
        >
            <Text style={[ { color: colors.text, borderBottomColor: colors.border }, styles.header ]} >
                Handling tap gestures 
            </Text>

            <View style={ styles.content}>
                <ConfigContainer
                    title='Gesture.Tap()'
                    description="Right now we'll start simple and get to know Tap and Pan gestures as well as how to use withDecay animation function."
                    expandable={true}
                >
                    <GestureDetector gesture={tap}>
                        <Animated.View style={[animatedStyles, styles.circle] } />
                    </GestureDetector>
                </ConfigContainer>
            </View>

            <Text style={[ { color: colors.text, borderBottomColor: colors.border }, styles.header ]} >
                Handling pan gestures 
            </Text>

            <View style={ styles.content}>
                <ConfigContainer
                    title='Gesture.Pap()'
                    description="Let's spice things up a bit by making the circle draggable and have it bounce back to its starting position when released. Let's also keep the color highlight and scale effect we've added in the previous example. Implementing this behavior it's not possible with just a simple tap gesture. We need to reach for a pan gesture instead."
                    expandable={true}
                >
                    <GestureDetector gesture={pan}>
                        <Animated.View style={[panAnimatedStyles, styles.circle, {cursor: 'pointer'}] } />
                    </GestureDetector>
                </ConfigContainer>
            </View>
          
        </ScrollView>
  )
}

export default HandlingGestureScreen

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        padding: 10,
        gap: 20,
        paddingBottom: 100,

    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    header: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
        borderBottomWidth: 2,
        paddingBottom: 5
    },
    circle: {
        height: 100,
        width: 100,
        borderRadius: 500,
        backgroundColor: '#b58df1',
    },
})