import React, {useCallback, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles/location-filter-news.style.ts';
import {IPropsLocationFilterNews} from './types/location.types.ts';
import {api} from '@api/api.ts';
import Offset from '../../../ui/Offset/Offset.tsx';
import {
  ICity,
  ICountries,
  IDataCountries,
  IRegion,
} from 'src/screens/Opportunities/interface/opportunities.interface.ts';
import DropDownPicker from 'react-native-dropdown-picker';

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
    console.log({res: res.data});
    callback(res.data);
  } catch (error) {
    const err = new Error('Error request get country');
    console.error(err);
  }
};

const LocationFilterNews: React.FC<IPropsLocationFilterNews> = ({
  title,
  onChangeFilter,
  filter,
}: IPropsLocationFilterNews) => {
  const [searchText, setSearchText] = useState('');
  const [selectedValueCountry, setSelectedValueCountry] = React.useState('');
  const [selectedValueCity, setSelectedValueCity] = React.useState('');
  const [selectedValueRegion, setSelectedValueRegion] = React.useState('');
  const [countries, setCountries] = React.useState<IDataCountries[]>([]);
  const [regions, setRegions] = React.useState<IRegion[]>([]);
  const [cities, setCities] = React.useState<ICity[]>([]);
  const [openCountry, setOpenCountry] = React.useState(false);
  const [openRegion, setOpenRegion] = React.useState(false);
  const [openCity, setOpenCity] = React.useState(false);

  const fetchDataFromAPI = useCallback(
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
      if (searchText.length > 1) {
        fetchDataFromAPI(searchText);
      }
    }, 300); // ⏱ задержка 300 мс

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, fetchDataFromAPI]);

  useEffect(() => {
    getDataCountries({
      endpoint: '/api/v1/locations/countries',
      params: {},
      callback: setCountries,
    });
  }, []);

  useEffect(() => {
    console.log(selectedValueCountry);
    getDataCountries({
      endpoint: '/api/v1/locations/regions',
      params: {
        country_id: selectedValueCountry,
      },
      callback: setRegions,
    });
  }, [selectedValueCountry]);

  // useEffect(() => {
  //   console.log(selectedValueRegion);
  //   getDataCountries({
  //     endpoint: '/api/v1/locations/addresses',
  //     params: {
  //       region_id: selectedValueRegion,
  //     },
  //     callback: setCities,
  //   });
  // }, [selectedValueRegion]);

  const onChangeCountry = (c: string) => {
    setSelectedValueCountry(c);
    onChangeFilter({
      ...filter,
      country: c,
    });
  };

  const onChangeCity = (c: string) => {
    setSelectedValueCity(c);
    onChangeFilter({
      ...filter,
      city: c,
    });
  };

  const onChangeRegion = (c: string) => {
    setSelectedValueRegion(c);
    onChangeFilter({
      ...filter,
      region: c,
    });
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
      <Text style={styles.label}>{title}</Text>
      <View style={{...styles.inputContainer, zIndex: 10}}>
        <DropDownPicker
          open={openCountry}
          setOpen={setOpenCountry}
          value={selectedValueCountry}
          setValue={(text: any) => onChangeCountry(text())}
          items={serializerCountries(countries)}
          placeholder="Виберіть країну"
          // placeholderStyle={{color: '#B0B0B0'}}
          style={{...styles.picker, zIndex: 10}}
          dropDownContainerStyle={styles.dropdownContainer}
        />
        <Text style={styles.result}>{selectedValueCountry}</Text>
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
          placeholder="Виберіть область "
          // placeholderStyle={{color: '#B0B0B0'}}
          style={{...styles.picker, zIndex: 11}}
          dropDownContainerStyle={styles.dropdownContainer}
        />
        <Text style={styles.result}>{selectedValueRegion}</Text>
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
          searchable={true}
          onChangeSearchText={text => setSearchText(text)} // <== ВАЖНО
          items={serializerCity(cities)}
          placeholder="Виберіть місто"
          style={{...styles.picker, zIndex: 12}}
          dropDownContainerStyle={styles.dropdownContainer}
          listMode="SCROLLVIEW" // <-- рекомендовано для динамической подгрузки
          searchPlaceholder="Пошук..."
          searchTextInputStyle={{color: '#000'}} // опционально
          ListEmptyComponent={() => (
            <Text style={{color: '#91939F', padding: 10}}>
              Нічого не знайдено
            </Text>
          )}
          // Отключаем автоматический фильтр:
        />
        <Text style={styles.result}>{selectedValueCity}</Text>
      </View>
    </View>
  );
};

export default LocationFilterNews;
