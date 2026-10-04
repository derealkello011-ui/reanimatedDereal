import { Href, Link, useTheme } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface RouteLink {
  label: string;
  href: Href;
}

const LINKS: RouteLink[] = [
  { label: 'Animating styles and Props', href: '/screens/AnimatingStylesProps' },
  { label: 'Go to Home', href: '/screens/HomeScreen' },
];

const FOOTER_OFFSET = 16; 

const TransitionScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[ styles.container, { backgroundColor: colors.background } ]}
      edges={[ 'top', 'left', 'right' ]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[ styles.headerContainer, { borderColor: colors.border } ]}>
          <Text style={[ styles.header, { color: colors.text } ]}>LINKS</Text>
          <Text style={[ styles.subtext, { color: colors.text } ]}>
            A list of links for different views and features all created by @d3r3alk3ll0
          </Text>
        </View>

        <View
          style={[
            styles.linkContainer,
            { borderColor: colors.border, backgroundColor: colors.card },
          ]}
        >
          {LINKS.map( ( { label, href } ) => (
            <Link
              key={label}
              href={href}
              style={[ styles.link, { color: colors.primary } ]}
            >
              {label}
            </Link>
          ) )}
        </View>
      </ScrollView>

      {/* Outside the ScrollView so it stays pinned just above the tab bar */}
      <View style={styles.footer}>
        <Text style={[ styles.footerText, { color: colors.text } ]}>
          powered by @d3r3alk3ll0
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TransitionScreen;

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  content: {
    gap: 20,
    paddingVertical: 10,
  },
  headerContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtext: {
    opacity: 0.6,
    fontSize: 15,
    padding: 5,
  },
  linkContainer: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
  },
  link: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: FOOTER_OFFSET,
  },
  footerText: {
    opacity: 0.6,
    fontSize: 13,
    textAlign: 'center',
  },
} );
