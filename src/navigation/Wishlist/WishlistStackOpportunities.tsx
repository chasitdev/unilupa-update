import {WishlistPath} from 'src/types/screens.type';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import OpportunitiesWishlist from 'src/screens/Wishlist/OpportunitiesWishlist';
import {OpportunitiesDetail} from 'src/screens/Opportunities/OpportunitiesDetail';

interface Props {}

const Stack = createStackNavigator();

const WishlistStackOpportunities: React.FC<Props> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={WishlistPath.WISHLIST_NEWS}
        component={OpportunitiesWishlist}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={WishlistPath.WISHLIST_NEWS_DETAIL}
        component={OpportunitiesDetail}
        initialParams={{prevPage: WishlistPath.WISHLIST_NEWS}}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default WishlistStackOpportunities;
