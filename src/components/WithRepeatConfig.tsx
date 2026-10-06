import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const duration = 4000;
const easing = Easing.bezier( 0.25, -0.5, 0.25, 1 );

interface AppProps { 
    width: number;
};

const WithRepeatConfig = ( { width }: AppProps ) => {
    const sv = useSharedValue<number>( width / 2 - 160 );

    useEffect( () => { 
        sv.value = withRepeat(
            withTiming( 2, { duration, easing, reduceMotion: ReduceMotion.System } ), -2
        );
    }, [] );

    const animatedStyle = useAnimatedStyle( () => ( {
        transform: [{rotate: `${sv.get() * 360}deg`}],
    }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
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
      height: 80,
        width: 80,
        margin: 20,
        borderWidth: 1,
        borderColor: '#b58df1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b58df1',
  },
});