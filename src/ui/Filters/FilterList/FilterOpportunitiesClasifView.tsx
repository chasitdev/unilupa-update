import {IDefaultOpportunitiesFilters} from 'src/types/filter.type';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {IClassificationNews} from 'src/screens/Opportunities/interface/opportunities.interface';
import DropdownSection from 'src/ui/DropDownMenu/DropDownSection';

interface Props {
  filter: any;
  list: IClassificationNews[];
  onChangeFilter: ({}: IDefaultOpportunitiesFilters) => void;
  keys: string;
  defaultStartFilterShow?: number;
}

type GroupedItem = {
  group: string;
  sub_group: {
    _id: string;
    name: string;
  }[];
};

const FilterOpportunitiesClasifView: React.FC<Props> = ({
  filter,
  keys,
  list,
  onChangeFilter,
  defaultStartFilterShow = 9,
}: Props) => {
  const [listFilter, setListFilter] = useState<IClassificationNews[] | null>(
    null,
  );
  const serializeGroupedData = (data: IClassificationNews[]): GroupedItem[] => {
    const grouped = {};

    data.forEach(item => {
      const groupName = item.group.name;

      if (!grouped[groupName]) {
        grouped[groupName] = [];
      }

      grouped[groupName].push({
        _id: item._id,
        name: item.name,
      });
    });

    // Преобразуем в нужный формат:
    return Object.keys(grouped).map(group => ({
      group,
      sub_group: grouped[group],
    }));
  };

  useEffect(() => {
    setListFilter(list.slice(0, defaultStartFilterShow));
  }, [list, defaultStartFilterShow]);
  // console.log(JSON.stringify(serializeGroupedData(list), null, 2));
  const showMore = () => {
    setListFilter(list);
  };

  const handleSelectItem = (id: string) => {
    onChangeFilter(state => {
      const selected = state[keys] as string[];

      if (selected.includes(id)) {
        return {
          ...state,
          [keys]: selected.filter(item => item !== id), // удалить
        };
      } else {
        return {
          ...state,
          [keys]: [...selected, id], // добавить
        };
      }
    });
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
        {listFilter &&
          listFilter.length > 0 &&
          serializeGroupedData(listFilter).map((f: GroupedItem, i: number) => (
            <DropdownSection
              key={f.group + i}
              title={f.group}
              items={f.sub_group}
              onPress={handleSelectItem}
              selectItem={filter[keys]}
            />
          ))}
      </ScrollView>
      {list &&
        listFilter &&
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

export default FilterOpportunitiesClasifView;
