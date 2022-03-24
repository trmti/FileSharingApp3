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

export interface BuildTeamParams {
  name: string;
  description: string;
  publish_range: publish_range;
  file: UploadFile | null;
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

export interface TeamApiJson {
  teams: Team[];
}

export type TeamWithImage = Team & {
  cover_image: string;
  leader_image: string;
};

export type TeamPageProps = {
  title: string;
  description: string;
  publish_range: publish_range;
  image_url: string;
  leader: { image_url: string; name: string };
  authors: { image_url: string; name: string }[];
};

export type Folder = {
  id: number;
  title: string;
  description: string;
  team_id: number;
  post_id: number | null;
  created_at?: Date;
  updated_at?: Date;
};

export type FolderWithImage = Folder & { image: string };
