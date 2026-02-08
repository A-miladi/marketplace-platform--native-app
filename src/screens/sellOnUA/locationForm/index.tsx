import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {API_URL} from '@/constants/api';
import {ResponseType} from '@/types';
import {AdvertisementFormData, LocationLatLng} from '@/types/advertisement';
import {ICity, ICountry} from '@/types/general';
import Dropdown from '@/screens/components/common/dropDown';
import {useFetch} from '@/hooks';

interface LocationFormProps {
  location: LocationLatLng | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationLatLng | null>>;
  errors: any;
  setValue: (name: keyof AdvertisementFormData, value: any) => void;
  trigger: (name: keyof AdvertisementFormData) => Promise<boolean>;
  countryCode?: string;
  watch: (name: keyof AdvertisementFormData) => any;
}

const LocationForm = ({
  location,
  setLocation,
  errors,
  setValue,
  trigger,
  countryCode,
  watch,
}: LocationFormProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const mapRef = useRef<any>(null);

  const {data: countryList} = useFetch<ResponseType<ICountry[]>>(
    `${API_URL.General.country}`,
  );
  const {data: cityList} = useFetch<ResponseType<ICity[]>>(
    `${API_URL.General.city}`,
  );

  const countryOptions =
    countryList?.data.map(country => ({
      value: country.code,
      label: country.name,
    })) || [];

  const cityOptions =
    cityList?.data
      .filter(city => city.name)
      .map(city => ({
        value: city.id.toString(),
        label: city.name,
      })) || [];

  const fetchCityCoordinates = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`,
      );
      const data = await response.json();
      if (data && data[0]) {
        const {lat, lon} = data[0];
        const coordinates = {lat: parseFloat(lat), lng: parseFloat(lon)};

        // Center map on the new location
        if (mapRef.current) {
          mapRef.current.setMapCenter({
            lat: coordinates.lat,
            lng: coordinates.lng,
          });
        }

        return coordinates;
      }
      return null;
    } catch (error) {
      console.error('Error fetching city coordinates:', error);
      return null;
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
      );
      const data = await response.json();
      if (data && data.address) {
        const {country, city} = data.address;

        const countryOption = countryOptions.find(
          option => option.label === country,
        );
        if (countryOption) {
          setSelectedCountry(countryOption.value);
        }

        const cityOption = cityOptions.find(option => option.label === city);
        if (cityOption) {
          setSelectedCity(cityOption.value);
          setValue('city_id', Number(cityOption.value));
        }
      }
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
    }
  };

  useEffect(() => {
    if (countryCode) setSelectedCountry(countryCode);
  }, [countryCode]);

  useEffect(() => {
    if (cityList?.data) {
      const cityId = watch('city_id');
      if (cityId && !selectedCity) {
        setSelectedCity(cityId.toString());
      }
    }
  }, [cityList, watch, selectedCity]);

  useEffect(() => {
    if (selectedCity) {
      const selectedCityData = cityList?.data.find(
        city => city.id.toString() === selectedCity,
      );
      if (selectedCityData && !location) {
        fetchCityCoordinates(selectedCityData.name).then(coordinates => {
          if (coordinates) setLocation(coordinates);
        });
      }
    }
  }, [selectedCity, cityList, setLocation, location]);

  useEffect(() => {
    if (location) {
      reverseGeocode(location.lat, location.lng);
      if (mapRef.current) {
        mapRef.current.setMapCenter({
          lat: location.lat,
          lng: location.lng,
        });
      }
    }
  }, [location]);

  const handleCountryChange = (value: string | string[]) => {
    const countryValue = Array.isArray(value) ? value[0] : value;
    setSelectedCountry(countryValue);
    setSelectedCity('');
  };

  const handleCityChange = async (value: string | string[]) => {
    const cityValue = Array.isArray(value) ? value[0] : value;
    setSelectedCity(cityValue);
    setValue('city_id', Number(cityValue));
    await trigger('city_id');

    const selectedCityData = cityList?.data.find(
      city => city.id.toString() === cityValue,
    );

    if (selectedCityData) {
      const coordinates = await fetchCityCoordinates(selectedCityData.name);
      if (coordinates) setLocation(coordinates);
    }
  };

  const handleMapPress = (event: any) => {
    const {lat, lng} = event;
    setLocation({lat, lng});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location</Text>

      <View style={styles.row}>
        <Dropdown
          selectedValue={selectedCountry}
          onSelect={handleCountryChange}
          options={countryOptions}
          placeholder="Select country"
          error={!!errors?.city_id && !selectedCity}
          helperText={
            errors?.city_id && !selectedCity ? 'Country is required' : undefined
          }
        />

        {selectedCountry && (
          <Dropdown
            selectedValue={selectedCity}
            onSelect={handleCityChange}
            options={cityOptions}
            placeholder="Select city"
            error={!!errors?.city_id}
            helperText={errors?.city_id?.message}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    gap: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 400,
  },
  row: {
    gap: 15,
  },
});

export default LocationForm;
