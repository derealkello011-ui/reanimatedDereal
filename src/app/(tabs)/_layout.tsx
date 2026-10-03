import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'

const TabLayout = () => {
    return (
            <Tabs screenOptions={{
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            }}>
                
                    <Tabs.Screen name="index"
                        options={{
                            title: 'Home',
                            headerShown: false,
                            tabBarIcon: ({ color, focused, size }) => <Ionicons name={focused ? 'home-sharp' : 'home-outline'} size={size} color={color} />
                        }}
                    />
                    <Tabs.Screen
                        name="transitions"
                        options={{
                            title: 'Transitions',
                            headerShown: false,
                                tabBarIcon: ({ color, focused, size }) => <Ionicons name={focused ? 'swap-horizontal-sharp' : 'swap-horizontal-outline'} size={size} color={color} />
                        }} />
            </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({})