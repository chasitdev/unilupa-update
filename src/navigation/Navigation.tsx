import React, {useState} from 'react';
import useAuth from '../hooks/auth/useAuth';
import {mainTabs, menuList} from 'src/types/menu-tab.enum';
import NavigationAuthorization from 'src/navigation/Authorization/NavigationAuthorization';
import NavigationMainMenu from 'src/navigation/NavigationMainMenu';
import {api} from 'src/api/api';

const Navigation = () => {
  const {user} = useAuth();
  const [activeTab, setActiveTab] = useState<menuList>(mainTabs.MAIN);
  console.log({user});
  if (!user) {
    return <NavigationAuthorization />;
  } else {
    try {
      const email = user.email;
      const phone = user.phone;
      const id = user.id;
      console.log({email, phone, id});
      const saveUserNewsBase = async () => {
        const res = await api.fetchRegitUserNews('/api/v1/users/', {
          personal_id: id,
          email: email,
          phone_number: phone,
        });
        console.log(res);
      };
      saveUserNewsBase();
    } catch (error) {
      console.error({error});
    }
  }

  return (
    <NavigationMainMenu activeTab={activeTab} handleChangeTabs={setActiveTab} />
  );
};

export default Navigation;
