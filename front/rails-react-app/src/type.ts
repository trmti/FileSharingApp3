import { UploadFile } from 'antd/lib/upload/interface';

export type text_style_type = {
  font_family: string[];
  font_size: string;
  letter_spacing: string;
};

export type pixel = `${number}px`;
export type percent = `${number}%`;
export type publish_range = 'private' | 'public';

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

// ユーザー
export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  image?: string;
  post_id?: number;
  allowPasswordChange: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type FetchFailed = {
  status: 'error';
  message: string;
};

export type FetchSuccess<T> = {
  status: 'success';
  data: T;
};

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

export interface UserImageAndName {
  image: string | null;
  name: string;
}

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

export type Folder = {
  id: number;
  title: string;
  description: string;
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
  description: string;
  file: UploadFile | null;
};

export type File = {
  file: {
    id: number;
    title: string;
    description: string;
    post_id: number | null;
    folder_id: number;
  };
  image: string | null;
  comment_count: number;
};

export type Comment = {
  text: string;
  user_id: number;
  file_content_id: number;
};
