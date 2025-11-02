import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './styles/location-create-news.style.ts';
import {IPropsLocationCreateNews} from './types/location.types.ts';
import {api} from '@api/api.ts';
import Offset from '../../../ui/Offset/Offset.tsx';
import {
  ICity,
  ICountries,
  IDataCountries,
  IRegion,
} from 'src/screens/Opportunities/interface/opportunities.interface.ts';
import DropDownPicker from 'react-native-dropdown-picker';
import Error from 'src/ui/Errors/Error.tsx';
import { color } from 'src/utils/colors.ts';
import { icon } from 'src/assets/icons.ts';

const getDataCountries = async function name({
  endpoint,
  params,
  callback,
}: {
  endpoint: string;
  params: any;
  callback: (a: any) => void;
}) {
  try {
    const res: ICountries = await api.fetchGetCountries(endpoint, params);
    callback(res.data);
  } catch (error) {
    const err = new Error('Error request get country');
    console.error(err);
  }
};

const LocationCreateNews: React.FC<IPropsLocationCreateNews> = ({
  title,
  iconLeftText,
  onChange,
  setIsOpenDropdown,
  errors,
}: IPropsLocationCreateNews) => {
  const [searchTextCity, setSearchTextCity] = useState('');
  const [searchTextRegion, setSearchTextRegion] = useState('');
  const [selectedValueCountry, setSelectedValueCountry] = React.useState('');
  const [selectedValueCity, setSelectedValueCity] = React.useState('');
  const [selectedValueRegion, setSelectedValueRegion] = React.useState('');
  const [countries, setCountries] = React.useState<IDataCountries[]>([]);
  const [regions, setRegions] = React.useState<IRegion[]>([]);
  const [cities, setCities] = React.useState<ICity[]>([]);
  const [openCountry, setOpenCountry] = React.useState(false);
  const [openRegion, setOpenRegion] = React.useState(false);
  const [openCity, setOpenCity] = React.useState(false);

  const fetchDataFromAPIAddress = useCallback(
    async (query: string) => {
      try {
        getDataCountries({
          endpoint: '/api/v1/locations/addresses',
          params: {
            region_id: selectedValueRegion,
            address: query,
          },
          callback: setCities,
        });
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    },
    [selectedValueRegion],
  );
  // 🧠 Debounced API call
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTextCity.length > 1) {
        fetchDataFromAPIAddress(searchTextCity);
      }
    }, 300); // ⏱ задержка 300 мс

    return () => clearTimeout(delayDebounceFn);
  }, [searchTextCity]);

  const fetchDataFromAPIRegion = useCallback(
    async (query: string) => {
      try {
        getDataCountries({
          endpoint: '/api/v1/locations/regions',
          params: {
            country_id: selectedValueCountry,
            address: query,
          },
          callback: setRegions,
        });
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    },
    [selectedValueCountry],
  );
  // 🧠 Debounced API call
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTextRegion.length > 1) {
        fetchDataFromAPIRegion(searchTextRegion);
      }
    }, 300); // ⏱ задержка 300 мс

    return () => clearTimeout(delayDebounceFn);
  }, [searchTextRegion, fetchDataFromAPIRegion]);

  useEffect(() => {
    getDataCountries({
      endpoint: '/api/v1/locations/countries',
      params: {},
      callback: setCountries,
    });
  }, []);

  useEffect(() => {
    getDataCountries({
      endpoint: '/api/v1/locations/regions',
      params: {
        country_id: selectedValueCountry,
      },
      callback: setRegions,
    });
  }, [selectedValueCountry]);

  const onChangeCountry = (c: string) => {
    setSelectedValueCountry(c);
  };

  const onChangeCity = (c: string) => {
    setSelectedValueCity(c);
    onChange(c);
  };

  const onChangeRegion = (c: string) => {
    setSelectedValueRegion(c);
  };

  const serializerCountries = function (l: IDataCountries[]) {
    return l.map((c: IDataCountries) => ({
      label: c.name.UA,
      value: c.id,
    }));
  };

  const serializerCity = function (l: ICity[]) {
    return l.map((c: ICity) => ({
      label: c.name.UA,
      value: c.id,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        {iconLeftText && (
          <Image source={iconLeftText} alt="icon" style={styles.iconLeftText} />
        )}
        <Text style={styles.label}>{title}</Text>
      </View>
      <Offset mt={15} />
      <View style={{...styles.inputContainer, zIndex: 10}}>
        <DropDownPicker
          open={openCountry}
          setOpen={setOpenCountry}
          value={selectedValueCountry}
          setValue={(text: any) => onChangeCountry(text())}
          items={serializerCountries(countries)}
          placeholder="Виберіть країну"
          placeholderStyle={{color: '#B0B0B0'}}
          style={[
            {...styles.picker, zIndex: 10, minHeight: 35},
            {borderColor: errors.address_id ? color.error : '#8F8F92'},
          ]}
          dropDownContainerStyle={[styles.dropdownContainer, {zIndex: 10}]}
          textStyle={{color: '#91939F'}}
          onOpen={() => setIsOpenDropdown(true)}
          onClose={() => setIsOpenDropdown(false)}
        />
        <Text style={styles.result}>{selectedValueCountry}</Text>
        <Error errorMessage={errors.address_id} />
        {errors.address_id && (
          <Image
            source={icon.alertCircle}
            style={{
              position: 'absolute',
              width: 20,
              height: 20,
              right: 5,
            }}
          />
        )}
      </View>
      <Offset mt={15} />
      <View style={{...styles.inputContainer, zIndex: 9}}>
        <DropDownPicker
          open={openRegion}
          disabled={!selectedValueCountry}
          setOpen={setOpenRegion}
          value={selectedValueRegion}
          setValue={(text: any) => onChangeRegion(text())}
          items={serializerCity(regions)}
          style={[
            {...styles.picker, zIndex: 11, minHeight: 35},
            {borderColor: errors.address_id ? color.error : '#8F8F92'},
          ]}
          placeholder="Виберіть область "
          placeholderStyle={{color: '#B0B0B0'}}
          dropDownContainerStyle={styles.dropdownContainer}
          searchable={true}
          onChangeSearchText={text => setSearchTextRegion(text)} // <== ВАЖНО
          listMode="SCROLLVIEW" // <-- рекомендовано для динамической подгрузки
          searchPlaceholder="Пошук..."
          searchTextInputStyle={{color: '#91939F'}} // опционально
          textStyle={{color: '#91939F'}}
          onOpen={() => setIsOpenDropdown(true)}
          onClose={() => setIsOpenDropdown(false)}
          ListEmptyComponent={() => (
            <Text style={{color: '#91939F', padding: 10}}>
              Нічого не знайдено
            </Text>
          )}
        />
        <Text style={styles.result}>{selectedValueRegion}</Text>
        <Error errorMessage={errors.address_id} />
        {errors.address_id && (
          <Image
            source={icon.alertCircle}
            style={{
              position: 'absolute',
              width: 20,
              height: 20,
              right: 5,
            }}
          />
        )}
      </View>
      {/* address */}
      <Offset mt={15} />
      <View style={{...styles.inputContainer, zIndex: 8}}>
        <DropDownPicker
          open={openCity}
          disabled={!selectedValueRegion}
          setOpen={setOpenCity}
          value={selectedValueCity}
          setValue={(text: any) => onChangeCity(text())}
          items={serializerCity(cities)}
          placeholder="Виберіть місто"
          style={[
            {...styles.picker, zIndex: 12, minHeight: 35},
            {borderColor: errors.address_id ? color.error : '#8F8F92'},
          ]}
          placeholderStyle={{color: '#B0B0B0'}}
          dropDownContainerStyle={styles.dropdownContainer}
          searchable={true}
          onChangeSearchText={text => setSearchTextCity(text)} // <== ВАЖНО
          listMode="SCROLLVIEW" // <-- рекомендовано для динамической подгрузки
          searchPlaceholder="Пошук..."
          searchTextInputStyle={{color: '#91939F'}} // опционально
          textStyle={{color: '#91939F'}}
          onOpen={() => setIsOpenDropdown(true)}
          onClose={() => setIsOpenDropdown(false)}
          ListEmptyComponent={() => (
            <Text style={{color: '#91939F', padding: 10}}>
              Нічого не знайдено
            </Text>
          )}
          // Отключаем автоматический фильтр:
        />
        <Text style={styles.result}>{selectedValueCity}</Text>
        <Error errorMessage={errors.address_id} />
        {errors.address_id && (
          <Image
            source={icon.alertCircle}
            style={{
              position: 'absolute',
              width: 20,
              height: 20,
              right: 5,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default LocationCreateNews;
