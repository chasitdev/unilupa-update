import {IDefaultOpportunitiesFilters} from 'src/types/filter.type';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  IClassificationNews,
  ITypesNews,
} from 'src/screens/Opportunities/interface/opportunities.interface';
import CustomTimeButton from 'src/components/Filter Screen/TimeButton';

interface Props {
  filter: IDefaultOpportunitiesFilters;
  list: any;
  onChangeFilter: ({}: IDefaultOpportunitiesFilters) => void;
  keys: string;
  defaultStartFilterShow?: number;
}

const FilterOpportunitiesView: React.FC<Props> = ({
  filter,
  keys,
  list,
  onChangeFilter,
  defaultStartFilterShow = 9,
}: Props) => {
  const [listFilter, setListFilter] = useState<
    ITypesNews[] | IClassificationNews[]
  >(list.slice(0, defaultStartFilterShow));
  const showMore = () => {
    setListFilter(list);
  };
  return (
    <View style={styles.box}>
      <ScrollView
        style={{
          marginLeft: 16,
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        // horizontal
      >
        {listFilter.length &&
          listFilter.map((f, i) => {
            return (
              <CustomTimeButton
                key={i + '_' + keys}
                title={f.name}
                onPress={() =>
                  onChangeFilter({
                    ...filter,
                    [keys]: filter[keys].includes(f.name)
                      ? [...filter[keys].filter((el: string) => el !== f.name)]
                      : [...filter[keys], f.name],
                  })
                }
                isSelected={filter[keys].includes(f.name) ? true : false}
              />
            );
          })}
      </ScrollView>
      {list &&
        list.length > defaultStartFilterShow &&
        list.length !== listFilter.length && (
          <TouchableOpacity style={styles.showMoreBtn} onPress={showMore}>
            <Text style={styles.showMoreText}>Більше</Text>
          </TouchableOpacity>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    marginBottom: 60,
  },
  container: {
    gap: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  showMoreBtn: {
    backgroundColor: '#0E46F1',
    marginTop: 35,
    flex: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,

    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showMoreText: {
    color: '#ffffff',
  },
});

export default FilterOpportunitiesView;
