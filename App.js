import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import CurrencyScreen from './CurrencyScreen'; // CurrencyScreen dosyasının doğru yolu

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={styles.container}>
    <LinearGradient
      colors={['#ff7e5f', '#feb47b']} // Geçiş yapmak istediğiniz renkleri buraya ekleyin
      style={styles.headerContainer}
    >
      <TouchableOpacity style={styles.menuButton} onPress={() => Alert.alert('Menü butonuna tıkladınız!! ZORT')}>
        <Text style={styles.menuButtonText}>...</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Başlık</Text>
      <Image
        source={{ uri: 'https://purepng.com/public/uploads/large/purepng.com-gold-coinsflatcoinsroundmetalgoldclipart-1421526479508ifey0.png' }} // Logonun URL'sini buraya ekleyin
        style={styles.logo}
      />
    </LinearGradient>
    <View style={styles.contentContainer}>
      <CurrencyScreen />
    </View>
  </View>
);

const AnotherScreen = () => (
  <View style={styles.container}>
    <Text>Another Screen</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Another" component={AnotherScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50, // Cihazın durum çubuğuna göre başlık aşağıda olacak şekilde
    paddingBottom: 10,
    width: '100%',
  },
  menuButton: {
    padding: 10,
  },
  menuButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  logo: {
    width: 30,
    height: 30,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
