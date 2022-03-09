export interface IUser {
  id: number;
  nickname: string;
  email: string;
  Workspaces: IWorkspace[];
}

export interface IUserWithOnline extends IUser {
  online: boolean;
}

export interface IChannel {
  id: number;
  name: string;
  private: boolean;
  WorkspaceId: number;
}

export interface IChat {
  id: number;
  UserId: number;
  User: IUser;
  content: String;
  createAt: Date;
  ChannelId: number;
  Channel: IChannel;
}

export interface IDM {
  id: number;
  SenderId: number;
  Sender: IUser;
  ReveiverId: number;
  Revevier: IUser;
  content: string;
  createdAt: Date;
}

export interface IWorkspace {
  id: number;
  name: string;
  url: string;
  OwnerId: number;
}
