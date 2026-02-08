import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

interface Location {
  lat: number;
  lng: number;
}

interface MapWithSearchProps {
  location: Location | null;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
}

const MapWithSearch = ({location, setLocation}: MapWithSearchProps) => {
  const [region, setRegion] = useState({
    latitude: 52.52,
    longitude: 13.405,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Set initial location or user's current location
  useEffect(() => {
    if (location) {
      setRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } else {
      getCurrentLocation();
    }
  }, [location]);

  const getCurrentLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert('Permission to access location was denied');
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setLocation({lat: latitude, lng: longitude});
        },
        error => {
          console.error('Error getting location:', error);
          Alert.alert('Error', 'Could not get current location');
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const result = await Geolocation.requestAuthorization('whenInUse');
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  };

  const handleMapPress = async (e: any) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;

    try {
      // Reverse geocoding using OpenStreetMap Nominatim
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      );
      const data = response.data;

      if (data && data.address) {
        setLocation({lat: latitude, lng: longitude});
      } else {
        setLocation({lat: latitude, lng: longitude});
      }
    } catch (error) {
      Alert.alert('Error', 'Error in indicating location');
      setLocation({lat: latitude, lng: longitude});
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        onPress={handleMapPress}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomControlEnabled={true}
        zoomEnabled={true}
        scrollEnabled={true}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.lat,
              longitude: location.lng,
            }}>
            {/* <MaterialIcons 
              name="location-pin" 
              size={32} 
              color="#3b82f6" 
            /> */}
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapWithSearch;
