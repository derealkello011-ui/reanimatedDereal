import { useTheme } from 'expo-router';
import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ContainerProps {
    children: ReactNode,
    title: string,
    description: string,
 }

const STAGE_HEIGHT = 300;


const ConfigContainer = ( { title, children, description} : ContainerProps) => {
    const { colors } = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.card}]}>
          <View style={ styles.info}>
              <Text style={[styles.infoHeader, {color: colors.text}]}>{title}</Text>
              <Text style={[ styles.infoDescription, { color: colors.text } ]}>{description}</Text>
              <View style={[styles.stage]}>
                  {children}
              </View>
          </View>
    </View>
  )
}

export default ConfigContainer

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        padding: 10,
        alignContent: 'flex-start',
        borderRadius: 15,
        gap: 20,
    },
    info: {
        justifyContent: 'flex-start',
    },
    infoHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoDescription: {
        fontSize: 15,
        opacity: 0.6,
        fontWeight: '300'
    }, 
    stage: {
        height: STAGE_HEIGHT,
        marginVertical: 16,
        borderRadius: 12,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(128,128,128,0.12)',
    }
})