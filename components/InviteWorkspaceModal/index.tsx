import React, { VFC, useCallback } from 'react';
import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import axios from 'axios';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { IUser, IChannel } from '@typings/db';
import fetcher from '@utils/fetcher';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteWorkspaceModal: (flag: boolean) => void;
}
const InviteWorkspaceModal: VFC<Props> = ({ show, onCloseModal, setShowInviteWorkspaceModal }) => {
  const [newMember, onChangeNewMember, setNewMember] = useInput('');
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
  const {
    data: userData,
    error,
    revalidate,
    mutate,
  } = useSWR<IUser | false>('/api/users', fetcher, { dedupingInterval: 2000 });
  const { revalidate: revalidateMember } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );
  const onInviteWorkspace = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) return;

      axios
        .post(`/api/workspaces/${workspace}/members`, { email: newMember }, { withCredentials: true })
        .then(() => {
          revalidateMember();
          setShowInviteWorkspaceModal(false);
          setNewMember('');
        })
        .catch((error) => {
          console.dir(error);
          alert(error.response?.data);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [newMember],
  );

  if (!show) return null;
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteWorkspace}>
        <Label id="member-label">
          <span>이메일</span>
          <Input id="member" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
