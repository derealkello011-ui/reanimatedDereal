import { Image, ImageSource } from 'expo-image';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

export const WindowWidth = Dimensions.get( 'window' ).width;
export const StoryListItemWidth = WindowWidth * 0.8;
export const StoryListItemHeight = ( ( StoryListItemWidth + 50 ) / 3 ) * 4;

// Left margin of the front card. The space to its right is where the stack peeks out.
const CARD_LEFT = ( WindowWidth - StoryListItemWidth ) / 4;

interface StoryListItemProps {
  imageSource: ImageSource | number;
  index: number;
  count: number; // total number of cards, used for stacking order
  scrollOffset: SharedValue<number>;
}

const StoryListItem = ( { imageSource, index, count, scrollOffset }: StoryListItemProps ) => {
  const animatedStyle = useAnimatedStyle( () => {
    const offset = scrollOffset.get();
    const activeIndex = offset / StoryListItemWidth; // 0, 1, 2... on every snap

    // Where this card sits relative to the active one:
    // two behind, one behind, active, already passed
    const inputRange = [ index - 2, index - 1, index, index + 1 ];

    const translateX = interpolate(
      activeIndex,
      inputRange,
      [ 120, 60, 0, -StoryListItemWidth - CARD_LEFT * 2 ],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      activeIndex,
      inputRange,
      [ 0.8, 0.9, 1, 1 ],
      Extrapolation.CLAMP,
    );
    // Cards deeper than the visible stack stay invisible (less overdraw)
    const opacity = interpolate( activeIndex, [ index - 3, index - 2 ], [ 0, 1 ], Extrapolation.CLAMP );

    return {
      opacity,
      transform: [
        // Order matters: translate FIRST, then scale. With scale first, the
        // translation gets multiplied by the scale and the cards drift as you scroll.
        { translateX: offset + translateX }, // `offset` cancels the scroll so the card stays pinned
        { scale },
      ],
    };
  } );

  return (
    <Animated.View style={[ styles.card, { zIndex: count - index }, animatedStyle ]}>
      <Image source={imageSource} style={styles.image} contentFit='cover' />
    </Animated.View>
  );
};

export default StoryListItem;

const styles = StyleSheet.create( {
  card: {
    position: 'absolute', // every card sits in the same spot; transforms do the stacking
    top: 0,
    left: CARD_LEFT,
    width: StoryListItemWidth,
    height: StoryListItemHeight,
    transformOrigin: 'left center', // scale toward the left edge, vertically centered
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'gray',
  },
} );
