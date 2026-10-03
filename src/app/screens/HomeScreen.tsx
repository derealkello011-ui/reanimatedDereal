import { useTheme } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const AnimatedInput = Animated.createAnimatedComponent( TextInput );

const MIN_WIDTH = 100;
const MAX_BOXWIDTH = 150;
const MIN_BOXHEIGHT = 100;
const MAX_BOXHEIGHT = 150;

const HomeScreen = () => {
    const { colors } = useTheme();
    const isDark = useColorScheme() === 'dark' ? true : false;

    const width = useSharedValue( MIN_WIDTH );
    const height = useSharedValue( MIN_BOXHEIGHT );
    const backgroundColor = useSharedValue('teal');

    const startAnimation = () => { 
        const randWidth = Math.floor( Math.random() * (MAX_BOXWIDTH - MIN_WIDTH) ) + MIN_WIDTH;
        const randHeight = Math.floor( Math.random() * (MAX_BOXHEIGHT - MIN_BOXHEIGHT) ) + MIN_BOXHEIGHT;
        const bgColor = `hsl(${Math.floor( Math.random() * 360 )}, 70%, 55%)`;
        
        backgroundColor.set( withTiming(bgColor, { duration: 500 }),  );
        width.set( withSpring(randWidth, {duration: 500}),  );
        height.set( withSpring(randHeight, {duration: 500}) );
    };


    const animatedStyles = useAnimatedStyle( () => { 
        return {
            width: width.get(),
            height: height.get(),
            backgroundColor: backgroundColor.get(),
        };
    } );
  return (
      <ScrollView style={[ styles.container, { backgroundColor: colors.background } ]}>
          <Text style={[ styles.title, { color: colors.text } ]}>Home Screen</Text>
          <Text style={[ styles.subText, { color: colors.text } ]}>Animating a View using Reanimated</Text>
          <View style={styles.content}>
            <View style={[ styles.content1, { backgroundColor: colors.card } ]}>
                <View style={[ styles.animatedContainer ]}>
                    <Animated.View style={[styles.animatedBox, animatedStyles]} />  
                </View>
            </View>
            <View style={[ styles.content2, { backgroundColor: colors.background, borderColor: colors.border } ]}>
                <Pressable style={[{backgroundColor: 'transparent'}]} onPress={startAnimation} > 
                    <Text style={[ styles.buttonText, {backgroundColor: isDark ? '#fff' : '#000', color: isDark ? '#000' : '#fff'} ]}>Animation</Text>
                </Pressable>
                <AnimatedInput
                    style={[styles.animatedInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.card }]}
                    placeholder='Type here...'
                    placeholderTextColor={colors.text}
                    textContentType={'password'}
                />  
            </View>    
          </View>
      </ScrollView>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        gap: 20
    },
    content1: {
        width: '100%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 10,
        alignSelf: 'center',
    },
    animatedBox: {
        width: MIN_WIDTH,
        height: MIN_BOXHEIGHT,
        backgroundColor: 'teal',
        borderRadius: 10,
        marginBottom: 20,
    },
    animatedInput: {
        width: '90%',
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    subText: {
        fontSize: 16,
        marginBottom: 10,
        opacity: 0.6,
    },
    button: {
        marginBottom: 20,
        position: 'relative'
    },
    buttonText: {
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    animatedContainer: {
        width: '100%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content2: {
        width: '100%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        borderWidth: 1,      
        gap: 20
    }
});

export default HomeScreen