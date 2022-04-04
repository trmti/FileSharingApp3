import React, { createContext, useContext, useState } from 'react';
import { loginUser, logOutUser, signUpUser, getCurrentUser } from 'db/auth';
import { User, SignInParams, SignUpParams } from 'type';

const AuthUserContext = createContext(
  {} as {
    login: (props: SignInParams) => Promise<void>;
    logout: () => Promise<void>;
    signup: (props: SignUpParams) => Promise<void>;
    updateUser: () => Promise<void>;
    authUser: User | null;
    loading: boolean;
  }
);

const AuthUserProvider: React.FC = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (props: SignInParams) => {
    setLoading(true);
    const res = await loginUser(props);
    if (res.status === 'success') {
      const data = res.data;
      setAuthUser(data);
      setLoading(false);
    } else {
      console.error(res.message);
      setLoading(false);
      throw new Error();
    }
  };

  const logout = async () => {
    setLoading(true);
    const res = await logOutUser();
    if (res) {
      setAuthUser(null);
      setLoading(false);
    } else {
      setLoading(false);
      throw new Error();
    }
  };

  const signup = async (data: SignUpParams) => {
    setLoading(true);
    const signupRes = await signUpUser(data);
    if (signupRes.status === 'success') {
      const loginRes = await loginUser({
        email: data.email,
        password: data.password,
      });
      if (loginRes.status === 'success') {
        setAuthUser(loginRes.data);
      } else {
        console.error(loginRes.message);
      }
      setLoading(false);
    } else {
      console.error(signupRes.message);
      setLoading(false);
      throw new Error();
    }
  };

  const updateUser = async () => {
    setLoading(true);
    const res = await getCurrentUser();
    if (res.status === 'success') {
      setAuthUser(res.data);
      setLoading(false);
    } else {
      console.error(res.message);
      setAuthUser(null);
      setLoading(false);
      throw new Error();
    }
  };

  return (
    <AuthUserContext.Provider
      value={{
        login,
        logout,
        signup,
        updateUser,
        loading,
        authUser,
      }}
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
