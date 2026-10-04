import { Ionicons } from '@expo/vector-icons';
import { Tabs, useTheme } from 'expo-router';

const TabLayout = () => {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='transitions'
        options={{
          title: 'Transitions',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? 'swap-horizontal-sharp' : 'swap-horizontal-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='ShopScreen'
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? 'cart-sharp' : 'cart-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
