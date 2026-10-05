import StoryListItem, { StoryListItemHeight } from '@/components/StoryListItem'
import { Stories } from '@/constants/assets'
import { ScrollView, StyleSheet, View } from 'react-native'

const CarouselScreen = () => {
  return (
      <View style={styles.container}>
          <View style={{
              height: StoryListItemHeight,
          }}>
            <ScrollView showsHorizontalScrollIndicator={ false} horizontal>
                {Stories.map( ( story, index ) => (
                    <StoryListItem key={index} />
                ) )}
            </ScrollView>
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