import { StyleSheet, Text, View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';

const DURATION = 2000;

interface AppProps { 
    width: number;
};

const WithTimingConfig = ( { width }: AppProps ) => {
    const defaultAnim = useSharedValue<number>( width / 2 - 160 );
    const linear = useSharedValue<number>( width / 2 - 160 );

    

  return (
    <View style={styles.container}>
          <Animated.View style={[styles.box]}>
              <Text style={ styles.text }>inout</Text>
          </Animated.View>
          <Animated.View style={[styles.box]}>
              <Text style={ styles.text }>inout</Text>
          </Animated.View>
    </View>
  )
}

export default WithTimingConfig

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: 'flex-start', 
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