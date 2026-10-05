import { Image, ImageSource } from 'expo-image';
import { Dimensions, StyleSheet, View } from 'react-native';

export const StoryListItemWidth = Dimensions.get( 'window' ).width * 0.8;
export const StoryListItemHeight = ( StoryListItemWidth / 3 ) * 4;

interface StoryListItemProps {
    imageSource: ImageSource
}

const StoryListItem: React.FC<StoryListItemProps> = ({imageSource}) => {
  return (
    <View style={styles.container}>
        <Image source={imageSource} />
    </View>
  )
}

export default StoryListItem

const styles = StyleSheet.create( {
    container: {
        height: StoryListItemHeight,
        width: StoryListItemWidth,
        backgroundColor: 'red',
        borderWidth: 1,
    },
    image: {
        width: StoryListItemWidth,
        height: StoryListItemHeight
    }}
    
)