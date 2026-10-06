import ConfigContainer from '@/components/ConfigContainer';
import WithTimingConfig from '@/components/withTimingConfig';
import { useTheme } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

const CustomAnimationScreen = () => {
    const { colors } = useTheme();

    return (
        <ScrollView
            style={styles.container}
        >
            <View style={ styles.content}>
                <ConfigContainer
                    title='withTiming'
                    description='withTiming lets you create an animation based on duration and easing.'
                >
                    <WithTimingConfig width={100} />
                </ConfigContainer>
            </View>

            <View style={ styles.content}>
                <ConfigContainer
                    title='withTiming'
                    description='withTiming lets you create an animation based on duration and easing.'
                >
                    <WithTimingConfig width={100} />
                </ConfigContainer>
            </View>
        </ScrollView>
    )
};

export default CustomAnimationScreen

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        padding: 10
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    }
})