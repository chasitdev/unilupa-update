import TextTitle from '../../../ui/Text/TextCustom.tsx';
import {
  defaultOpportunitiesFilters,
  IDefaultOpportunitiesFilters,
} from 'src/types/filter.type.ts';
import React from 'react';
import {Modal, SafeAreaView, ScrollView, View} from 'react-native';
import {styles} from './styles/filter.styles.ts';
import AgeRate from '../../../ui/Rate/AgeRate/AgeRate.tsx';
import Offset from '../../../ui/Offset/Offset.tsx';
import {
  IClassificationNews,
  ITypesNews,
} from '../../../screens/Opportunities/interface/opportunities.interface.ts';
import TopBarFilterScreen from 'src/components/Filter Screen/TopBarFilterScreen.tsx';
import SexNews from 'src/ui/Filters/SexNews/SexNews.tsx';
import LocationFilterNews from 'src/components/locations/LocationFilterNews/LocationFilterNews.tsx';
import FilterOpportunitiesView from 'src/ui/Filters/FilterList/FilterOpportunitiesView.tsx';
import FindButton from 'src/components/Filter Screen/FindButton.tsx';
import FilterOpportunitiesClasifView from 'src/ui/Filters/FilterList/FilterOpportunitiesClasifView.tsx';

interface Props {
  open: boolean;
  onClose: () => void;
  handleApplyFilter: (filter: IDefaultOpportunitiesFilters) => void;
  typesNews: ITypesNews[];
  setFilter: (filter: IDefaultOpportunitiesFilters) => void;
  filter: IDefaultOpportunitiesFilters;
  classificationsNews: IClassificationNews[];
}

const FilterOpportunatiesModalScreen: React.FC<Props> = props => {
  const resetFilters = () => {
    props.setFilter({...defaultOpportunitiesFilters});
  };
  return (
    <Modal visible={props.open} style={styles.container} animationType="fade">
      <SafeAreaView
        style={{
          backgroundColor: 'black',
          flex: 1,
        }}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 50,
          }}>
          <View style={styles.top}>
            <TopBarFilterScreen
              onBackPress={props.onClose}
              onResetFilters={resetFilters}
              title={'Фільтр News'}
            />
          </View>
          <Offset mt={20} />
          {/* date
          <DateRate 
            title={'Дата публікації'}
            onChangeFilter={props.setFilter}
            filter={props.filter}
            date={props.filter.date}
            minDate={new Date(new Date().setDate(new Date().getDate() - 30))}
            maxDate={new Date()}
          /> */}
          {/* old age */}
          <AgeRate
            title={'Вік'}
            onChangeFilter={props.setFilter}
            filter={props.filter}
            // minAge={0}
            // maxAge={100}
          />
          {/* sex */}
          <SexNews
            title={'Стать'}
            onChangeFilter={props.setFilter}
            filter={props.filter}
          />
          {/* locations */}
          <LocationFilterNews
            title={'Місце розташування'}
            onChangeFilter={props.setFilter}
            filter={props.filter}
          />

          {/* types and classifications */}
          <View style={{...styles.containerBtnFilters, zIndex: -1}}>
            <View>
              <View style={styles.sortText}>
                <TextTitle
                  fontSize={20}
                  fontWeight="600"
                  lineHeight={24}
                  color="white">
                  Тип новини:
                </TextTitle>
              </View>
              <FilterOpportunitiesView
                filter={props.filter}
                list={props.typesNews}
                onChangeFilter={props.setFilter}
                keys={'type'}
              />
            </View>
            <View>
              <View style={styles.sortText}>
                <TextTitle
                  fontSize={20}
                  fontWeight="600"
                  lineHeight={24}
                  color="white">
                  Классифікація:
                </TextTitle>
              </View>
              <FilterOpportunitiesClasifView
                filter={props.filter}
                list={props.classificationsNews}
                onChangeFilter={props.setFilter}
                keys={'clasif'}
                defaultStartFilterShow={3}
              />
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            bottom: 30,
            width: '100%',
            backgroundColor: 'black',
          }}>
          <FindButton
            onPress={() => {
              props.handleApplyFilter(props.filter);
              props.onClose();
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default FilterOpportunatiesModalScreen;
