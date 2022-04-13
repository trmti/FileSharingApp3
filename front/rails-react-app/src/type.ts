import { UploadFile } from 'antd/lib/upload/interface';

export type text_style_type = {
  font_family: string[];
  font_size: string;
  letter_spacing: string;
};

export type pixel = `${number}px`;
export type percent = `${number}%`;
export type publish_range = 'private' | 'public' | 'open';

// サインアップ
export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// サインイン
export interface SignInParams {
  email: string;
  password: string;
}

export type FetchFailed = {
  status: 'error';
  message: string;
};

export type FetchSuccess<T> = {
  status: 'success';
  data: T;
};

export interface UserImageAndName {
  image: string | null;
  name: string;
}

// ユーザー
export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  message?: string;
  nickname?: string;
  image?: string;
  post_id?: number;
  allowPasswordChange: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface Post {
  id: string;
  image: {
    url: string;
  };
  created_at?: Date;
  updated_at?: Date;
}

export interface PostApiJson {
  posts: Post[];
}

// ----- Team --------------------------------
export interface Team {
  id: number;
  name: string;
  description: string;
  publish_range: publish_range;
  leader_id: number;
  post_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface TeamWithImage {
  team: Team;
  leader_image: string | null;
  cover_image: string | null;
}

export interface TeamDescription {
  team: Team;
  image: string | null;
  leader: UserImageAndName;
  authors: UserImageAndName[];
}

export interface BuildTeamParams {
  name: string;
  description: string;
  publish_range: publish_range;
  file: UploadFile | null;
}

export interface UpdateTeamParams {
  name: string | null;
  description: string | null;
  publish_range: publish_range | null;
  file: UploadFile | null;
}

export type TeamJoinStates = 'unJoin' | 'join' | 'waitingJoin';

// ----- Folder ------------------------------
export type Folder = {
  id: number;
  title: string;
  description: string | null;
  team_id: number;
  post_id: number | null;
  created_at?: Date;
  updated_at?: Date;
};

export type FolderWithImage = {
  folder: Folder;
  image: string | null;
};

export type BuildFolderParams = {
  title: string;
  description: string | null;
  file: UploadFile | null;
};

// ----- File ------------------------------
export type File = {
  id: number;
  title: string | null;
  description: string | null;
  post_id: number | null;
  folder_id: number;
};

export type FileWithImage = {
  file: File;
  image: string | null;
  comment_count: number;
};

export type BuildFileParams = {
  title: string | null;
  description: string | null;
  file: UploadFile;
};

// ----- Comment ------------------------------
export type Comment = {
  text: string;
  user_id: number;
  file_content_id: number;
};
