import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { apiToken } from '@src/api/token';

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
  const [accessToken, setAccessToken] = useState('');

  const [someSpotifyId, setSomeSpotifyId] = useState('');
  const onChangeSomeSpotifyId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSomeSpotifyId(e.target.value);
    },
    [someSpotifyId]
  );

  const [endpoint, setEndpoint] = useState<string>(endpoints[0].id);
  const onChangeEndpoint = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setEndpoint(e.target.value);
    },
    [endpoint]
  );

  const [spotifyData, setSpotifyData] = useState<any>();
  const onClickRequest = useCallback(async () => {
    const { data } = await axios.get<any>(
      `${import.meta.env.VITE_SPOTIFY_API_URL}/${endpoint}/${someSpotifyId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    setSpotifyData(data);
  }, [someSpotifyId, endpoint]);

  useEffect(() => {
    (async () => {
      const accessTokenPostResponse = await apiToken.postAccessToken();
      if (!accessTokenPostResponse || accessTokenPostResponse instanceof Error)
        return;
      setAccessToken(accessTokenPostResponse.access_token);
    })();
  }, []);

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
