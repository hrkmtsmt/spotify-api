import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { codeState } from '@src/atoms/code';

export const Callback: React.FC = () => {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate('/');
  }, []);

  const setCode = useSetRecoilState(codeState);

  useEffect(() => {
    const url = new URL(window.location.href);
    const _code = url.searchParams.get('code');
    if (_code) {
      setCode(_code);
    }
  }, []);

  return (
    <div>
      <button onClick={onClick}>Back to Top Page</button>
    </div>
  );
};
