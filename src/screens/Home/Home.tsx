import {useNetInfo} from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {Checklist} from '../../infra/interfaces/interfaces';
import {FlatList} from 'react-native';

import {
  createItemOfflineDB,
  getItemsOfflineDB,
} from '../../infra/offlineDatabase/repository/Repository';

import {
  ButtonPrimary,
  Container,
  ContainerLogo,
  Loading,
  Title,
  Picture,
  ContainerFlatList,
} from './styles';

import logo from '../../assets/bovIcon.png';

import {getChecklistsRemoteDB} from '../../infra/remoteDatabase/repository/Repository';
import RenderItem from './components/renderItem';
import {syncAllDataBases} from '../../infra/remoteDatabase/useCases/useCases';

export default function Home() {
  const isOnline = useNetInfo().isConnected;

  const [list, setList] = useState<Checklist[]>([]);

  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   if (isOnline === true) {
  //     syncAllDataBases(list);
  //     console.log('teste dentro');
  //   }
  // }, [isOnline]);

  useEffect(() => {
    async function init() {
      setLoading(true);

      try {
        //arrumar tipagem

        const checklists = await getItemsOfflineDB();
        setList(checklists.toJSON());
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    init();
  }, []);

  return (
    <Container safeAreaTop>
      <ContainerLogo>
        <Picture source={logo} />
        <Title>BovControl</Title>
        {/* <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3788/3788328.png',
          }}
          alt="Alternate Text"
          size="xl"
        /> */}
      </ContainerLogo>
      <ContainerFlatList>
        {loading ? (
          <Loading size="lg" color="black" />
        ) : (
          <FlatList
            data={list}
            renderItem={({item}) => <RenderItem item={item} />}
            keyExtractor={item => String(item._id)}
          />
        )}
      </ContainerFlatList>
      {/* {loading ? (
        <Loading size="lg" color="black" />
      ) : (
        <FlatList
          data={list}
          renderItem={({item}) => <RenderItem item={item} />}
          keyExtractor={item => String(item._id)}
        />
      )} */}

      {/* <ButtonPrimary onPress={async () => syncAllDataBases(list)}>
        buscar items
      </ButtonPrimary> */}
      {/* <ButtonPrimary
        onPress={async () =>
          createItemOfflineDB([
            {
              _id: '11',
              type: 'teste',
              amount_of_milk_produced: 200,
              number_of_cows_head: 200,
              had_supervision: true,
              farmer: {
                name: 'teste',
                city: 'teste',
              },
              from: {
                name: 'teste',
              },
              to: {
                name: 'teste',
              },
              location: {
                latitude: 23,
                longitude: 23,
              },
              created_at: '2022-02-01T10:10:21.748Z',
              updated_at: '2022-02-01T10:10:21.748Z',
            },
          ])
        }>
        Criar item
      </ButtonPrimary> */}
    </Container>
  );
}
