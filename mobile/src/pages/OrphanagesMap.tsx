import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

import MapMarker from '../images/map-marker.png';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function OrphanagesMap() {

  const navigation = useNavigation();

  function handleNavigateToOrphanageDetails(){
    navigation.navigate('OrphanageDetails');
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -26.2640287,
          longitude:-48.7994574,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
      }}>
        <Marker 
          icon={MapMarker}
          calloutAnchor={{
            x: 3.3,
            y: 0.98,
          }}
          coordinate={{
              latitude: -26.2640287,
              longitude:-48.7994574,
          }}
          >
            <Callout tooltip={true} onPress={handleNavigateToOrphanageDetails}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>Lar das meninas</Text>
              </View>
            </Callout>
          </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 Orfanatos encontrados</Text>

          <TouchableOpacity 
            style={styles.createOrphanageButton}
            onPress={() =>{}}>
              <Feather name="plus" size={20} color="#fff" />
            </TouchableOpacity>

      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer:{
    width:160,
    height:46,
    paddingHorizontal: 16,
    backgroundColor:'rgba(255,255,255, .8)',
    borderRadius:16,
    justifyContent:'center',
  },

  calloutText:{
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
    fontSize: 14,
  },

  footer:{
    position: 'absolute',
    left:24,
    right:24,
    bottom: 32,
    backgroundColor: '#fff',
    borderRadius:20,
    height:56,
    paddingLeft:24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },

  footerText:{
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },

  createOrphanageButton:{
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});