import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { IDM } from '@typings/db';
import gravatar from 'gravatar';
import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import { Container, Header } from '@pages/DirectMessage/styles';
import axios from 'axios';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: userData } = useSWR<any>(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: myData } = useSWR<any>('/api/users', fetcher);
  const {
    data: chatData,
    mutate: mutateChat,
    revalidate,
  } = useSWR<IDM[]>(`/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`, fetcher);

  const [chat, onChangeChat, setChat] = useInput('');
  const onSubmitForm = useCallback(
    (e: any) => {
      console.log(chat);
      e.preventDefault();
      if (chat?.trim()) {
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, { content: chat })
          .then(() => {
            revalidate();
            setChat('');
          })
          .catch(console.error);
      }
    },
    [chat, revalidate],
  );
  if (!userData || !myData) return null;

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList></ChatList>
      <ChatBox
        chat={chat}
        onSubmitForm={onSubmitForm}
        onChangeChat={onChangeChat}
        placeholder="입력해 주세요"
      ></ChatBox>
    </Container>
  );
};

export default DirectMessage;
