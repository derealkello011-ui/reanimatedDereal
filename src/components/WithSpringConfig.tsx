import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
} from 'react-native-reanimated';

const DURATION = 2000;

interface AppProps { 
    width: number;
};


const WithSpringConfig = ( { width }: AppProps ) => {
    const defaultAnim = useSharedValue<number>( width / 2 - 160 );
    const changedAnim = useSharedValue<number>( width / 2 - 160 );

    const animatedLinear = useAnimatedStyle(() => ({
        transform: [{ translateX: defaultAnim.get() }],
    } ) );
    
    const animatedChanged = useAnimatedStyle(() => ({
        transform: [{ translateX: changedAnim.get() }],
    } ) );
    
    useEffect(() => {
    defaultAnim.value = withRepeat(
      withSpring(-defaultAnim.get()),
      -1,
      true
    );
    changedAnim.value = withRepeat(
      withSpring(-changedAnim.get(), {
        mass: 10,
        damping: 40,
      }),
        -1,
        true
    );
    }, [] );
    
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedLinear]}>
        <Text style={styles.text}>Default</Text>
      </Animated.View>
      <Animated.View style={[styles.box, animatedChanged]}>
        <Text style={styles.text}>Heavy</Text>
      </Animated.View>
    </View>
  )
}

export default WithSpringConfig

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
  },
  text: {
    color: '#b58df1',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});