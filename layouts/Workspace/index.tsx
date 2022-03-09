import React, { FC, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import loadable from '@loadable/component';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import gravatar from 'gravatar';
import {
  Header,
  RightMenu,
  ProfileImg,
  WorkspaceWrapper,
  Workspaces,
  Channels,
  Chats,
  WorkspaceName,
  MenuScroll,
} from '@layouts/Workspace/styles';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const navigate = useNavigate();
  const onLogout = useCallback(() => {
    axios.post('http://localhost:3095/api/users/logout', null, { withCredentials: true }).then(() => {
      mutate(false, true);
    });
  }, []);

  if (!data) {
    navigate('/login');
  }
  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg src={gravatar.url(data?.email, { s: '20px', d: 'retro' })} alt={data?.nickname} />
          </span>
        </RightMenu>
      </Header>

      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>menu scroll</MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="/channel" element={<Channel />} />
            <Route path="/dm" element={<DirectMessage />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
      {children}
    </div>
  );
};
export default Workspace;
