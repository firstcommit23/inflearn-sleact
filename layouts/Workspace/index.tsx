import React, { FC, useCallback, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar';
import loadable from '@loadable/component';
import fetcher from '@utils/fetcher';
import Menu from '@components/Menu';
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
  ProfileModal,
  LogOutButton,
} from '@layouts/Workspace/styles';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();
  const onLogout = useCallback(() => {
    axios.post('http://localhost:3095/api/users/logout', null, { withCredentials: true }).then(() => {
      mutate(false, true);
    });
  }, []);
  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, [showUserMenu]);
  if (!data) {
    navigate('/login');
  }
  console.log(showUserMenu);
  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(data?.email, { s: '28px', d: 'retro' })} alt={data?.nickname} />
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(data?.email, { s: '36px', d: 'retro' })} alt={data?.nickname} />
                  <div>
                    <span id="profile-name">{data.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>

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
