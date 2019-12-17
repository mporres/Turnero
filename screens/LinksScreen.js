import React from 'react';
import { ScrollView, StyleSheet,View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function LinksScreen() {
  return (

    <ScrollView style={styles.container1}>
      <ExpoLinksView />  
    </ScrollView>

  );
}

LinksScreen.navigationOptions = {
  title: 'Contacto ',
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
