import React, { FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { IChannel, IChat, IUser } from '@typings/db';

interface Props {
  channelData?: IChannel[];
  userData?: IUser;
}

const ChannelList: FC<Props> = ({ userData, channelData }) => {
  const { workspace } = useParams<{ workspace: string }>();
  const location = useLocation();
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [countList, setCountList] = useState<{ [key: string]: number | undefined }>({});
  return <div></div>;
};
export default ChannelList;
