import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CurrencyScreen = () => {
  const [currencyData, setCurrencyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  const fetchCurrencyData = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      const tryRate = data.rates.TRY;
      const convertedData = {
        ...data,
        rates: Object.keys(data.rates).reduce((acc, key) => {
          acc[key] = (data.rates[key] * tryRate).toFixed(2); // USD'yi TRY'ye çevir
          return acc;
        }, {}),
      };
      setCurrencyData(convertedData);
      setLoading(false);
    } catch (error) {
      console.error('Veri alınırken hata oluştu:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  if (!currencyData) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>Veri yüklenemedi.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Döviz Kurları (TRY)</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {Object.keys(currencyData.rates).map((currencyCode) => (
          <LinearGradient
            key={currencyCode}
            colors={['#ff7e5f', '#feb47b']}
            style={styles.currencyItem}
          >
            <Text style={styles.currencyText}>{currencyCode}: {currencyData.rates[currencyCode]}</Text>
          </LinearGradient>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#000000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#000000',
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'stretch',
  },
  currencyItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  currencyText: {
    fontSize: 16,
    color: '#000000',
  },
});

export default CurrencyScreen;
