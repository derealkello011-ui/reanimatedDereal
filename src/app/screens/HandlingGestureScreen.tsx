import ConfigContainer from '@/components/ConfigContainer';
import WithTimingConfig from '@/components/WithTimingConfig';
import { useTheme } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const HandlingGestureScreen = () => {
    const { colors } = useTheme();

    return (
        <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
        >
            <Text style={[ { color: colors.text, borderBottomColor: colors.border }, styles.header ]} >
                Built-in animation functions: 
            </Text>

            <View style={ styles.content}>
                <ConfigContainer
                    title='Handling tap gestures'
                    description="Right now we'll start simple and get to know Tap and Pan gestures as well as how to use withDecay animation function."
                >
                    <WithTimingConfig width={100} />
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
    }
})