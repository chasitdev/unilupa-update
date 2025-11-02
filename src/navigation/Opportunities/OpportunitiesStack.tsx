import {StackScreenBottomMenu} from 'src/types/screens.type';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import OpportunitiesMain from 'src/screens/Opportunities/OpportunitiesMain';
import {OpportunitiesDetail} from 'src/screens/Opportunities/OpportunitiesDetail';
import CustomOpportunities from 'src/screens/Opportunities/CustomOpportunities';

const Stack = createStackNavigator();

const OpportunitiesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={StackScreenBottomMenu.OpportunitiesMain}
        component={OpportunitiesMain}
        options={{
          headerShown: false,
        }}
      />
      {/* show derail news */}
      <Stack.Screen
        name={StackScreenBottomMenu.OpportunitiesDetail}
        component={OpportunitiesDetail}
        options={{
          headerShown: false,
        }}
      />
      {/* add custom news */}
      <Stack.Screen
        name={StackScreenBottomMenu.OpportunitiesAddedUser}
        component={CustomOpportunities}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default OpportunitiesStack;
