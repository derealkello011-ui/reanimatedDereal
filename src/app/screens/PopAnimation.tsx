import { useTheme } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

const PopAnimation = () => {
    const [ isBig, setIsBig ] = useState<boolean>( false );
    const { colors } = useTheme();

    const handlePress = () => { 
        setIsBig( !isBig );
    };

    const animatedCircle = useAnimatedStyle( () => {
        const DAMPING = 20;
        const STIFFNESS = 300;

        return {
            transitionProperty: 'transform',
                transitionDuration: '300ms',
                    transitionDelay: '250ms',
                        transitionTimingFunction: 'ease-out',
                            transform: [ {
                                scale: isBig
                                    ? withSpring( 1.5, {
                                        damping: DAMPING,
                                        stiffness: STIFFNESS,
                                    } )
                                    : withSpring( 1, {
                                        damping: DAMPING,
                                        stiffness: STIFFNESS,
                                    } )
                            } ]
        }
    } );

    return (
        <View style={[styles.container, {backgroundColor: colors.background, borderColor: colors.border}]} >
            <Animated.View
                style={[
                    styles.circle,
                    animatedCircle,
                    // {
                    //     transitionProperty: 'transform',
                    //     transitionDuration: '300ms',
                    //     transitionDelay: '250ms',
                    //     transitionTimingFunction: 'ease-in-out',
                    //     transform: [{scale: isBig ? 1.5 : 1}],
                    // },
                ]}
            />
                
            <TouchableOpacity style={[styles.button]} onPress={handlePress}>
                <Text style={[ {color: colors.text},styles.buttonText ]}>Animate</Text>
            </TouchableOpacity>
        </View>
  )
}

export default PopAnimation

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 90,
        backgroundColor: '#ff6b6b',
        marginBottom: 80,
        boxShadow: '0px 0px 50px 10px #ff6b6bcc',
        // borderWidth: 2
    },
    button: {
        backgroundColor: '#6c5ce7',
        paddingHorizontal: 32,
        paddingVertical: 15,
        borderRadius: 25,
        shadowColor: '#6c5ce7',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 6
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15
    }
})