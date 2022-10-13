import React, { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { AuthorizationButton } from '@src/components/RequestUserAuthorization';
import { refreshTokenPostResponseState } from '@src/atoms/refreshTokenPostResponse';

const endpoints = [
  {
    id: 'albums',
    name: 'Albums'
  },
  {
    id: 'artists',
    name: 'Artists'
  },
  {
    id: 'tracks',
    name: 'Tracks'
  },
  {
    id: 'genres',
    name: 'Genres'
  }
];

export const Index: React.FC = () => {
  const refreshTokenPostResponse = useRecoilValue(
    refreshTokenPostResponseState
  );

  const [someSpotifyId, setSomeSpotifyId] = useState('');

  const onChangeSomeSpotifyId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSomeSpotifyId(e.target.value);
    },
    [someSpotifyId]
  );

  const [endpoint, setEndpoint] = useState<string>('albums');

  const onChangeEndpoint = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setEndpoint(e.target.value);
    },
    [endpoint]
  );

  const [spotifyData, setSpotifyData] = useState<any>();

  const onClickRequest = useCallback(async () => {
    const { data } = await axios.get<any>(
      `${import.meta.env.VITE_SPOTIFY_URL}/${endpoint}/${someSpotifyId}`,
      {
        headers: {
          Authorization: `Bearer ${refreshTokenPostResponse.access_token}`
        }
      }
    );
    setSpotifyData(data);
  }, [someSpotifyId, endpoint]);

  if (!refreshTokenPostResponse.access_token) {
    return (
      <div>
        <AuthorizationButton />
      </div>
    );
  }

  return (
    <div>
      <input
        type='text'
        value={someSpotifyId}
        onChange={onChangeSomeSpotifyId}
      />
      <select value={endpoint} onChange={onChangeEndpoint}>
        {endpoints.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
      </select>
      <button onClick={onClickRequest}>Request</button>
      <div>
        {someSpotifyId} is {spotifyData ? spotifyData.name : '?'}
      </div>
    </div>
  );
};
