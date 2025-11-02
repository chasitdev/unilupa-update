import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';
import {ICardOpportunities} from './interface/cardOpportunities.interface';
import {icon} from 'src/assets/icons';

export const CardOpportunities: React.FC<ICardOpportunities> = ({
  item,
  isSaved,
  remove,
  handleAddOrRemoveWishlist,
  handleChangeScreen,
  pathToScreen,
}: ICardOpportunities) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleChangeScreen(pathToScreen, item.id)}>
      <TouchableOpacity
        onPress={() => {
          handleAddOrRemoveWishlist(item.id, item.processed_data.title);
        }}
        style={styles.saveButton}>
        <View>
          <Image
            source={
              remove
                ? icon.unsaveUniversityButton
                : isSaved
                ? icon.savedIcon
                : icon.noSavedIcon
            }
            style={isSaved ? styles.iconSaved : styles.icon}
          />
        </View>
      </TouchableOpacity>
      {item?.processed_data?.media && (
        <Image
          source={{uri: item.processed_data.media[0].url}}
          style={styles.image}
        />
      )}
      {/* <Image source={{ uri: 'https://store.qardio.com/cdn/shop/products/QBX_Shopify_Product_Images_QBX_AW_Side.jpg?v=1702384978&width=576' }} style={styles.image} /> */}
      <View style={styles.textBox}>
        <Text numberOfLines={3} style={styles.title}>
          {item.processed_data.title}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.processed_data.funding}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.processed_data.place_data.country +
            ' ' +
            item.processed_data.place_data.region +
            ' ' +
            item.processed_data.place_data.address}
        </Text>
        <Text numberOfLines={2} style={styles.date}>
          {item.processed_data.date_range?.date_from &&
          item.processed_data.date_range?.date_to
            ? `${item.processed_data.date_range.date_from.slice(
                0,
                10,
              )} - ${item.processed_data.date_range.date_to.slice(0, 10)}`
            : item.processed_data.date_range?.date_from
            ? item.processed_data.date_range.date_from.slice(0, 10)
            : item.processed_data.date_range?.date_to
            ? item.processed_data.date_range.date_to.slice(0, 10)
            : ''}
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Image source={icon.universityArrow} style={styles.arrowIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 14,
    height: 18,
  },
  iconSaved: {
    width: 18,
    height: 22,
  },
  saveButton: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 1,
    borderRadius: 50,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    // Тіні для iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Тіні для Android
    elevation: 5,
  },
  card: {
    flexDirection: 'column',
    marginBottom: 15,
    backgroundColor: '#202026',
    borderRadius: 10,
    elevation: 2,
    overflow: 'hidden',
    padding: 5,
  },
  image: {
    borderRadius: 10,
    width: '100%',
    height: 150,
    backgroundColor: '#202026',
    padding: 5,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  textBox: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  description: {
    color: '#91939F',
    marginBottom: 12,
  },
  date: {
    color: '#ffffff',
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
  button: {
    backgroundColor: '#0E46F1',
    padding: 3,
    borderRadius: 50,
    margin: 5,
    position: 'absolute',
    right: 10,
    bottom: 7,
  },
});
