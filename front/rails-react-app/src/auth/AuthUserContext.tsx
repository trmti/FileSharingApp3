import React, { createContext, useContext, useState } from 'react';
import { loginUser, logOutUser, signUpUser, getCurrentUser } from 'db/user';
import { User, SignInParams, SignUpParams } from 'type';

type Props = {
  login: (props: SignInParams) => Promise<void>;
  logout: () => Promise<void>;
  signup: (props: SignUpParams) => Promise<void>;
  updateUser: () => Promise<void>;
  authUser: User | null;
  loading: boolean;
};

const AuthUserContext = createContext<Props>({
  login: async (_) => console.error('Providerが設定されていません'),
  logout: async () => console.error('Providerが設定されていません'),
  signup: async () => console.error('Providerが設定されていません'),
  updateUser: async () => console.error('Providerが設定されていません'),
  authUser: null,
  loading: false,
});

const AuthUserProvider: React.FC = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (props: SignInParams) => {
    setLoading(true);
    const res = await loginUser(props);
    if (res.status === 'success') {
      const data = res.data;
      setAuthUser(data);
    } else {
      console.error(res.message);
      throw new Error();
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    const res = await logOutUser();
    if (res.status === 'success') {
      setAuthUser(null);
    } else {
      console.error(res.message);
      throw new Error();
    }
    setLoading(false);
  };

  const signup = async (data: SignUpParams) => {
    setLoading(true);
    const res = await signUpUser(data);
    if (res.status === 'success') {
      setAuthUser(res.data);
    } else {
      console.error(res.message);
      throw new Error();
    }
    setLoading(false);
  };

  const updateUser = async () => {
    setLoading(true);
    const res = await getCurrentUser();
    if (res.status === 'success') {
      setAuthUser(res.data);
    } else {
      console.error(res.message);
      setAuthUser(null);
      throw new Error();
    }
    setLoading(false);
  };

  return (
    <AuthUserContext.Provider
      value={{ login, logout, signup, updateUser, loading, authUser }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

export const useLogin = () => useContext(AuthUserContext).login;
export const useLogout = () => useContext(AuthUserContext).logout;
export const useSignup = () => useContext(AuthUserContext).signup;
export const useUpdateUser = () => useContext(AuthUserContext).updateUser;
export const useLoading = () => useContext(AuthUserContext).loading;
export const useAuthUser = () => useContext(AuthUserContext).authUser;

export default AuthUserProvider;
