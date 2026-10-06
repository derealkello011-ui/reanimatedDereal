import StoryListItem, {
    StoryListItemHeight,
    StoryListItemWidth,
    WindowWidth,
} from '@/components/StoryListItem';
import { Stories } from '@/constants/assets';
import { useTheme } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedRef, useScrollOffset } from 'react-native-reanimated';

const CarouselScreen = () => {
  const { colors } = useTheme();
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset( animatedRef );

  // The scrollable width that leaves exactly (count - 1) snap steps
  const listPadding = WindowWidth - StoryListItemWidth;

  return (
    <View style={[ styles.container, { backgroundColor: colors.background } ]}>
      <View style={styles.carousel}>
        <Animated.ScrollView
          ref={animatedRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={StoryListItemWidth}
          decelerationRate='fast'
          disableIntervalMomentum
          bounces={false} // overscroll would push the first/last card out of place
          overScrollMode='never'
          contentContainerStyle={{
            width: StoryListItemWidth * Stories.length + listPadding,
          }}
        >
          {Stories.map( ( story, index ) => (
            <StoryListItem
              key={index}
              index={index}
              count={Stories.length}
              scrollOffset={scrollOffset}
              imageSource={story.image}
            />
          ) )}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default CarouselScreen;

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  carousel: {
    width: '100%',
    height: StoryListItemHeight,
  },
} );
