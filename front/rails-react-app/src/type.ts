export type text_style_type = {
  font_family: string[];
  font_size: string;
  letter_spacing: string;
};

export type pixel = `${number}px`;
export type percent = `${number}%`;

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

export type UserData = {
  data: User;
};

export type FetchFailed = {
  status: 'error';
  message: string;
};

export type FetchUserSuccess = {
  status: 'success';
  data: User;
};

export type FetchPostSuccess = {
  status: 'success';
  data: Post;
};

export type FetchUser = FetchUserSuccess | FetchFailed;

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
