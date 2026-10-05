import StoryListItem, { StoryListItemHeight, StoryListItemWidth, WindowWidth } from '@/components/StoryListItem'
import { Stories } from '@/constants/assets'
import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedRef, useScrollOffset } from 'react-native-reanimated'

const CarouselScreen = () => {
    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollOffset( animatedRef );

    // useDerivedValue( () => {
    //     console.log( scrollOffset.value );
    // })
    
    const ListPadding = WindowWidth - StoryListItemWidth;
    
  return (
      <View style={styles.container}>
          <View style={{
              height: StoryListItemHeight,
              width: '100%'
          }}>
              <Animated.ScrollView
                  ref={animatedRef}
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={16}
                  horizontal
                  snapToInterval={StoryListItemWidth}
                  decelerationRate={'fast'}
                  contentContainerStyle={{
                      width: StoryListItemWidth * Stories.length + ListPadding,
                  }}
              >
                  {Stories.map( ( story, index ) => {
                      return <StoryListItem scrollOffset={scrollOffset} index={index} imageSource={story.image} key={index} />
                    }
                 )}
            </Animated.ScrollView>
          </View>
    </View>
  )
}

export default CarouselScreen

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    }
})