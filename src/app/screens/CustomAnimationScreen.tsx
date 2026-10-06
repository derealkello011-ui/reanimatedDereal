import ConfigContainer from '@/components/ConfigContainer';
import WithRepeatConfig from '@/components/WithRepeatConfig';
import WithSpringConfig from '@/components/WithSpringConfig';
import WithTimingConfig from '@/components/WithTimingConfig';
import { useTheme } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const boxWidth = 100;

const CustomAnimationScreen = () => {
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
                    title='withTiming'
                    description='withTiming lets you create an animation based on duration and easing.'
                >
                    <WithTimingConfig width={boxWidth} />
                </ConfigContainer>
            </View>

            <View style={ styles.content}>
                <ConfigContainer
                    title='withSpring'
                    description="withSpring is a physics-based animation function which works way differently from withTiming. It makes it look like the object you're animating is connected to a real spring. The physics-based approach makes the animations look believable."
                >
                    <WithSpringConfig width={boxWidth} />
                </ConfigContainer>
            </View>

            <Text style={[ { color: colors.text, borderBottomColor: colors.border }, styles.header ]} >
                Applying Modifiers 
            </Text>
            <View style={ styles.content}>
                <ConfigContainer
                    title='withRepeat'
                    description='withRepeat is an animation modifier that lets you repeat an animation given number of times or run it indefinitely.'
                >
                    <WithRepeatConfig width={boxWidth} />
                </ConfigContainer>
            </View>
            
        </ScrollView>
    )
};

export default CustomAnimationScreen

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