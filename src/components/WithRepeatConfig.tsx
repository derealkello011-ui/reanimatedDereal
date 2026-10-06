import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

// SPIN VARIABLES
const duration = 8000;
const easing = Easing.bezier( 0.25, -0.5, 0.25, 1 );

// WOBBLE VARIABLES
const ANGLE = 10;
const TIME = 100;
const EASING = Easing.elastic( 1.5 );

// OFFSET SEQUENCE VARIABLES
const OFFSET = 40;
const OFFSET_TIME = 250;

interface AppProps { 
    width: number;
};

const WithRepeatConfig = ( { width }: AppProps ) => {
    const sv = useSharedValue<number>( width / 2 - 160 );
    const rotation = useSharedValue<number>( 0 );
    const offsetVar = useSharedValue<number>( 0 );

    useEffect( () => { 
        sv.value = withRepeat(
            withTiming( 2, { duration, easing, reduceMotion: ReduceMotion.System } ), -2
        );
        rotation.value = withRepeat(
            withSequence(
                withTiming( -ANGLE, { duration: TIME / 2, easing: EASING } ),
                withRepeat(
                    withTiming( ANGLE, {
                        duration: TIME,
                        easing: EASING,
                    } ), -2, true
                ),
                withTiming( 0, { duration: TIME / 2, easing: EASING } )
            ), );
        offsetVar.value = withRepeat( withSequence(
            withTiming( -OFFSET, { duration: OFFSET_TIME / 2 } ),
            withRepeat( withTiming( OFFSET, { duration: OFFSET_TIME } ), 5, true ),
            withTiming( 0, { duration: OFFSET_TIME / 2 } ),
        ), -2)
    }, [] );

    const animatedStyle = useAnimatedStyle( () => ( {
        transform: [{rotate: `${sv.get() * 360}deg`}],
    } ) );
    
    const wobbleStyle = useAnimatedStyle( () => ( {
        transform: [ { rotateZ: `${ rotation.get() }deg` } ],
    } ) );

    const offsetStyle = useAnimatedStyle( () => ( {
        transform: [{translateX: offsetVar.get()}]
    }))

  return (
    <View style={styles.container}>
        <Animated.View style={[ styles.box, animatedStyle ]} >
            <Text style={styles.text}>Spin</Text>
          </Animated.View>
          <Animated.View style={[styles.box, wobbleStyle] } >
            <Text style={styles.text}>Wobble</Text>
          </Animated.View>
          <Animated.View style={[styles.box, offsetStyle] } >
            <Text style={styles.text}>Offset</Text>
          </Animated.View>
    </View>
  )
}

export default WithRepeatConfig

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
    box: {
        height: 100,
        width: 100,
        margin: 20,
        borderWidth: 1,
        borderColor: '#b58df1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b58df1',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18
  }
});