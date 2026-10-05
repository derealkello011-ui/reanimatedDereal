import { Image, ImageSource } from 'expo-image';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

export const WindowWidth = Dimensions.get( 'window' ).width;
export const StoryListItemWidth = WindowWidth * 0.8;
export const StoryListItemHeight = ( (StoryListItemWidth + 50) / 3 ) * 4;

interface StoryListItemProps {
    imageSource: ImageSource | number; 
    index: number;
    scrollOffset: SharedValue<number>;
}

const StoryListItem = ( { imageSource, index, scrollOffset }: StoryListItemProps ) => {
    const rContainerStyle = useAnimatedStyle( () => { 
        const activeIndex = ( scrollOffset.get() / StoryListItemWidth );

        const paddingLeft = ( WindowWidth - StoryListItemWidth ) / 4;
        
        const translateX = interpolate(
            activeIndex,
            [ index - 2, index - 1, index, index + 1 ], // input range
            [ 120, 60, 0, -StoryListItemWidth - paddingLeft ], // output range,
            Extrapolation.CLAMP, 
        )
        const scale = interpolate(
            activeIndex,
            [ index - 2, index - 1, index, index + 1 ], // input range
            [ 0.8, 0.9, 1, 1 ], // output range,
            Extrapolation.CLAMP, 
        )

        return {
            left: paddingLeft,
            transform: [
            { scale },
            {
                translateX: scrollOffset.get() + translateX,
            },
                ],
            
        }
    } , [ ]);
    return (
      <Animated.View style={[{
          zIndex: -index,
        }, rContainerStyle,
        ]}>
          <Image
              source={imageSource}
              style={[styles.image]}
              contentFit='cover'
          />
    </Animated.View>
  );
};

export default StoryListItem;

const styles = StyleSheet.create( {
    image: {
        width: StoryListItemWidth,
        height: StoryListItemHeight,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'gray',
        position: 'absolute'
  },
} );
